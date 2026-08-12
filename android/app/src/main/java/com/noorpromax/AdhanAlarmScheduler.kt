package com.noorpromax

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent

object AdhanAlarmScheduler {
    fun schedule(context: Context, timeMillis: Long) {
        val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        val intent = Intent(context, AdhanAlarmReceiver::class.java)
        val pending = PendingIntent.getBroadcast(
            context,
            1001,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        alarmManager.setExactAndAllowWhileIdle(
            AlarmManager.RTC_WAKEUP,
            timeMillis,
            pending
        )
    }
}
