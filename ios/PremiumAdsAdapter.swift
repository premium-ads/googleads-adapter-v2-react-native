import Foundation

@objc(PremiumAdsAdapter)
class PremiumAdsAdapter: NSObject {

    @objc(setDebug:resolver:rejecter:)
    func setDebug(_ enabled: Bool,
                  resolver resolve: @escaping RCTPromiseResolveBlock,
                  rejecter reject: @escaping RCTPromiseRejectBlock) {
        // Use NSClassFromString to avoid hard linking the framework at compile time
        var adapterClass: AnyClass? = NSClassFromString("PremiumAdsGoogleAdapter.PremiumAdsAdapter")
        if adapterClass == nil {
            adapterClass = NSClassFromString("PremiumAdsAdapter")
        }
        guard let cls = adapterClass else {
            reject("ADAPTER_ERROR", "PremiumAdsAdapter class not found", nil)
            return
        }

        let selector = NSSelectorFromString("setDebug:")
        guard cls.responds(to: selector) else {
            reject("ADAPTER_ERROR", "setDebug: selector not found", nil)
            return
        }

        _ = (cls as AnyObject).perform(selector, with: enabled)
        resolve(nil)
    }

    @objc
    static func requiresMainQueueSetup() -> Bool {
        return false
    }
}
