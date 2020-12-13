// Gruntfile.js

// Вся конфигурация находится внутри этой функции
module.exports = function(grunt) {

    // ===========================================================================
    // Конфигурация GRUNT ===========================================================
    // ===========================================================================

    //Здесь будут указаны модули и их настройки
    grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: [
                    'js/*.js',
                    //'js/script.js' конкретный файл
                ],
                dest: 'build1/js/alljs.js',
            }
        },
        uglify: {
            build: {
                src: 'build1/js/alljs.js',
                dest: 'build1/js/alljs.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    src: ['img/*.{png,jpg,gif}'],
                    dest: 'build1/image/'
                }]
            }
        },

        jshint : {
            options: {
                reporter: require('jshint-stylish'),
            },
            build: ['Gruntfile.js', 'js/script.js']
        },
    less: {
        build: {
            files: {
                'css/style.css': 'build1/less/cool.less'
            }
        }
    },
        sprite:{
            build: {
                src: 'img/*.{png,jpg,gif}',
                dest: 'build1/sprite/*.png',
                destCss: 'build1/css/sprite.css'
            }
        },
        htmlmin: {                                     // Task
            build: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                 src:   "index.html",
                    dist: 'build1/index1.html'// 'destination': 'source'
                }
            }
        },
        compress: {
            main: {
                options: {
                    archive : "build1/dev.zip"
                },
                files: [
                    {
                        expand: true,
                        src: '**/',

                    }
                ]
            }
        },
        inlinecss: {
            main: {
                options: {
                },
                files: {
                    'index.html': 'build1/in.html'
                }
            }
        }
    });


    // ===========================================================================
    // Загружаем модули GRUNT ========================================================
    // ===========================================================================
    grunt.loadNpmTasks('grunt-contrib-concat'); // обьединение
    grunt.loadNpmTasks('grunt-contrib-uglify'); //минимизация js-files
    grunt.loadNpmTasks('grunt-contrib-imagemin'); //минимизация картинок
    grunt.loadNpmTasks('grunt-contrib-jshint'); //проверка js на ошибки
    grunt.loadNpmTasks('grunt-contrib-compress'); //zip
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    //grunt.registerTask('default', ['concat', 'uglify', imagemin']); //запуск всех

};