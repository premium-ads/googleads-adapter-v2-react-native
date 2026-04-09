#import "PremiumAdsAdapterModule.h"

#if __has_include(<PremiumAdsGoogleAdapter/PremiumAdsGoogleAdapter-Swift.h>)
#import <PremiumAdsGoogleAdapter/PremiumAdsGoogleAdapter-Swift.h>
#else
@import PremiumAdsGoogleAdapter;
#endif

@implementation PremiumAdsAdapterModule

RCT_EXPORT_MODULE(PremiumAdsAdapter)

+ (BOOL)requiresMainQueueSetup {
  return NO;
}

RCT_EXPORT_METHOD(setDebug:(BOOL)enabled) {
  [PremiumAdsAdapter setDebug:enabled];
}

@end
