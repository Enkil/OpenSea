/* SCSS Documentation generating */
var gulp = require('gulp'),
    config = require('./config'),
    shell = require('gulp-shell');

gulp.task('scss-doc', shell.task( [
    config.StyledoccoOptions
] ) );

