'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    'concurrent' : {
      run : {
        tasks: ['watch', 'nodemon'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    'compass' : {
      dist: {
        options: {
          sassDir: 'app/assets/stylesheets',
          cssDir: 'public/stylesheets'
        }
      }
    },

    'watch' : {
      scripts: {
        files: '**/*.scss',
        tasks: ['compass'],
        options: {
          debounceDelay: 250,
        },
      },
    },

    'nodemon' : {
      dev: {
        options: {
          file: 'server.js',
          args: ['development'],
          nodeArgs: ['--debug'],
          env: {
            PORT: '3000'
          }
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['concurrent:run']);

};
