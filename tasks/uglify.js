module.exports = {
  build: {
    src: 'client/build/js/production.js',
    dest: 'client/build/js/production.min.js'
  },
  options : {
    beautify : true,
    mangle   : true
  }
};
