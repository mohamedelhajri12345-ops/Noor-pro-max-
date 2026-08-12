package com.noorpromax

import android.app.Service
import android.content.Intent
import android.media.MediaPlayer
import android.os.IBinder

class AdhanBackgroundService : Service() {
    private var player: MediaPlayer? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        // تشغيل صوت الأذان عند دخول وقت الصلاة
        // يتم ربط ملف الصوت الحقيقي لاحقاً داخل resources/raw
        return START_STICKY
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    override fun onDestroy() {
        player?.release()
        player = null
        super.onDestroy()
    }
}
