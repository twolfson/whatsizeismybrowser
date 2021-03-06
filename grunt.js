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
        src: 'app.ejs.css',
        dest: 'app.tmp.css',
        engine: 'ejs',
        variables: {}
      }
    },

    // Strip out all whitespace
    replace: {
      css: {
        src: 'app.tmp.css',
        dest: 'app.css',
        replacements: [{
          from: /\s+/g,
          to: ''
        }]
      }
    },

    // Resource management
    curl: {
      'tmp/subtle_dots.zip': 'http://subtlepatterns.com/patterns/subtle_dots.zip'
    },
    unzip: {
      background: {
        src: 'tmp/subtle_dots.zip',
        dest: '',
        router: function (filepath) {
          // Extract only subtle_dots.png
          if (filepath === 'subtle_dots/subtle_dots.png') {
            return 'subtle_dots.png';
          } else {
            return 'tmp/unzip/' + filepath;
          }
        }
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

  // Load in grunt-curl and grunt-zip
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-zip');

  // Create a resource task
  grunt.registerTask('resources', 'curl unzip');

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
