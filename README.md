# @premium-ads/adapter-v2

PremiumAds Google AdMob Adapter V2 — React Native plugin for mediation through PremiumAds.

Supports Android and iOS via the community [react-native-google-mobile-ads](https://github.com/invertase/react-native-google-mobile-ads) plugin.

## Supported Ad Formats

- Banner
- Interstitial
- Rewarded
- Rewarded Interstitial
- Native
- App Open

## Installation

```sh
npm install @premium-ads/adapter-v2 react-native-google-mobile-ads
# or
yarn add @premium-ads/adapter-v2 react-native-google-mobile-ads
```

### iOS

```sh
cd ios && pod install
```

### Android

Add the PremiumAds Maven repository to `android/build.gradle`:

```groovy
allprojects {
    repositories {
        maven { url 'https://repo.premiumads.net/artifactory/mobile-ads-sdk/' }
    }
}
```

The native adapter AAR is auto-resolved.

## Configure AdMob Custom Event

In the [AdMob console](https://apps.admob.com), configure a **Custom Event** for each ad unit:

| Platform | Field | Value |
|----------|-------|-------|
| **Android** | Class Name | `net.premiumads.sdk.adapter.PremiumAdsAdapter` |
| **iOS** | Class Name | `PremiumAdsAdapter` |
| Both | Parameter | Your PremiumAds ad unit ID |

The same class works for all 6 ad formats.

## Usage

The adapter is invoked automatically by Google Mobile Ads SDK — **no extra code needed**. Use the standard `react-native-google-mobile-ads` API:

```tsx
import mobileAds, {
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';
import PremiumAdsV2 from '@premium-ads/adapter-v2';

// Optional: enable debug logging
await PremiumAdsV2.setDebug(true);

// Initialize
await mobileAds().initialize();

// Load an interstitial
const ad = InterstitialAd.createForAdRequest('ca-app-pub-xxxxx/xxxxx');
ad.addAdEventListener(AdEventType.LOADED, () => ad.show());
ad.load();
```

## Example

A complete example app with 5 ad formats is in [`example/`](example/).

## Documentation

- [Integration Guide](https://docs.premiumads.net/v2.0/docs/google-admob)
- [Test Ad Units](https://docs.premiumads.net/v2.0/docs/enabling-test-ads)

## Native Dependencies

This plugin pulls native binaries automatically:
- **Android:** `net.premiumads.sdk:admob-adapter-v2` from PremiumAds JFrog Maven
- **iOS:** `PremiumAdsGoogleAdapter` pod from CocoaPods (requires Google Mobile Ads SDK 13.0+)

## Support

Contact your PremiumAds account manager or email support@premiumads.net
