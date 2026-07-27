(() => {
  const native = window.WorldOfTradeNative;
  window.__WOT_NATIVE_APP__ = Boolean(native);
  window.__WOT_PLATFORM__ = native ? 'android' : 'web';

  if (!native) return;

  document.documentElement.classList.add('native-app', 'native-android');

  window.__WOT_NATIVE_HAPTIC__ = (style = 'light') => {
    try { native.haptic(String(style)); } catch (error) {}
  };

  window.__WOT_NATIVE_SHARE__ = (title, text) => {
    try { native.shareText(String(title || 'World of Trade'), String(text || '')); } catch (error) {}
  };

  window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('native-app');
    const install = document.getElementById('installButton');
    if (install) install.hidden = true;

    document.addEventListener('pointerup', event => {
      const button = event.target.closest('button, .command-button, .shop-buy-button');
      if (button && !button.disabled) window.__WOT_NATIVE_HAPTIC__('selection');
    }, { passive: true });
  }, { once: true });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      try { window.__WOT_NATIVE_SAVE__?.(); } catch (error) {}
    }
  });

  window.addEventListener('wot-ready', () => {
    try { native.appReady(); } catch (error) {}
  }, { once: true });
})();
