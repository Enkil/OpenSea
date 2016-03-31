/* SCSS Documentation generating */
var gulp = require('gulp'),
    config = require('./config'),
    styledocco = require('gulp-styledocco'),
    shell = require('gulp-shell');

//gulp.task('scss-doc', shell.task( [
//    config.StyledoccoOptions
//] ) );


gulp.task('styledocco', function () {
    gulp.src('src/scss/**/*.scss')
        .pipe(styledocco({
            out: 'dist/docs/scss',
            name: 'OpenSea',
            preprocessor: './node_modules/gulp-sass/bin/node-sass',
            'no-minify': true
        }));
});