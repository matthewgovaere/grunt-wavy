/*
 * grunt-wavy
 * https://github.com/matthewgovaere/grunt-wavy
 *
 * Copyright (c) 2014 Matthew Govaere
 * Licensed under the MIT license.
 */
'use strict';

var path = require('path');
var dargs = require('dargs');
var numCPUs = require('os').cpus().length || 1;
var async = require('async');
var chalk = require('chalk');
var spawn = require('win-spawn');
var which = require('which');

module.exports = function (grunt) {

  var checkBinary = function (cmd, errMess) {
    try {
      which.sync(cmd);
    }
    catch (err) {
      return grunt.warn(
        '\n' + errMess + '\n' +
        'More info: https://github.com/matthewgovaere/grunt-wavy\n'
      );
    }
  };

  grunt.registerMultiTask('wavy', 'Compile Wavy to HTML', function () {
    var cb = this.async();
    var options = this.options();
    var bundleExec = options.bundleExec;
    var banner;
    var passedArgs;

    if (bundleExec) {
      checkBinary('bundle',
        'bundleExec options set but no Bundler executable found in your PATH.'
      );
    }
    else {
      checkBinary('wavy',
        'You need to have Ruby and Wavy installed and in your PATH for this task to work.'
      );
    }

    passedArgs = dargs(options, ['bundleExec']);

    async.eachLimit(this.files, numCPUs, function (file, next) {
      var total = file.src.length;

      var load = function(src, current) {
        if (typeof src !== 'string') {
          src = file.orig.src[0];
        }

        if (!grunt.file.exists(src)) {
          grunt.log.warn('Source file "' + src + '" not found.');
          return next();
        }

        if (path.basename(src)[0] === '_') {
          return next();
        }

        var args = [
          options.config,
          src,
          file.dest
        ];

        var bin = 'wavy';

        if (bundleExec) {
          bin = 'bundle';
          args.unshift('exec', 'wavy');
        }

        grunt.verbose.writeln('Command: ' + bin + ' ' + args.join(' '));

        var cp = spawn(bin, args, {stdio: 'inherit'});

        cp.on('error', function (err) {
          grunt.warn(err);
        });

        cp.on('close', function (code) {
          if (code > 0) {
            return grunt.warn('Exited with error code ' + code);
          }

          grunt.log.writeln('File ' + chalk.cyan(file.dest) + ' created.');

          if(current === total) {
            next();
          }
        });
      };

      if (!grunt.file.exists(options.config)) {
        grunt.warn('Configuration file "' + options.config + '" not found.');
      }

      for(var i = 0; i < total; i++) {
        load(file.src[i], (i + 1));
      }
    }, cb);
  });
};