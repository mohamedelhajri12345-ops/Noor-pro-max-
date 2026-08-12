# Start.io Ads Setup - Noor

## App Configuration
- App Name: Noor
- Start.io App ID: 207270163

## Android Permissions
The Android build should include the permissions required by the Start.io SDK version used by the project.

Recommended permissions:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

## Integration Notes
- Ads should be integrated without interrupting Quran reading, prayer times, or worship features.
- Recommended placements:
  - Home screen banner/native ads.
  - Library section.
  - Non-intrusive interstitial ads between major navigation actions only.
- Do not show ads during Quran playback or Adhan.

## Privacy
- Add advertising disclosure to the privacy policy.
- Ensure consent handling is added where required by applicable regulations.

## Release Checklist
- Verify Start.io App ID in Android configuration.
- Test ads on a real device.
- Confirm no ad conflicts with background audio services.
