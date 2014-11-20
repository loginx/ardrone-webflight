path = require 'path'

module.exports = (grunt) ->
  require('load-grunt-tasks')(grunt)

  grunt.initConfig
    pkg: pkg = grunt.file.readJSON 'package.json'

    clean:
      default: ['dist', '.tmp']
      apidocs: ['.tmp/src']

    coffee:
      default:
        options:
          sourceMap: false
          bare: true
        expand: true
        cwd: 'coffee'
        src: ['**/*.coffee']
        dest: './'
        ext: '.js'

    copy:
      assets:
        expand: true
        cwd: 'coffee'
        src: ['**/*.css']
        dest: './'
        ext: '.css'

    watch:
      coffee:
        files: ['coffee/**/*.coffee']
        tasks: ['coffee']
      assets:
        files: ['coffee/**/*.css']
        tasks: ['copy:assets']

  grunt.registerTask 'build', ['clean', 'coffee']
  grunt.registerTask 'default', ['coffee', 'watch']
