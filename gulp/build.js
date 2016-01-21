/* Build */
var gulp = require('gulp'),
    runSequence = require('run-sequence').use(gulp);

gulp.task('build', function(callback) {
    runSequence(
        'clean',
        'jade',
        'bower',
        'js',
        'png-sprite',
        'images',
        'svg',
        'svg-sprite',
        'fonts',
        'sass',
        'txt',
        'js-doc',
        'scss-doc',
        //'gh-pages',
        callback)
});
