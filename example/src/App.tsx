// PremiumAds Adapter V2 React Native Example
//
// This example uses react-native-google-mobile-ads to load ads through the
// PremiumAds mediation adapter. The adapter is automatically invoked by
// Google Mobile Ads SDK when custom events are configured in the AdMob console.

import React, { useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import mobileAds, {
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  RewardedAd,
  RewardedInterstitialAd,
  AppOpenAd,
  AdEventType,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';
import PremiumAdsV2 from '@premium-ads/adapter-v2';

const BANNER_ID = 'ca-app-pub-2142338037257831/5013815038';
const INTERSTITIAL_ID = 'ca-app-pub-2142338037257831/1616542060';
const REWARDED_ID = 'ca-app-pub-2142338037257831/6768646189';
const REWARDED_INTERSTITIAL_ID = 'ca-app-pub-2142338037257831/9846792399';
const APP_OPEN_ID = 'ca-app-pub-2142338037257831/3283026116';

export default function App() {
  const [logs, setLogs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  const log = (msg: string) => {
    const ts = new Date().toTimeString().split(' ')[0];
    setLogs((prev) => [`[${ts}] ${msg}`, ...prev]);
  };

  useEffect(() => {
    (async () => {
      log('Initializing Google Mobile Ads SDK...');
      await PremiumAdsV2.setDebug(true);
      const status = await mobileAds().initialize();
      log('MobileAds initialized.');
      Object.entries(status).forEach(([name, st]) => {
        log(`${name} | ${(st as any).state}`);
      });
      setReady(true);
      log('Ready! Tap a button to load ads.');
    })();
  }, []);

  const loadInterstitial = () => {
    log('Loading interstitial...');
    const ad = InterstitialAd.createForAdRequest(INTERSTITIAL_ID);
    ad.addAdEventListener(AdEventType.LOADED, () => {
      log('Interstitial loaded');
      ad.show();
    });
    ad.addAdEventListener(AdEventType.ERROR, (err) =>
      log('Interstitial failed: ' + err.message)
    );
    ad.addAdEventListener(AdEventType.CLOSED, () => log('Interstitial closed'));
    ad.load();
  };

  const loadRewarded = () => {
    log('Loading rewarded...');
    const ad = RewardedAd.createForAdRequest(REWARDED_ID);
    ad.addAdEventListener(RewardedAdEventType.LOADED, () => {
      log('Rewarded loaded');
      ad.show();
    });
    ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) =>
      log(`Earned reward: ${reward.amount} ${reward.type}`)
    );
    ad.addAdEventListener(AdEventType.ERROR, (err) =>
      log('Rewarded failed: ' + err.message)
    );
    ad.load();
  };

  const loadRewardedInterstitial = () => {
    log('Loading rewarded interstitial...');
    const ad = RewardedInterstitialAd.createForAdRequest(REWARDED_INTERSTITIAL_ID);
    ad.addAdEventListener(RewardedAdEventType.LOADED, () => {
      log('Rewarded interstitial loaded');
      ad.show();
    });
    ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) =>
      log(`Earned reward: ${reward.amount} ${reward.type}`)
    );
    ad.addAdEventListener(AdEventType.ERROR, (err) =>
      log('Rewarded interstitial failed: ' + err.message)
    );
    ad.load();
  };

  const loadAppOpen = () => {
    log('Loading app open...');
    const ad = AppOpenAd.createForAdRequest(APP_OPEN_ID);
    ad.addAdEventListener(AdEventType.LOADED, () => {
      log('App open loaded');
      ad.show();
    });
    ad.addAdEventListener(AdEventType.ERROR, (err) =>
      log('App open failed: ' + err.message)
    );
    ad.load();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>PremiumAds Adapter V2 Example</Text>

        <View style={styles.buttonRow}>
          <Button title="Load Interstitial" onPress={loadInterstitial} disabled={!ready} />
        </View>
        <View style={styles.buttonRow}>
          <Button title="Load Rewarded" onPress={loadRewarded} disabled={!ready} />
        </View>
        <View style={styles.buttonRow}>
          <Button title="Load Rewarded Interstitial" onPress={loadRewardedInterstitial} disabled={!ready} />
        </View>
        <View style={styles.buttonRow}>
          <Button title="Load App Open" onPress={loadAppOpen} disabled={!ready} />
        </View>

        <View style={styles.banner}>
          <BannerAd unitId={BANNER_ID} size={BannerAdSize.BANNER} />
        </View>

        <View style={styles.logBox}>
          <Text style={styles.logText}>{logs.join('\n')}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a' },
  content: { padding: 12 },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  buttonRow: { marginVertical: 4 },
  banner: { alignItems: 'center', marginVertical: 8 },
  logBox: {
    backgroundColor: '#000000',
    padding: 8,
    borderRadius: 4,
    minHeight: 200,
    marginTop: 8,
  },
  logText: { color: '#00ff00', fontFamily: 'monospace', fontSize: 11 },
});
