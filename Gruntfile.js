'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    compass: {
      dist: {
        options: {
          sassDir: 'app/assets/stylesheets',
          cssDir: 'public/stylesheets'
        }
      }
    },

    watch: {
      scripts: {
        files: '**/*.scss',
        tasks: ['compass'],
        options: {
          debounceDelay: 250,
        },
      },
    },

  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);

};
