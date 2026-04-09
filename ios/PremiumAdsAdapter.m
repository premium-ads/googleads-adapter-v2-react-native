#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(PremiumAdsAdapter, NSObject)

RCT_EXTERN_METHOD(setDebug:(BOOL)enabled
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
