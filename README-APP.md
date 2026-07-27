# World of Trade v36 — Android App Edition

This package contains two deliverables:

1. The updated web/PWA edition in the repository root, still deployable on Vercel.
2. A native Android Studio project in `android-app/`, with the complete game bundled inside the APK.

## Native features

- Full-screen landscape Android application
- Offline game assets bundled in the APK
- Persistent local careers and save slots
- Android file picker for career import
- Android document export for career backups
- Haptic feedback on controls
- Hardware-accelerated WebGL
- Secure local asset loading through `WebViewAssetLoader`
- External links open in the system browser
- Automatic save when the app goes into the background
- Android 12+ launch splash and app icons

## Fastest way to obtain an APK through GitHub

Upload the full package to the existing repository, including the `.github` and `android-app` folders. The normal Vercel website continues to use the root `index.html`.

Then:

1. Open the repository on GitHub.
2. Open **Actions**.
3. Select **Build Android App**.
4. Select **Run workflow**.
5. When the workflow finishes, open the run.
6. Download the artifact named `world-of-trade-android-debug`.
7. Extract the artifact and install `app-debug.apk` on an Android device.

Android may ask permission to install an app from your browser or file manager.

## Android Studio

Open the folder `android-app` in Android Studio. Let Android Studio install Android SDK 36 and Gradle dependencies, then press **Run** with an emulator or Android phone connected.

To generate a debug APK use:

`Build > Build Bundle(s) / APK(s) > Build APK(s)`

To publish on Google Play, create a signed Android App Bundle from:

`Build > Generate Signed Bundle / APK > Android App Bundle`

## Important

The supplied debug APK workflow is for testing. Google Play publication requires your own release signing key and store configuration. Never upload the release keystore or its password to a public repository.
