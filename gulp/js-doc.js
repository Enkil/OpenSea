/* JavaScript documentation generating */
var gulp = require('gulp'),
    config = require('./config'),
    shell = require('gulp-shell');

gulp.task('js-doc', shell.task( [
    config.jsDocOptions
] ) );
