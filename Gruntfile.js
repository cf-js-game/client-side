'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    jshint: {
      options:{
        jshintrc: true
      },
    src: ['Gruntfile.js',
          'test/**/*.js',
          'models/**/*.js',
          'routes/**/*.js',
          'lib/**/*.js',
          'server.js']
    },
    simplemocha: {
      all: {
        src: ['test/server/**/*.js']
      }
    },
    watch: {
    scripts: {
      files: ['**/*.js', 'server.js'],
      tasks: ['jshint', 'simplemocha:all'],
    options: {
      spawn: false
    }
  }
}
  });

  grunt.registerTask('test', ['jshint', 'simplemocha:all']);
  grunt.registerTask('default', ['test']);
};
