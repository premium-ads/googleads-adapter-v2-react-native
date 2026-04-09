# @premiumads/react-native-admob-adapter

PremiumAds mediation adapter for [react-native-google-mobile-ads](https://github.com/invertase/react-native-google-mobile-ads).

Wires the PremiumAds AdMob custom-event adapter into your React Native app's Android and iOS builds so that Google Mobile Ads mediation can fill inventory from the PremiumAds network.

## Installation

```bash
npm install @premiumads/react-native-admob-adapter react-native-google-mobile-ads
```

### iOS

Nothing extra to configure. `PremiumAdsGoogleAdapter` is published on CocoaPods trunk and is pulled in transitively by the wrapper podspec:

```bash
cd ios && pod install
```

### Android

Nothing extra to configure. The wrapper's `build.gradle` already adds the PremiumAds JFrog Maven repository (`https://repo.premiumads.net/artifactory/mobile-ads-sdk/`) and pulls in `net.premiumads.sdk:admob-adapter-v2` via autolinking.

## Usage

```ts
import mobileAds from 'react-native-google-mobile-ads';
import {setDebug} from '@premiumads/react-native-admob-adapter';

// Enable verbose logging from the PremiumAds adapter (dev only)
setDebug(__DEV__);

mobileAds().initialize().then(statuses => {
  console.log('Adapters:', statuses);
});
```

Once initialized, use the standard `react-native-google-mobile-ads` APIs (`BannerAd`, `InterstitialAd`, `RewardedAd`, `AppOpenAd`, etc.). The PremiumAds adapter will receive ad requests via AdMob mediation when your ad units are configured to mediate through PremiumAds in the AdMob console.

See the [`example/`](https://github.com/premium-ads/googleads-adapter-v2-react-native/tree/main/example) folder for a full working example app.

## Supported ad formats

- Banner
- Interstitial
- Rewarded
- Rewarded Interstitial
- App Open
- Native (via `react-native-google-mobile-ads` native ad support)

## Versioning

This JS package is versioned independently from the native adapters. It pins:

- Android: `net.premiumads.sdk:admob-adapter-v2:1.0.8`
- iOS: `PremiumAdsGoogleAdapter` (1.0.6)

## License

MIT © PremiumAds
