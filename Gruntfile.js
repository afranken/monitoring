module.exports = function(grunt) {

    grunt.initConfig({

        // ----- Environment
        // read in some metadata from project descriptor
        project: grunt.file.readJSON('package.json'),

        // define some directories to be used during build
        dir: {

            // location of all source files
            "source": "src",

            // location where TypeScript source files are located
            "source_ts": "src/main/ts",
            // location where TypeScript/Jasmine test files are located
            "source_test_ts": "src/test/ts",

            // location where all build files shall be placed
            "target": "target",

            //location where all javascript files are located
            "source_js": "src/main/js",

            //location where all css files are located
            "source_css": "src/main/css",

            //location to place css files
            "target_css": '<%= "target/"+project.name+"-"+project.version+"/css" %>',

            // location to place (compiled) javascript files
            "target_js": '<%= "target/"+project.name+"-"+project.version %>',  //"target/js"
            // location to place (compiles) javascript test files
            "target_test_js": "target/js-test",
            // location to place documentation, etc.
            "target_report": "target/report"
        },

        watch: {
          ts: {
            files: ['<%= dir.source_ts %>/**/*.ts'],
            tasks: ['typescript:compile']
          },
          html: {
            files: ['<%= dir.source %>/main/html/*.*'],
            tasks: ['copy:html']
          },
          js: {
            files: ['<%= dir.source_js %>/*.*'],
            tasks: ['copy:js']
          }
        },

        copy: {
          js: {
            flatten: true,
            expand: true,
            filter: 'isFile',
            cwd: '<%= dir.source_js %>',
            src:'*',
            dest:'<%= dir.target_js %>/js'
          },
          vendorjs: {
            flatten: true,
            expand: true,
            filter: 'isFile',
            cwd: '<%= dir.source_js %>/vendor/',
            src:'*',
            dest:'<%= dir.target_js %>/js/vendor/'
          },
          vendorjs_test: {
            flatten: true,
            expand: true,
            filter: 'isFile',
            cwd: '<%= dir.source_js %>/vendor/',
            src:['*','!bootstrap*'],
            dest:'<%= dir.target_test_js %>/main/ts/vendor/'
          },
          html: {
            flatten: true,
            expand: true,
            filter: 'isFile',
            cwd: '<%= dir.source %>/main/html/',
            src:'*',
            dest:'<%= dir.target_js %>/'
          },
          css: {
//            flatten: true,
            expand: true,
            filter: 'isFile',
            cwd: '<%= dir.source_css %>',
            src:['**','!bootstrap.css','!bootstrap-theme.css'],
            dest:'<%= dir.target_css %>/'
          }
        },

        // ---- clean workspace
        clean: {
            target: {
                src: "<%= dir.target %>"
            }
        },

        // ----- TypeScript compilation
        //  See https://npmjs.org/package/grunt-typescript
        typescript: {

            // Compiles main code. Add declaration file files
            compile: {
                src: ['<%= dir.source_ts %>/**/*.ts'],
                dest: '<%= dir.target_js %>/app/',
                options: {
                    basePath: '<%= dir.source_ts %>',
                    target: 'es5',
                    declaration: true,
                    sourceMap: true,
                    comments: true,
//                    nolib: false,
                    module: 'AMD'
                }
            },

            // Compiles the tests (and the module code again so that import paths are working).
            compile_test: {
                src: ['<%= dir.source %>/**/*.ts'],
                dest: '<%= dir.target_test_js %>',
                options: {
                    basePath: '<%= dir.source %>',
                    target: 'es5',
                    module: 'amd'
                }
            }
        },

        tslint: {
            options: {
                configuration: grunt.file.readJSON("tslint.json")
            },
            files: {
                src: ['<%= dir.source %>/**/*.ts']
            }
        },

        // ------- Unit tests with code coverage
        //  See https://github.com/gruntjs/grunt-contrib-jasmine
        jasmine: {
            run: {
                // the code to be tested
                src: ['<%= dir.target_test_js %>/main/ts/**/*.js',
                  '!<%= dir.target_test_js %>/main/ts/vendor/*'],
                options: {

                    // the tests
                    specs: '<%= dir.target_test_js %>/test/ts/**/*Spec.js',
                    keepRunner: false, // useful for debugging

                    // -- additional JUnit compliant test reports that Jenkins is able to analyze
                    junit: {
                        path: "<%= dir.target %>/surefire-reports",
                        consolidate: false
                    },


                    // -- Optional: code coverage reports
                    //   See https://github.com/maenu/grunt-template-jasmine-istanbul
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {

                        // options for jasmine-istanbul
                        coverage: '<%= dir.target_report %>/coverage/coverage.json',
                        report: [
                            {
                                type: 'html',
                                options: { dir: '<%= dir.target_report %>/coverage/html' }
                            },
                            {
                                // generate a cobertura-style report
                                type: 'cobertura',
                                options: { dir: '<%= dir.target_report %>/coverage/cobertura' }
                            },
                            {
                                type: 'text-summary'
                            },
                            {
                                type: 'lcov',
                                options: { dir: '<%= dir.target_report %>/coverage/lcov' }
                            }
                        ],

                        // Run jasmine in AMD/RequireJS mode (because all compiled files are AMD!)
                        //   https://github.com/cloudchen/grunt-template-jasmine-requirejs
                        template: require('grunt-template-jasmine-requirejs'),
                        templateOptions: {
                            requireConfig: {
                                paths: {
                                  'ApplicationViewModel': './target/js-test/main/ts/ApplicationViewModel',
                                  'jquery': './target/js-test/main/ts/vendor/jquery-2.1.0.min',
                                  'moment': './target/js-test/main/ts/vendor/moment-with-langs.min',
                                  'knockout': './target/js-test/main/ts/vendor/knockout-3.1.0'
                                }
                            }
                        }
                    }
                }
            }
        },

        coveralls: {
          options: {
            // When true, grunt-coveralls will only print a warning rather than
            // an error, to prevent CI builds from failing unnecessarily (e.g. if
            // coveralls.io is down). Optional, defaults to false.
            force: false
          },
          main_target: {
            // Target-specific LCOV coverage file
            src: '<%= dir.target_report %>/coverage/lcov/*.info'
          }
        },

        // ------ Optional: make javascript small (and unreadable)
        //  See https://github.com/gruntjs/grunt-contrib-uglify
        //  Note: Consider doing the uglification in the _final_ webapp
        uglify: {
            options: {
                // add a small descriptive banner
                banner: '/*! <%= project.name %> - v<%= project.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            minify_js: {
                // minify javascript file by renaming it to *.min.js
                files: [{
                     expand: true,
                     cwd: '<%= dir.target_js %>',
                     src: '**/*.js',
                     dest: '<%= dir.target_js %>',
                     ext: '.min.js'
                 }]
            }
        },


        // ----- Optional: generate documentation
        // Note: This requires documentation to be written in YUIDoc syntax (see http://yui.github.io/yuidoc/syntax/index.html) which is a bit
        //  cumbersome for Typescript where the required information (e.g. @class) already exist.
        //  TODO: Integrate a TypeScript compliant documentation mechanism.
        yuidoc: {
            compile: {
                name: '<%= project.name %>',
                description: '<%= project.description %>',
                version: '<%= project.version %>',
                url: '<%= project.homepage %>',
                options: {
                    paths: '<%= dir.target_js %>',
                    outdir: '<%= dir.target_report %>/apidoc'
                }
            }
        },

        requirejs: {

          // these defaults will be used as a base for every target we define
          options: {
            // the name is used to find js/amd/app.js, basically
            name: 'ApplicationViewModel',

            // this should be set to the path from your project root to the
            // root of your AMD JavaScript files.
            baseUrl: '<%= dir.target_js %>/app',

            // where we want the compilation result to go
            out: '<%= dir.target_js %>/js/simon.min.js',

            paths: {
              'ApplicationViewModel': './ApplicationViewModel',
              'jquery': '../js/vendor/jquery-2.1.0.min',
              'knockout': '../js/vendor/knockout-3.1.0',
              'moment': '../js/vendor/moment-with-langs.min',
              'requireLib': "../js/vendor/require"
            },

            // don't merge dependencies into library artifact.
            exclude : [
              'jquery',
              'knockout',
              'moment'
            ],

            findNestedDependencies: true
          },

          debug: {

            // These options also get merged with the defaults defined above
            options: {

              // for some reason, generating source maps requires this to be off
              // and it's on by default...
              preserveLicenseComments: false,

              // we want source maps because we're bundling everything together
              // learn more about source maps here:
              // http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/
              generateSourceMaps: true,

              // also required by the generateSourceMaps option
              optimize: 'none'
            }
          },

          // This target will inherit the default options, which is
          // enough for us. The defaults are tuned to optimize.
          release: {}
        }

    });


    // ----- Setup tasks

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-coveralls');
    grunt.loadNpmTasks('grunt-tslint');

    // Default task(s).
    grunt.registerTask('default', [
    /*'clean',*/
      'copy',
//      'tslint',
      'typescript:compile'
//      'typescript:compile_test',
//      'jasmine',
//      'requirejs:debug'
    ]);

    // Task for running compilation/assembling stuff (corresponds to Maven's "compile" or "resources" lifecycle phase)
    grunt.registerTask('compile', [
      'copy',
      'typescript:compile'
    ]);
    // Task for running testing stuff (corresponds to Maven's "test" lifecycle phase)
    grunt.registerTask('test', [
      'copy',
      'typescript:compile_test',
      'jasmine'
    ]);
    // Task for running testing stuff (corresponds to Maven's "prepare-package" lifecycle phase)
    grunt.registerTask('package', [
      'uglify',
      'requirejs:release'
    ]);

};
