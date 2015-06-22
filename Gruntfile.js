module.exports = function(grunt) {
    
    grunt.initConfig({
        
        // JS TASKS ================================================================
        // check all js files for errors
        jshint: {
            all: ['site/js/**/*.js']
        },
        
        // take all the js files and minify them into app.min.js
        uglify: {
            build: {
                files: {
                    'public/js/app.min.js': ['site/javascripts/**/*.js', 'site/javascripts/*.js']
                }
            }
        },
        
        // CSS TASKS ===============================================================
        // take the processed style.css file and minify
        cssmin: {
            build: {
                files: {
                    'public/css/style.min.css': ['site/stylesheets/**/*.css', 'site/stylesheets/*.css']
                }
            }
        },

        // BUILD TASKS ==============================================================
        // include all javascript and css files on index.html
        copy: {
            build: {
                files: [
                    // includes files within path and its sub-directories
                    { cwd: 'site/javascripts/', src: ['**'], dest: 'public/js/' },
                    { cwd: 'site/stylesheets/', src: ['**'], dest: 'public/css/' },
                ]
            }
        },
        
        // OTHER TASKS ==============================================================
        // include all javascript and css files on index.html
        includeSource: {
            options: {
                basePath: 'site',
                templates: {
                    html: {
                        js: '<script type="text/javascript" src="{filePath}"></script>',
                        css: '<link rel="stylesheet" type="text/css" href="{filePath}" />',
                    }
                }
            },
            dist: {
                files: {
                    'public/app.html': 'site/index.html'
                }
            }
        },

        // watch css and js files and process the above tasks
        watch: {
            css: {
                files: ['site/css/**/*.css'],
                tasks: []
            },
            js: {
                files: ['site/js/**/*.js'],
                tasks: ['jshint']
            },
            all: {
                files: ['site/**/*.js'],
                tasks: ['includeSource'],
                options: {
                    event: ['added', 'deleted']
                }
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
                configFile: "protractor.conf.js",
                
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
    
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-karma');
    // grunt.loadNpmTasks('grunt-protractor-runner');
    
    grunt.registerTask('default', ['cssmin', 'jshint', 'uglify', 'includeSource', 'concurrent']);

};