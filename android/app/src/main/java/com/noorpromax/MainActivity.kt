package com.noorpromax

import android.os.Bundle
import com.getcapacitor.BridgeActivity

class MainActivity : BridgeActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        registerPlugin(StartIoPlugin::class.java)
        super.onCreate(savedInstanceState)
    }
}
