module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      distApp: {
        // the files to concatenate
        src: ['src/app/*.js'],
        // the location of the resulting JS file
        dest: 'build/js/app.js'
      },
      distComponents: {
        // the files to concatenate
        src: ['src/app/components/**/*.js'],
        // the location of the resulting JS file
        dest: 'build/js/components.js'
      },
      distShared: {
        // the files to concatenate
        src: ['src/app/shared/*.js'],
        // the location of the resulting JS file
        dest: 'build/js/shared.js'
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
          'build/css/app.css': 'src/assets/scss/app.scss' // 'destination': 'source'
        },
      },
    },
    copy: {
      main: {
        files: [
          {expand: true,  cwd: 'src/', src: ['app/**/*.html'], dest: 'build/', filter: 'isFile'},

          // copy font files manually (bower-concat doesn't do it)
          {expand: true,  cwd: 'bower_components/fontawesome/', src: ['fonts/*'], dest: 'build/', filter: 'isFile'},
          {expand: true,  cwd: 'bower_components/ratchet/', src: ['fonts/*'], dest: 'build/', filter: 'isFile'},
     
          {src: ['src/index.html'], dest: 'build/index.html'},
        ],
      },
    },
    bower_concat: {
      all: {
        dest: 'build/js/bower.js',
        cssDest: 'build/css/bower.css',
        exclude: [

        ],
        dependencies: {

        },
        bowerOptions: {
          relative: false
        },
      },
    },
    watch: {
      scripts: {
        files: ['src/app/**/*.js'],
        tasks: ['concat', 'copy'],
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
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-bower-concat');  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');  
  grunt.loadNpmTasks('grunt-contrib-uglify');  
  grunt.loadNpmTasks('grunt-contrib-sass');  
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['concat', /*'uglify', */'sass', 'copy', 'bower_concat']);

};