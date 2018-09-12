module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha','chai','riot'],
    plugins: [
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-chrome-launcher',
      'karma-chai',
      'karma-riot'
    ],
    files: [
      {
        pattern: 'node_modules/chai/chai.js', watched: false
      },
      'src/**/*.tag',
      'test/**/*.js'
    ],
    preprocessors: {
      '**/*.tag': ['riot']
    },
    browsers: ['ChromeHeadless'],
    reporters: ['mocha'],
    failOnEmptyTestSuite: false,
    autoWatch: true  
  })
}
