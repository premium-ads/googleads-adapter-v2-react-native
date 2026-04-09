require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "premium-ads-adapter-v2"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = { :type => 'Proprietary', :text => 'See LICENSE file' }
  s.authors      = { 'PremiumAds' => 'alex@premiumads.net' }
  s.platforms    = { :ios => "13.0" }
  s.source       = { :git => "https://github.com/premium-ads/googleads-adapter-v2-react-native.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"
  s.swift_version = '5.9'

  s.dependency "React-Core"
  s.dependency "PremiumAdsGoogleAdapter", "~> 1.0.6"
end
