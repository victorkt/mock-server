'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        
        // JS TASKS ================================================================
        // check all js files for errors
        jshint: {
            all: ['public/javascripts/**/*.js']
        },
        
        // take all the js files and minify them into app.min.js
        uglify: {
            build: {
                files: {
                    'public/js/app.min.js': [
                        'public/components/angular/angular.min.js',
                        'public/components/angular-animate/angular-animate.min.js',
                        'public/components/angular-aria/angular-aria.min.js',
                        'public/components/angular-messages/angular-messages.min.js',
                        'public/components/angular-resource/angular-resource.min.js',
                        'public/components/angular-material/angular-material.min.js',
                        'public/components/angular-material-data-table/md-data-table.min.js',
                        'public/components/angular-ui-router/release/angular-ui-router.min.js',
                        'public/javascripts/**/*.js',
                        'public/javascripts/*.js'
                    ]
                }
            }
        },
        
        // CSS TASKS ===============================================================
        // preprocess CSS files using SASS
        sass: {
            build: {
                files: {
                    'public/stylesheets/style.css': 'public/stylesheets/style.css.scss'
                }
            }
        },

        // take the processed style.css file and minify
        cssmin: {
            build: {
                files: {
                    'public/css/app.min.css': [
                        'public/components/angular-material/angular-material.min.css',
                        'public/components/angular-material-data-table/dist/md-data-table.min.css',
                        'public/stylesheets/**/*.css',
                        'public/stylesheets/*.css'
                    ]
                }
            }
        },
        
        // OTHER TASKS ==============================================================
        // include all javascript and css files on index.html
        includeSource: {
            options: {
                basePath: 'public',
                templates: {
                    html: {
                        js: '<script type="text/javascript" src="{filePath}"></script>',
                        css: '<link rel="stylesheet" type="text/css" href="{filePath}" />',
                    }
                }
            },
            dist: {
                files: {
                    'public/app.html': 'public/app.tpl.html'
                }
            }
        },

        // watch css and js files and process the above tasks
        watch: {
            css: {
                files: ['public/stylesheets/**/*.scss'],
                tasks: ['sass']
            },
            js: {
                files: ['public/javascripts/**/*.js'],
                tasks: ['jshint']
            },
            all: {
                files: ['public/javascripts/**/*.js', 'public/app.tpl.html'],
                tasks: ['includeSource']
            }
        },
        
        // watch our node server for changes
        nodemon: {
            dev: {
                script: 'server.js'
            }
        },
        
        // run watch and nodemon at the same time
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['nodemon', 'watch']
        },
        
        // TEST TASKS ==============================================================
        // run site unit tests
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            },
            continuous: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            },
        },
        
        // run site e2e tests
        protractor: {
            options: {
                // Location of your protractor config file
                configFile: 'protractor.conf.js',
                
                // Do you want the output to use fun colors?
                noColor: false,
                
                // Set to true if you would like to use the Protractor command line debugging tool
                // debug: true,
                
                // Additional arguments that are passed to the webdriver command
                args: { }
            },
            e2e: {
                options: {
                    // Stops Grunt process if a test fails
                    keepAlive: false
                }
            },
            continuous: {
                options: {
                    keepAlive: true
                }
            }
        },
        
    });
    
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-karma');
    // grunt.loadNpmTasks('grunt-protractor-runner');
    
    grunt.registerTask('build', ['sass', 'cssmin', 'jshint', 'uglify', 'includeSource']);
    grunt.registerTask('dev', ['sass', 'jshint', 'includeSource', 'concurrent']);

};