package com.noor.app

import android.app.Service
import android.content.Intent
import android.os.IBinder

/**
 * Background service foundation for Adhan playback.
 * This service will handle scheduled prayer alerts when the app is packaged as Android.
 */
class AdhanBackgroundService : Service() {
    override fun onBind(intent: Intent?): IBinder? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        // TODO: Connect Android AlarmManager and audio player.
        // TODO: Play selected Adhan sound when prayer time arrives.
        return START_STICKY
    }
}
