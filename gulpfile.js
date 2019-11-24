var gulp       = require('gulp'),
    sass       = require('gulp-sass'),
    minify_css = require('gulp-minify-css'),
    notify     = require('gulp-notify'),
    autoprefix = require('gulp-autoprefixer'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    rename     = require('gulp-rename');

var src = {
    sass: 'sass/main.sass/',
    js: 'js/index.js/',
};

var output = {
    css: 'build/main.css/',
    js: 'build/main.js/',
};

gulp.task('css', function () {
    return gulp.src(src.sass + 'main.scss')
        .pipe(sass())
        .pipe(autoprefix('last 10 version'))
        .pipe(minify_css())
        .pipe(rename({basename: 'styles'}))
        .pipe(gulp.dest(output.css))
        .pipe(notify('CSS processed.'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function () {
    return gulp.src([
            src.js + 'main.js',
        ])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(output.js))
        .pipe(notify('JS processed.'));
});

gulp.task('watch', function () {
    browserSync.init({server: './output'});
    gulp.watch(src.sass + '**/*.scss', ['css']);
    gulp.watch(src.js + '**/*.js', ['js']);
    gulp.watch(src.js + '**/*.js', ['js']);
});

gulp.task('default', ['css', 'js', 'watch']);