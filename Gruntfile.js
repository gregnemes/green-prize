// Generated on 2013-09-26 using generator-webapp 0.2.7
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            compass: {
                files: ['<%= yeoman.app %>/sass/{,*/}*.{scss,sass}'],
                tasks: ['compass:server']
            },
            styles: {
                files: ['<%= yeoman.app %>/css/{,*/}*.css']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/*.{php,html}',
                    '<%= yeoman.app %>/css/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        clean: {
            dist: {
                files:[{
                    dot: true,
                    src: [
                        '<%= yeoman.dist %>/*',
                        '<%= yeoman.dist %>/.git*'
                    ]
                }]
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/css/{,*/}*.css'
                    ]
                }
            }
        },
        useminPrepare: {
            options: {
                dest: '<%= yeoman.dist %>'
            },
            html: ['<%= yeoman.app %>/__header_assets.html', '<%= yeoman.app %>/__footer_assets.html']
        },
        usemin: {
            options: {
                dirs: ['<%= yeoman.dist %>']
            },
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/css/{,*/}*.css']
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/{,*/{,*/}}}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            options: {
                plugins: [{
                    cleanupIDs: false
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/{,*/{,*/}}}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}',
                        'css/fonts/**',
                        '{,*/{,*/{,*/}}}*.{php,html}'
                    ]
                }]
            },
            dev: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}',
                        'bower_components/**',
                        'scripts/**',
                        'css/**',
                        '{,*/{,*/{,*/}}}*.{php,html}'
                    ]
                }]
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/sass',
                cssDir: '<%= yeoman.app %>/css',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/css/fonts',
                importPath: '<%= yeoman.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/css/fonts',
                relativeAssets: false,
                require: 'compass',
                debugInfo: false,
                outputStyle: 'compressed',
                noLineComments: true,
                
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= yeoman.dist %>/images/generated',
                    force: true
                }
            },
            server: {
                options: {
                    debugInfo: true,
                    outputStyle: 'expanded',
                    noLineComments: false,
                    force: false
                }
            }
        },
        connect: {
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            }
        },
        concurrent: {
            dist: [
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        },
        rsync: {
            options: {
                args:['--verbose'],
                exclude: ['.git', '*.scss', 'node_modules', '.DS_Store'],
                recursive: true
            },
            dev: {
                options: {
                    src: '<%= yeoman.dist %>/',
                    dest: 'webapps/greenprize',
                    host: 'alettieri',
                    syncDestIgnoreExcl: true
                }
            },
            prod: {
                options: {
                    src: '<%= yeoman.dist %>/',
                    dest: 'webapps/greenprize',
                    host: 'greenprize',
                    syncDestIgnoreExcl: true
                }
            }
        }
    });
    
    grunt.registerTask('build:dev',[
        'clean:dist',
        'concurrent:dist',
        'compass:dist',
        'copy:dev'
    ]);

    grunt.registerTask('build:prod',[
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'compass:dist',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'rev',
        'usemin'
    ]);
    
    grunt.registerTask( 'deploy', [
        'build:dev',
        'rsync:dev'
    ]);

    grunt.registerTask( 'deploy:prod', [
        'build:prod',
        'rsync:prod'
    ]);
};
