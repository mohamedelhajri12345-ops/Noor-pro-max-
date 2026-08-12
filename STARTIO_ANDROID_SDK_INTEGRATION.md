# Start.io Android SDK Integration - Noor

App ID:

`207270163`

## Gradle dependency

Add Start.io SDK in the Android app module:

```gradle
implementation 'com.startapp:inapp-sdk:5.+'
```

## AndroidManifest permissions

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.AD_ID" />
```

## SDK App ID

Inside the application tag:

```xml
<meta-data
 android:name="com.startapp.sdk.APPLICATION_ID"
 android:value="207270163" />
```

## Initialization

Initialize Start.io once when the Android application starts:

```kotlin
StartAppSDK.init(this, "207270163")
```

## Noor ad rules

- Do not show ads during Quran reading.
- Do not interrupt Adhan playback.
- Avoid ads on prayer time screens.
- Use banners/native placements in suitable sections.

Reference: Start.io Android SDK documentation.
