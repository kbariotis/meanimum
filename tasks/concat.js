module.exports = {
  dist: {
    src: [
      'client/bower_components/angular/angular.js',
      'client/bower_components/angular-route/angular-route.js',
      'client/bower_components/angular-resource/angular-resource.js',
      'client/bower_components/ngstorage/ngStorage.min.js',
      'client/app/**/*.js',
      'client/app/app.js'
    ],
    dest: 'client/build/js/production.js'
  }
};
