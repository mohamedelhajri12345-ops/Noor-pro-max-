package com.noorpromax

import android.app.Application
import com.startapp.sdk.adsbase.StartAppSDK

/**
 * Start.io initialization for Noor.
 * App ID: 207270163
 */
class StartIoInitializer {
    companion object {
        fun initialize(application: Application) {
            StartAppSDK.init(application, "207270163", false)
        }
    }
}
