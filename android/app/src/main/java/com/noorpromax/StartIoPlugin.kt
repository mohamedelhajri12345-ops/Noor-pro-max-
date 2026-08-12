package com.noorpromax

import android.view.Gravity
import android.view.ViewGroup
import android.widget.FrameLayout
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.startapp.sdk.ads.banner.Banner

@CapacitorPlugin(name = "StartIoAds")
class StartIoPlugin : Plugin() {
    private var banner: Banner? = null

    @PluginMethod
    fun showBanner(call: PluginCall) {
        activity.runOnUiThread {
            if (banner == null) {
                banner = Banner(activity).apply {
                    id = android.view.View.generateViewId()
                }
            }

            val root = activity.findViewById<FrameLayout>(android.R.id.content)
            banner?.let { view ->
                if (view.parent == null) {
                    val params = FrameLayout.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.WRAP_CONTENT
                    ).apply {
                        gravity = Gravity.BOTTOM or Gravity.CENTER_HORIZONTAL
                    }
                    root.addView(view, params)
                }
                view.visibility = android.view.View.VISIBLE
            }
            call.resolve(JSObject().put("visible", true))
        }
    }

    @PluginMethod
    fun hideBanner(call: PluginCall) {
        activity.runOnUiThread {
            banner?.visibility = android.view.View.GONE
            call.resolve(JSObject().put("visible", false))
        }
    }

    override fun handleOnDestroy() {
        banner?.let { view ->
            (view.parent as? ViewGroup)?.removeView(view)
            banner = null
        }
        super.handleOnDestroy()
    }
}
