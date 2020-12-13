//Подключаем модуль Gulp
const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const jshint = require('gulp-jshint');
const zip = require('gulp-zip')


//Порядок подключения css файлов
const cssFiles = [
    './bootstrap/css/bootstrap.min.css',
    './css/jquery.fancybox.min.css'];

//Порядок подключения css файлов
const jsFiles = [
    './js/jquery-3.3.1.min.js',
    './js/popper.min.js'];

//Таск для стилей CSS
function styles() {
    //Шаблон для поиска файлов CSS
    return gulp.src(cssFiles)
        //Объединение файлов в один
        .pipe(concat('style.css'))
        //Минификация CSS
        .pipe(cleanCSS({
            level: 2
        }))
        //Выходная папка для стилей
        .pipe(gulp.dest('./build/css'))
}

//Таск для скриптов JavaScript
function scripts() {
    //Шаблон для поиска файлов JavaScript
    return gulp.src(jsFiles)
        //Объединение файлов в один
        .pipe(concat('script.js'))
        //Минификация JavaScript
        .pipe(uglify())
        //Выходная папка для стилей
        .pipe(gulp.dest('./build/js'))
}
//Таск для сжатия картинок
function compress() {
    gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/image'))
}
//минимизировать html
function htmlpress() {
     return gulp.src('./*.html')
         .pipe(concat('index.html'))
         .pipe(htmlmin())
         .pipe(gulp.dest('build/html'))
}
//jshint анализ кода
function lint() {
    console.log('javascript files started');
    return gulp.src('/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('scripts.js'))
        .pipe(uglify().on('error', function(e) {console.log(e);}))
        .pipe(gulp.dest('build/js/'));
}
//сжатие всех папок в zip файл
function pressProject() {
    return gulp.src(['bin/*','bootstrap/**', 'index.html'], {base: '.'})
        .pipe(zip('Project.zip'))
        .pipe(gulp.dest('build/zip'))
}
function sprites() {
    gulp.src('/img/*.png')
        .pipe(sprite('sprites.png', {
            imagePath: 'build/sprite',
        }))
        .pipe(gulp.dest('./build/sprite/'));
};



//Вызов функций
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('compress', compress);
gulp.task('htmlpress', htmlpress);
gulp.task('jshint', lint);
gulp.task('zip', pressProject);
gulp.task('sprite', sprites);
//uglify и concat используются


