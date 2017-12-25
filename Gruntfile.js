'use strict';

var serveStatic = require('serve-static');

var env = process.env.NODE_ENV;
if (!env) {
  env = 'development';
}

console.log('using ' + env);

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-ng-templates');

  grunt.initConfig({
    'clean': {
      'tmp': {
        'files': [{
          'src': ['.tmp'],
        }],
      },
      'dist': {
        'files': [{
          'src': ['dist'],
        }],
      },
    },
    'wiredep': {
      'tmp': {
        'src': ['.tmp/app/index.html'],
      },
    },
    'ngAnnotate': {
      'tmp': {
        'files': [{
          'expand': true,
          'src': '.tmp/app/scripts/{,*/}*.js',
          'desc': '.tmp',
        }],
      },
    },
    'sass': {
      'tmp': {
        'options': {
          'includePaths': ['bower_components/foundation-sites/scss'],
        },
        'files': [{
          'src': 'app/assets/scss/stylesheets.scss',
          'dest': '.tmp/app/assets/css/stylesheets.css',
        }],
      },
    },
    'babel': {
      'options': {
        'presets': ['env', 'stage-3'],
        'plugins': ['transform-inline-environment-variables'],
      },
      'tmp': {
        'files': [{
          'expand': true,
          'src': [
            'app/scripts/{,*/}*.js',
            'app/config/' + env + '.js',
          ],
          'dest': '.tmp/',
        }],
      },
    },
    'sails-linker': {
      'js': {
        'options': {
          'appRoot': '.tmp/app/',
        },
        'files': [{
          '.tmp/app/index.html': [
            '.tmp/app/scripts/*/*.js',
            '.tmp/app/config/' + env + '.js',
          ],
        }],
      },
      'css': {
        'options': {
          'startTag': '<!--STYLES-->',
          'endTag': '<!--STYLES END-->',
          'fileTmpl': '<link rel="stylesheet" href="%s" />',
          'appRoot': '.tmp/app/',
        },
        'files': [{
          '.tmp/app/index.html': ['.tmp/app/assets/css/stylesheets.css'],
        }],
      },
    },
    'copy': {
      'tmp': {
        'files': [{
          'expand': true,
          'src': [
            'app/index.html',
            'app/assets/fonts/**/*',
          ],
          'dest': '.tmp/',
        }],
      },
      'dist': {
        'files': [{
          'src': ['.tmp/app/index.html'],
          'dest': 'dist/index.html',
        }],
      },
    },
    'ngtemplates': {
      'tmp': {
        'src': ['app/*/*.html'],
        'dest': '.tmp/app/scripts/template/template.js',
        'options': {
          'url': function(url) { return url.replace('app/', ''); },
          'bootstrap': function (module, script) {
            return 'angular.module("app").run(["$templateCache", function ($templateCache) {\n' + script + '}])';
          },
        },
      },
    },
    'useminPrepare': {
      'html': '.tmp/app/index.html',
    },
    'filerev': {
      'options': {
        'algorithm': 'md5',
        'length': 8,
      },
      'dist': {
        'src': [
          'dist/scripts/app.js',
          'dist/assets/stylesheets.css',
        ],
      },
    },
    'usemin': {
      'html': ['dist/index.html'],
      'js': ['dist/scripts/*.js'],
      'css': ['dist/assets/*.css'],
    },
    'watch': {
      'options': {
        'livereload': true,
        'spawn': false,
      },
      'index': {
        'files': 'app/index.html',
        'tasks': ['copy:tmp', 'wiredep:tmp', 'link'],
      },
      'html': {
        'files': 'app/*/*.html',
        'tasks': ['ngtemplates:tmp'],
      },
      'scripts': {
        'files': 'app/**/*.js',
        'tasks': ['babel:tmp', 'link'],
      },
      'css': {
        'files': 'app/assets/**/*.scss',
        'tasks': ['sass:tmp'],
      },
      'bower': {
        'files': 'bower.json',
        'tasks': ['wiredep:tmp', 'link'],
      },
    },
    'connect': {
      'options': {
        'port': 9000,
        'hostname': 'localhost',
        'livereload': true,
      },
      'tmp': {
        'options': {
          'base': ['.tmp/app', '.'],
        },
      },
    },
  });

  grunt.event.on('watch', function (action, filepath) {
    grunt.log.writeln(action);
    grunt.log.writeln(filepath);
  });

  grunt.registerTask('serve', [
    'default',
    'connect:tmp',
    'watch',
  ]);

  grunt.registerTask('link', [
    'sails-linker:js',
    'sails-linker:css',
  ]);

  grunt.registerTask('default', [
    'clean:tmp',
    'copy:tmp',
    'wiredep:tmp',
    'babel:tmp',
    'ngAnnotate:tmp',
    'ngtemplates:tmp',
    'sass:tmp',
    'link',
  ]);

  grunt.registerTask('dist', [
    'default',
    'clean:dist',
    'copy:dist',
    'useminPrepare',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    'filerev',
    'usemin',
  ]);
};
