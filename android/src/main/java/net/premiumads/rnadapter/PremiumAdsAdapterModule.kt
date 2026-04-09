package net.premiumads.rnadapter

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import net.premiumads.sdk.adapter.PremiumAdsAdapter

class PremiumAdsAdapterModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = NAME

  @ReactMethod
  fun setDebug(enabled: Boolean) {
    PremiumAdsAdapter.setDebug(enabled)
  }

  companion object {
    const val NAME = "PremiumAdsAdapter"
  }
}
