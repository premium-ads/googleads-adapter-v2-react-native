// PremiumAds Google AdMob Adapter V2 — React Native plugin
//
// This is a thin bridge to the native PremiumAds adapter.
// You don't need to call anything from this class for ads to work —
// the adapter is invoked automatically by Google Mobile Ads SDK
// when the publisher configures custom events in the AdMob console.
//
// This wrapper only exposes optional helpers like setDebug().

import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  "The package '@premium-ads/adapter-v2' doesn't seem to be linked. Make sure: \n\n" +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const PremiumAdsAdapter = NativeModules.PremiumAdsAdapter
  ? NativeModules.PremiumAdsAdapter
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

/**
 * PremiumAds Adapter V2 API.
 */
const PremiumAdsV2 = {
  /**
   * Enables verbose debug logging from the PremiumAds adapter.
   *
   * Logs are tagged with `[PremiumAdsAdapter]` in:
   * - **Android Logcat:** filter with `tag:PremiumAdsAdapter`
   * - **iOS Xcode console:** prefix `[PremiumAdsAdapter]`
   *
   * @param enabled - true to enable verbose logging, false to disable
   */
  setDebug(enabled: boolean): Promise<void> {
    return PremiumAdsAdapter.setDebug(enabled);
  },
};

export default PremiumAdsV2;
export { PremiumAdsV2 };
