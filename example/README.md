# PremiumAdsRNSample (example)

React Native demo app for [`@premiumads/react-native-admob-adapter`](https://www.npmjs.com/package/@premiumads/react-native-admob-adapter).

Demonstrates Banner, Interstitial, Rewarded, Rewarded Interstitial, and App Open ad formats mediated through PremiumAds via [`react-native-google-mobile-ads`](https://github.com/invertase/react-native-google-mobile-ads).

## Running the sample

```bash
npm install
cd ios && pod install && cd ..
npx react-native run-android   # BlueStacks, emulator, or USB device
npx react-native run-ios       # iPhone simulator or USB device
```

## Against a local wrapper build

If you are iterating on the wrapper at the repository root and want this example to pick up your local changes:

```bash
# 1. Build a tarball of the local wrapper from the repo root
cd ..
npm pack            # writes premiumads-react-native-admob-adapter-<version>.tgz

# 2. Install it into this example
cd example
npm install ../premiumads-react-native-admob-adapter-*.tgz

# 3. Re-run native builds
cd ios && pod install && cd ..
npx react-native run-android
npx react-native run-ios
```

> **Why tarball and not `file:` path?** Metro's default resolver does not follow the symlinks that `file:` installs create, which breaks module resolution for scoped packages. Installing via a packed tarball copies the files into `node_modules/` so Metro picks them up transparently.

## Ad unit IDs

`App.tsx` hard-codes per-platform PremiumAds ad unit IDs for demo purposes. Replace them with your own AdMob mediation ad units before shipping.

## Troubleshooting

- **`Unable to resolve module @premiumads/react-native-admob-adapter`** — restart Metro with `npx react-native start --reset-cache`, then reload the app.
- **Android `Could not find net.premiumads.sdk:admob-adapter-v2`** — the wrapper injects the PremiumAds Maven repo into `allprojects` via its `build.gradle`. If your project uses `dependencyResolutionManagement(FAIL_ON_PROJECT_REPOS)`, add the repo manually to your own `settings.gradle` or `android/build.gradle`.
- **iOS `PremiumAdsGoogleAdapter` pod not found** — run `cd ios && pod install --repo-update`.
