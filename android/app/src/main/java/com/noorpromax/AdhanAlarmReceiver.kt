package com.noorpromax

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent

class AdhanAlarmReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent?) {
        val serviceIntent = Intent(context, AdhanBackgroundService::class.java)
        context.startForegroundService(serviceIntent)
    }
}
