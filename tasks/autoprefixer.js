module.exports = {
  options: {
    browsers: ['last 2 version']
  },
  multiple_files: {
    expand: true,
    flatten: true,
    src: 'client/build/css/*.css',
    dest: 'client/build/css/prefixed/'
  }
};
