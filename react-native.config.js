module.exports = {
  dependency: {
    platforms: {
      android: {
        sourceDir: './android',
        packageImportPath: 'import net.premiumads.rnadapter.PremiumAdsAdapterPackage;',
        packageInstance: 'new PremiumAdsAdapterPackage()',
      },
      ios: {},
    },
  },
};
