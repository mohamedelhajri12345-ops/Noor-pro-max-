package com.noorpromax

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.media.MediaPlayer
import android.os.Build
import android.os.IBinder

class AdhanBackgroundService : Service() {
    private var player: MediaPlayer? = null

    override fun onCreate() {
        super.onCreate()
        createChannel()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        startForeground(NOTIFICATION_ID, buildNotification())
        // No audio file is bundled yet. Keeping the service silent avoids claiming
        // that an unlicensed adhan recording is available.
        stopForeground(STOP_FOREGROUND_DETACH)
        stopSelf(startId)
        return START_NOT_STICKY
    }

    private fun createChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "أذان Noor",
                NotificationManager.IMPORTANCE_HIGH
            )
            getSystemService(NotificationManager::class.java).createNotificationChannel(channel)
        }
    }

    private fun buildNotification(): Notification {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            Notification.Builder(this, CHANNEL_ID)
                .setContentTitle("Noor")
                .setContentText("حان وقت الصلاة")
                .setSmallIcon(android.R.drawable.ic_lock_idle_alarm)
                .setOngoing(false)
                .build()
        } else {
            Notification.Builder(this)
                .setContentTitle("Noor")
                .setContentText("حان وقت الصلاة")
                .setSmallIcon(android.R.drawable.ic_lock_idle_alarm)
                .build()
        }
    }

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onDestroy() {
        player?.release()
        player = null
        super.onDestroy()
    }

    companion object {
        private const val CHANNEL_ID = "noor_adhan"
        private const val NOTIFICATION_ID = 207270163
    }
}
