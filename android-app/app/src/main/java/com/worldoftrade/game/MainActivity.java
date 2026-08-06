package com.worldoftrade.game;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.provider.Settings;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.MimeTypeMap;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.webkit.WebViewAssetLoader;

import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

public class MainActivity extends Activity {
    private static final int REQUEST_OPEN_FILE = 2001;
    private static final int REQUEST_SAVE_FILE = 2002;
    private static final String APP_URL = "https://appassets.androidplatform.net/assets/www/index.html?native=android";
    private static final String NATIVE_VERSION = "55.0.0";

    private WebView webView;
    private ValueCallback<Uri[]> fileChooserCallback;
    private String pendingExportContent;
    private String pendingExportMime = "application/json";

    @SuppressLint({"SetJavaScriptEnabled", "JavascriptInterface"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        // v50 - non si forza piu' l'orizzontale: dalla v44 l'interfaccia ha un layout
        // verticale curato per telefono, e la v46 aveva già corretto il manifest web.
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_FULL_USER);
        getWindow().setStatusBarColor(Color.rgb(7, 18, 50));
        getWindow().setNavigationBarColor(Color.rgb(7, 18, 50));
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        enterImmersiveMode();

        WebViewAssetLoader assetLoader = new WebViewAssetLoader.Builder()
                .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .build();

        webView = new WebView(this);
        webView.setBackgroundColor(Color.rgb(7, 18, 50));
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setSupportZoom(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(false);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        settings.setUserAgentString(settings.getUserAgentString() + " WorldOfTradeNative/" + NATIVE_VERSION);

        webView.addJavascriptInterface(new NativeBridge(), "WorldOfTradeNative");
        webView.setWebViewClient(new LocalWebViewClient(assetLoader));
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback, FileChooserParams params) {
                if (fileChooserCallback != null) fileChooserCallback.onReceiveValue(null);
                fileChooserCallback = callback;
                Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
                intent.addCategory(Intent.CATEGORY_OPENABLE);
                intent.setType("application/json");
                intent.putExtra(Intent.EXTRA_MIME_TYPES, new String[]{"application/json", "text/json", "text/plain"});
                try {
                    startActivityForResult(intent, REQUEST_OPEN_FILE);
                    return true;
                } catch (ActivityNotFoundException error) {
                    fileChooserCallback = null;
                    Toast.makeText(MainActivity.this, "No file picker is available.", Toast.LENGTH_LONG).show();
                    return false;
                }
            }
        });

        if (savedInstanceState == null) webView.loadUrl(APP_URL);
        else webView.restoreState(savedInstanceState);
    }

    private final class LocalWebViewClient extends WebViewClient {
        private final WebViewAssetLoader loader;
        LocalWebViewClient(WebViewAssetLoader loader) { this.loader = loader; }

        @Override
        public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
            return loader.shouldInterceptRequest(request.getUrl());
        }

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            Uri uri = request.getUrl();
            if ("appassets.androidplatform.net".equals(uri.getHost())) return false;
            openExternalUri(uri);
            return true;
        }
    }

    private final class NativeBridge {
        @JavascriptInterface public String getPlatform() { return "android"; }
        @JavascriptInterface public String getVersion() { return NATIVE_VERSION; }

        @JavascriptInterface
        public void appReady() {
            runOnUiThread(() -> enterImmersiveMode());
        }

        @JavascriptInterface
        public void haptic(String style) {
            runOnUiThread(() -> {
                Vibrator vibrator = (Vibrator) getSystemService(VIBRATOR_SERVICE);
                if (vibrator == null || !vibrator.hasVibrator()) return;
                long duration = "heavy".equals(style) ? 45 : ("medium".equals(style) ? 28 : 14);
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    vibrator.vibrate(VibrationEffect.createOneShot(duration, VibrationEffect.DEFAULT_AMPLITUDE));
                } else {
                    //noinspection deprecation
                    vibrator.vibrate(duration);
                }
            });
        }

        @JavascriptInterface
        public void saveTextFile(String filename, String content, String mimeType) {
            runOnUiThread(() -> beginExport(filename, content, mimeType));
        }

        @JavascriptInterface
        public void shareText(String title, String text) {
            runOnUiThread(() -> {
                Intent share = new Intent(Intent.ACTION_SEND);
                share.setType("text/plain");
                share.putExtra(Intent.EXTRA_SUBJECT, title);
                share.putExtra(Intent.EXTRA_TEXT, text);
                startActivity(Intent.createChooser(share, title));
            });
        }

        @JavascriptInterface
        public void openExternal(String url) {
            runOnUiThread(() -> {
                try { openExternalUri(Uri.parse(url)); } catch (Exception ignored) {}
            });
        }
    }

    private void beginExport(String filename, String content, String mimeType) {
        pendingExportContent = content;
        pendingExportMime = (mimeType == null || mimeType.isBlank()) ? "application/json" : mimeType;
        Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType(pendingExportMime);
        intent.putExtra(Intent.EXTRA_TITLE, filename == null || filename.isBlank() ? "world-of-trade-career.json" : filename);
        try {
            startActivityForResult(intent, REQUEST_SAVE_FILE);
        } catch (ActivityNotFoundException error) {
            pendingExportContent = null;
            Toast.makeText(this, "No document provider is available.", Toast.LENGTH_LONG).show();
        }
    }

    private void openExternalUri(Uri uri) {
        String scheme = uri == null ? null : uri.getScheme();
        if (!("https".equalsIgnoreCase(scheme) || "http".equalsIgnoreCase(scheme) || "mailto".equalsIgnoreCase(scheme))) return;
        try { startActivity(new Intent(Intent.ACTION_VIEW, uri)); }
        catch (ActivityNotFoundException ignored) { Toast.makeText(this, "No compatible app found.", Toast.LENGTH_SHORT).show(); }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_OPEN_FILE) {
            Uri[] result = null;
            if (resultCode == RESULT_OK && data != null && data.getData() != null) result = new Uri[]{data.getData()};
            if (fileChooserCallback != null) fileChooserCallback.onReceiveValue(result);
            fileChooserCallback = null;
            return;
        }
        if (requestCode == REQUEST_SAVE_FILE) {
            if (resultCode == RESULT_OK && data != null && data.getData() != null && pendingExportContent != null) {
                try (OutputStream stream = getContentResolver().openOutputStream(data.getData())) {
                    if (stream != null) {
                        stream.write(pendingExportContent.getBytes(StandardCharsets.UTF_8));
                        stream.flush();
                        Toast.makeText(this, "Career backup saved.", Toast.LENGTH_SHORT).show();
                    }
                } catch (Exception error) {
                    Toast.makeText(this, "Could not save the backup.", Toast.LENGTH_LONG).show();
                }
            }
            pendingExportContent = null;
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        webView.saveState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override
    protected void onPause() {
        if (webView != null) {
            webView.evaluateJavascript("try{window.__WOT_NATIVE_SAVE__?.();}catch(e){}", null);
            webView.onPause();
        }
        super.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (webView != null) webView.onResume();
        enterImmersiveMode();
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.removeJavascriptInterface("WorldOfTradeNative");
            webView.destroy();
        }
        super.onDestroy();
    }

    @Override
    public void onBackPressed() {
        if (webView == null) { super.onBackPressed(); return; }
        // v50 - gli id cercati qui non esistevano nella pagina ('rightDrawer',
        // 'closeRightPanel'): il tasto Indietro non chiudeva il pannello dei dettagli
        // e usciva subito dal gioco. Gli id reali sono 'rightInspector'/'closeInspector'.
        String script = "(function(){" +
                "const d=[...document.querySelectorAll('dialog[open]')].pop();if(d){d.close();return true;}" +
                "const o=document.getElementById('shortcutsOverlay');if(o&&o.classList.contains('open')){document.getElementById('shortcutsCloseButton')?.click();return true;}" +
                "const b=document.getElementById('briefingPanel');if(b&&b.getAttribute('aria-hidden')==='false'){document.getElementById('closeBriefingButton')?.click();return true;}" +
                "const r=document.getElementById('rightInspector');if(r&&r.getAttribute('aria-hidden')==='false'){document.getElementById('closeInspector')?.click();return true;}" +
                "const l=document.getElementById('leftDrawer');if(l&&l.getAttribute('aria-hidden')==='false'){document.getElementById('closeLeftPanel')?.click();return true;}" +
                "return false;})()";
        webView.evaluateJavascript(script, value -> {
            if (!"true".equals(value)) moveTaskToBack(true);
        });
    }

    private void enterImmersiveMode() {
        View decor = getWindow().getDecorView();
        decor.setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY |
                View.SYSTEM_UI_FLAG_FULLSCREEN |
                View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
                View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
                View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION |
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
        );
    }
}
