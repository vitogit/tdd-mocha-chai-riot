module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha','chai','riot'],
    plugins: [
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-chai',
      'karma-riot'
    ],
    files: [
      'node_modules/chai/chai',
      'src/**/*.tag',
      'test/**/*.js'
    ],
    preprocessors: {
      '**/*.tag': ['riot']
    },
    browsers: ['PhantomJS'],
    reporters: ['mocha'],
    failOnEmptyTestSuite: false,
    autoWatch: true  
  })
}
