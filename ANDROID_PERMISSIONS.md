# Noor Android Permissions

Required Android permissions for Noor:

## Location
- ACCESS_FINE_LOCATION
- ACCESS_COARSE_LOCATION

Purpose:
- Local prayer times calculation.
- Qibla direction.

## Notifications
- POST_NOTIFICATIONS (Android 13+)

Purpose:
- Adhan alerts.
- Daily reminders.

## Alarm and background adhan
- SCHEDULE_EXACT_ALARM (when exact prayer scheduling is required by Android policy).
- FOREGROUND_SERVICE (for background adhan service).
- FOREGROUND_SERVICE_MEDIA_PLAYBACK (for Android versions requiring media foreground service type).

## Audio
- Media playback resources for adhan sounds.

These permissions should be declared in AndroidManifest.xml when the Capacitor Android project is generated.
