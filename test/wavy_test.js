'use strict';

var grunt = require('grunt');

exports.wavy = {
  setUp: function(done) {
    done();
  },
  basic: function(test) {
    test.expect(1);

    var wavy = grunt.file.read('test/tmp/test.html');
    var expected = grunt.file.read('test/expected/test.html');

    test.equal(wavy, expected, 'should compile WAVY to HTML');

    test.done();
  },
  multiple: function(test) {
    test.expect(2);

    var multiple_one = grunt.file.read('test/tmp/multiple/one.html');
    var multiple_one_exp = grunt.file.read('test/expected/multiple/one.html');

    var multiple_two = grunt.file.read('test/tmp/multiple/two.html');
    var multiple_two_exp = grunt.file.read('test/expected/multiple/two.html');

    test.equal(multiple_one, multiple_one_exp, 'should compile WAVY to HTML');
    test.equal(multiple_two, multiple_two_exp, 'should compile WAVY to HTML');

    test.done();
  },
  recurisve: function(test) {
    test.expect(2);

    var recursive = grunt.file.read('test/tmp/recursive/parent.html');
    var recursive_exp = grunt.file.read('test/expected/recursive/parent.html');

    var recursive_sub = grunt.file.read('test/tmp/recursive/sub/child.html');
    var recursive_sub_exp = grunt.file.read('test/expected/recursive/sub/child.html');

    test.equal(recursive, recursive_exp, 'should compile WAVY to HTML');
    test.equal(recursive_sub, recursive_sub_exp, 'should compile WAVY to HTML');

    test.done();
  }
};
