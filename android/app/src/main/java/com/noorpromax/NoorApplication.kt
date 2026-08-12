package com.noorpromax

import android.app.Application

class NoorApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        StartIoInitializer.initialize(this)
    }
}
