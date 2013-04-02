module.exports = function(grunt) {

  // Set up template variables
  var config = {
        env: 'production'
      },
      variables = {
        config: config
      };

  // Project configuration.
  grunt.initConfig({
    lint: {
      files: ['grunt.js']
    },

    watch: {
      files: '**/*',
      tasks: 'build'
    },

    template: {
      // Render HTML via jade
      html: {
        src: 'index.jade',
        dest: 'index.html',
        variables: function () {
          return variables;
        }
      },

      // Sorry for the EJS, it is just easier for CSS
      // and SCSS was being too slow
      css: {
        src: 'index.ejs.css',
        dest: 'index.tmp.css',
        engine: 'ejs',
        variables: {}
      }
    },

    // Strip out all whitespace
    replace: {
      css: {
        src: 'index.tmp.css',
        dest: 'index.css',
        replacements: [{
          from: /\s+/g,
          to: ''
        }]
      }
    },

    // Lint options
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true,

        strict: false
      },
      globals: {}
    }
  });

  // Load in grunt-templater
  grunt.loadNpmTasks('grunt-templater');

  // Load in grunt-text-replace
  grunt.loadNpmTasks('grunt-text-replace');

  // Create a build task
  grunt.registerTask('build', 'template replace');

  // Register a dev-config task
  grunt.registerTask('dev-config', 'Configure the environment to be development', function () {
    config.env = 'development';
  });

  // Create a dev task
  grunt.registerTask('dev', 'dev-config build watch');

  // Default task.
  grunt.registerTask('default', 'lint build');

};
