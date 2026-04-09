/**
 * PremiumAds React Native Sample
 * Demonstrates Google AdMob mediation with PremiumAdsGoogleAdapter
 */

import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  useColorScheme,
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
import {setDebug as setPremiumAdsDebug} from '@premiumads/react-native-admob-adapter';

const IDS = Platform.select({
  android: {
    banner: 'ca-app-pub-2142338037257831/5013815038',
    interstitial: 'ca-app-pub-2142338037257831/1616542060',
    rewarded: 'ca-app-pub-2142338037257831/6768646189',
    rewardedInterstitial: 'ca-app-pub-2142338037257831/9846792399',
    appOpen: 'ca-app-pub-2142338037257831/3283026116',
  },
  ios: {
    banner: 'ca-app-pub-2142338037257831/9570123244',
    interstitial: 'ca-app-pub-2142338037257831/6023454425',
    rewarded: 'ca-app-pub-2142338037257831/6021446818',
    rewardedInterstitial: 'ca-app-pub-2142338037257831/9954603603',
    appOpen: 'ca-app-pub-2142338037257831/8291341024',
  },
})!;

function App(): React.JSX.Element {
  const isDark = useColorScheme() === 'dark';
  const [log, setLog] = useState<string[]>([]);
  const [sdkReady, setSdkReady] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const interstitialRef = useRef<InterstitialAd | null>(null);
  const rewardedRef = useRef<RewardedAd | null>(null);
  const rewardedInterRef = useRef<RewardedInterstitialAd | null>(null);
  const appOpenRef = useRef<AppOpenAd | null>(null);

  const addLog = (msg: string) => {
    console.log('[PremiumAds]', msg);
    setLog(prev => [`${new Date().toLocaleTimeString()} ${msg}`, ...prev].slice(0, 30));
  };

  useEffect(() => {
    setPremiumAdsDebug(true);
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        addLog('MobileAds initialized');
        Object.entries(adapterStatuses).forEach(([name, s]) => {
          addLog(`  ${name}: ${s.state} ${s.description}`);
        });
        setSdkReady(true);
      })
      .catch(e => addLog(`init error: ${e}`));
  }, []);

  const loadInterstitial = () => {
    const ad = InterstitialAd.createForAdRequest(IDS.interstitial);
    interstitialRef.current = ad;
    ad.addAdEventListener(AdEventType.LOADED, () => {
      addLog('Interstitial LOADED → showing');
      ad.show();
    });
    ad.addAdEventListener(AdEventType.ERROR, e => addLog(`Interstitial ERROR: ${e.message}`));
    ad.addAdEventListener(AdEventType.CLOSED, () => addLog('Interstitial CLOSED'));
    ad.load();
    addLog('Interstitial loading…');
  };

  const loadRewarded = () => {
    const ad = RewardedAd.createForAdRequest(IDS.rewarded);
    rewardedRef.current = ad;
    ad.addAdEventListener(RewardedAdEventType.LOADED, () => {
      addLog('Rewarded LOADED → showing');
      ad.show();
    });
    ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, r =>
      addLog(`Reward earned: ${r.amount} ${r.type}`),
    );
    ad.addAdEventListener(AdEventType.ERROR, e => addLog(`Rewarded ERROR: ${e.message}`));
    ad.addAdEventListener(AdEventType.CLOSED, () => addLog('Rewarded CLOSED'));
    ad.load();
    addLog('Rewarded loading…');
  };

  const loadRewardedInterstitial = () => {
    const ad = RewardedInterstitialAd.createForAdRequest(IDS.rewardedInterstitial);
    rewardedInterRef.current = ad;
    ad.addAdEventListener(RewardedAdEventType.LOADED, () => {
      addLog('RewardedInterstitial LOADED → showing');
      ad.show();
    });
    ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, r =>
      addLog(`RI reward: ${r.amount} ${r.type}`),
    );
    ad.addAdEventListener(AdEventType.ERROR, e => addLog(`RI ERROR: ${e.message}`));
    ad.addAdEventListener(AdEventType.CLOSED, () => addLog('RI CLOSED'));
    ad.load();
    addLog('RewardedInterstitial loading…');
  };

  const loadAppOpen = () => {
    const ad = AppOpenAd.createForAdRequest(IDS.appOpen);
    appOpenRef.current = ad;
    ad.addAdEventListener(AdEventType.LOADED, () => {
      addLog('AppOpen LOADED → showing');
      ad.show();
    });
    ad.addAdEventListener(AdEventType.ERROR, e => addLog(`AppOpen ERROR: ${e.message}`));
    ad.addAdEventListener(AdEventType.CLOSED, () => addLog('AppOpen CLOSED'));
    ad.load();
    addLog('AppOpen loading…');
  };

  const bgColor = isDark ? '#111' : '#f7f7f7';
  const fgColor = isDark ? '#eee' : '#111';

  return (
    <SafeAreaView style={[styles.safe, {backgroundColor: bgColor}]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={[styles.title, {color: fgColor}]}>PremiumAds RN Sample</Text>
        <Text style={[styles.subtitle, {color: fgColor}]}>
          SDK: {sdkReady ? 'ready' : 'initializing…'} · Platform: {Platform.OS}
        </Text>

        <View style={styles.row}>
          <Button
            title={showBanner ? 'Hide Banner' : 'Load Banner'}
            onPress={() => setShowBanner(v => !v)}
            disabled={!sdkReady}
          />
        </View>
        {showBanner && (
          <View style={styles.bannerBox}>
            <BannerAd
              unitId={IDS.banner}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              onAdLoaded={() => addLog('Banner LOADED')}
              onAdFailedToLoad={e => addLog(`Banner ERROR: ${e.message}`)}
              onAdOpened={() => addLog('Banner OPENED')}
              onAdClosed={() => addLog('Banner CLOSED')}
            />
          </View>
        )}

        <View style={styles.row}>
          <Button title="Load Interstitial" onPress={loadInterstitial} disabled={!sdkReady} />
        </View>
        <View style={styles.row}>
          <Button title="Load Rewarded" onPress={loadRewarded} disabled={!sdkReady} />
        </View>
        <View style={styles.row}>
          <Button
            title="Load Rewarded Interstitial"
            onPress={loadRewardedInterstitial}
            disabled={!sdkReady}
          />
        </View>
        <View style={styles.row}>
          <Button title="Load App Open" onPress={loadAppOpen} disabled={!sdkReady} />
        </View>

        <Text style={[styles.logTitle, {color: fgColor}]}>Log</Text>
        <View style={[styles.logBox, {borderColor: fgColor}]}>
          {log.map((line, i) => (
            <Text key={i} style={[styles.logLine, {color: fgColor}]}>
              {line}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  scroll: {padding: 16, paddingBottom: 48},
  title: {fontSize: 22, fontWeight: '700', marginBottom: 4},
  subtitle: {fontSize: 13, marginBottom: 16, opacity: 0.8},
  row: {marginVertical: 6},
  bannerBox: {alignItems: 'center', marginVertical: 8},
  logTitle: {marginTop: 16, fontSize: 16, fontWeight: '600'},
  logBox: {marginTop: 6, padding: 8, borderWidth: 1, borderRadius: 6, minHeight: 120},
  logLine: {fontSize: 11, fontFamily: Platform.select({ios: 'Menlo', android: 'monospace'})},
});

export default App;
