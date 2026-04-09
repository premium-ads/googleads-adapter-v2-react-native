require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = 'PremiumAdsReactNativeAdmobAdapter'
  s.version      = package['version']
  s.summary      = package['description']
  s.description  = package['description']
  s.license      = package['license']
  s.authors      = { 'alexgmax' => 'alex@premiumads.net' }
  s.homepage     = package['homepage']
  s.platforms    = { :ios => '13.0' }
  s.source       = { :git => 'https://github.com/premium-ads/google-mediation-adapter.git', :tag => "v#{s.version}" }

  s.source_files = 'ios/**/*.{h,m,mm}'
  s.requires_arc = true

  s.dependency 'React-Core'
  s.dependency 'PremiumAdsGoogleAdapter'
  s.dependency 'Google-Mobile-Ads-SDK'
end
