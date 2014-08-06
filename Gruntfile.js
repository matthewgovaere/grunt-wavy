/*
 * grunt-wavy
 * http://wavy.it
 *
 * Copyright (c) 2014 Matthew Govaere
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: {
      name: 'grunt-wavy'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ]
    },
    clean: {
      test: [
        'test/tmp'
      ]
    },
    nodeunit: {
      tests: ['test/*_test.js']
    },
    wavy: {
      options: {
        config: 'test/fixtures/compile.wavy'
      },
      general: {
        files: {
          'test/tmp/multiple': ['test/fixtures/multiple/one.html.wavy', 'test/fixtures/multiple/two.html.wavy'],
          'test/tmp': 'test/fixtures/test.html.wavy'
        }
      },
      recursive: {
        files: {
          'test/tmp/recursive': ['test/fixtures/recursive']
        }
      }
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', [
    'clean',
    'wavy',
    'nodeunit',
    'clean'
  ]);

  grunt.registerTask('default', ['jshint', 'test']);
};