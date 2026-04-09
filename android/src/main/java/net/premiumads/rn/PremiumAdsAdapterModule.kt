package net.premiumads.rn

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class PremiumAdsAdapterModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "PremiumAdsAdapter"

    @ReactMethod
    fun setDebug(enabled: Boolean, promise: Promise) {
        try {
            val cls = Class.forName("net.premiumads.sdk.adapter.PremiumAdsAdapter")
            val method = cls.getMethod("setDebug", Boolean::class.javaPrimitiveType)
            method.invoke(null, enabled)
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("ADAPTER_ERROR", e.message, e)
        }
    }
}
