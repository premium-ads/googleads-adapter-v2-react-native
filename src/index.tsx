import {NativeModules} from 'react-native';

const LINKING_ERROR =
  `The package '@premiumads/react-native-admob-adapter' doesn't seem to be linked. Make sure: \n\n` +
  `- You rebuilt the app after installing the package\n` +
  `- You are not using Expo Go\n`;

const PremiumAdsAdapterNative = NativeModules.PremiumAdsAdapter
  ? NativeModules.PremiumAdsAdapter
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      },
    );

/**
 * Enable or disable verbose logging for the PremiumAds mediation adapter.
 * Call before `mobileAds().initialize()` for best results.
 */
export function setDebug(enabled: boolean): void {
  PremiumAdsAdapterNative.setDebug(!!enabled);
}

export default {setDebug};
