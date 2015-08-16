module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    jasmine : {
      src : 'src/jquery.big-youtube.js',
      options : {
        vendor: ['vendor/jquery-2.1.4.min.js'],
        specs : 'spec/**/*.js'
      }
    },
    watch: {
      test: {
        files: ['src/**/*.js', 'spec/**/*.js'],
        tasks: ['test']
      }
    }
    //jshint: {
    //  all: [
    //    'Gruntfile.js',
    //    'src/**/*.js',
    //    'spec/**/*.js'
    //  ],
    //  options: {
    //    jshintrc: '.jshintrc'
    //  }
    //}
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('test', ['jasmine']);

  grunt.registerTask('dev', ['test', 'watch:test']);
  grunt.registerTask('default', ['test']);

};