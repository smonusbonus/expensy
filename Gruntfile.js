module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      distApp: {
        // the files to concatenate
        src: ['src/scripts/*.js'],
        // the location of the resulting JS file
        dest: 'public/js/app.js'
      },
      distControllers: {
        // the files to concatenate
        src: ['src/scripts/controllers/*.js'],
        // the location of the resulting JS file
        dest: 'public/js/controllers.js'
      },
      distDirectives: {
        // the files to concatenate
        src: ['src/scripts/directives/*.js'],
        // the location of the resulting JS file
        dest: 'public/js/directives.js'
      },
      distServices: {
        // the files to concatenate
        src: ['src/scripts/services/*.js'],
        // the location of the resulting JS file
        dest: 'public/js/services.js'
      },
    },/*
    uglify: {
      options: {
        mangle: false
      },
      buildControllers: {
        src: 'tmp/js/controllers.concat.js',
        dest: 'build/js/controllers.concat.min.js'
      },
      buildModels: {
        src: 'tmp/js/models.concat.js',
        dest: 'build/js/models.concat.min.js'
      },
      buildDirectives: {
        src: 'tmp/js/directives.concat.js',
        dest: 'build/js/directives.concat.min.js'
      },
      buildMainJs: {
        src: 'src/js/app.js',
        dest: 'build/js/app.min.js'
      },
    },*/
    sass: { // Task
      dist: { // Target
        options: { // Target options
          style: 'compressed'
        },
        files: { // Dictionary of files
          'public/css/app.css': 'src/styles/app.scss' // 'destination': 'source'
        },
      },
    },
    copy: {
      main: {
        files: [
          {expand: true,  cwd: 'src/', src: ['views/*.html'], dest: 'public/', filter: 'isFile'},

          // copy font files manually (bower-concat doesn't do it)
          {expand: true,  cwd: 'bower_components/fontawesome/', src: ['fonts/*'], dest: 'public/', filter: 'isFile'},
          {expand: true,  cwd: 'bower_components/ratchet/', src: ['fonts/*'], dest: 'public/', filter: 'isFile'},
     
          {src: ['src/index.html'], dest: 'public/index.html'},
        ],
      },
    },
    bower_concat: {
      all: {
        dest: 'public/js/bower.js',
        cssDest: 'public/css/bower.css',
        exclude: [

        ],
        dependencies: {

        },
        bowerOptions: {
          relative: false
        },
      },
    },
    jshint: {
      beforeconcat: ['src/scripts/**/*.js', 'server.js'],
      afterconcat: ['build/*.js']
    },
    watch: {
      scripts: {
        files: ['src/scripts/**/*.js'],
        tasks: ['jshint', 'concat', 'copy'],
        options: {
          spawn: false,
        },
      },
      html: {
        files: ['src/**/*.html'],
        tasks: ['copy'],
        options: {
          spawn: false,
        },
      },
      styles: {
        files: ['src/styles/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        },
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-bower-concat');  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');  
  grunt.loadNpmTasks('grunt-contrib-sass');  
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'jshint', /*'uglify',*/ 'sass', 'copy', 'bower_concat']);

};