MotoOps India attendance pilot, build 4

Update MotoOps India Test in place using MotoOps-India-Attendance-0.2.0-build4-arm64.apk. Same package/test signer; do not uninstall if pending evidence must be retained. Android 13+ ARM64.

Automatic duty monitoring recovery: temporary internet/GPS failures retain the foreground session, location provider changes reconnect automatically, saved readings upload when network returns, and Android-managed sticky restart is requested after ordinary process reclamation. Reopening the signed-in app automatically recovers the authorized current local duty session; there is no Restore button.

Force-stop/reboot/battery restrictions can prevent background execution. Open the app to allow automatic recovery. A fresh authenticated clock is required after reboot. Checkout, sign-out, server stop and duty expiry prevent automatic restart. Unknown historical intervals are preserved.

Test internet and GPS off/on without touching Profile, screen lock, app reopening and checkout/logout stop behavior on a real phone. Static analysis and Android/Web compilation passed; real-phone acceptance is still required. Production is unchanged.
