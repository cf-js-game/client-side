'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.loadNpmTasks('grunt-jscs');

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
            'app/game/**/*.js',
            'server.js']
    },
    jscs: {
      options: {
        config: '.jscsrc'
      },
      src: ['server.js',
            'app/js/game/**/*.js']
    },
    simplemocha: {
      all: {
        src: ['test/server/**/*.js']
      }
    },
    watch: {
      scripts: {
        files: ['**/*.js', 'server.js'],
        tasks: ['jshint', 'simplemocha:all']
      },
      options: {
        spawn: false
      }
    },

    clean: {
      build: {
        src: ['build/']
      }
    },

    copy: {
      build: {
        expand: true,
        cwd: 'app/',
        src: ['**/*.html', '**/*.png', '**/*.css'],
        dest: 'build/',
        flatten: false,
        filter: 'isFile'
      }
    },

    browserify: {
      dev: {
        src: ['app/js/**/*.js'],
        dest: 'build/bundle.js'
      },
      options: {
        transform: ['reactify']
      }
    },
  });

  grunt.registerTask('test', ['jshint', 'jscs', 'simplemocha:all']);
  grunt.registerTask('default', ['test']);
  grunt.registerTask('build', ['clean', 'browserify', 'copy']);
};
