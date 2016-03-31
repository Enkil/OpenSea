var gulp = require('gulp'),
    config = require('./config'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    plumber = require('gulp-plumber'),
    inlineCss = require('gulp-inline-css');

gulp.task('inline-css', function() {
    return gulp.src(config.pathTo.Src.InlineCSS)
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
        }))
        .pipe(inlineCss({
            applyStyleTags: true,
            applyLinkTags: true,
            removeStyleTags: false,
            removeLinkTags: false,
            preserveMediaQueries: true,
            applyWidthAttributes: true,
            applyTableAttributes: true
        }))
        .pipe(gulp.dest(config.pathTo.Build.InlineCSS))
        .pipe(reload({stream: true}));
});

var inline = require('gulp-mc-inline-css');

gulp.task('inliner', function() {
    gulp.src(config.pathTo.Src.InlineCSS)
        .pipe(inline('70b1d907781d32fd9cfe5d02b33cc12f-us12'))
        .pipe(gulp.dest(config.pathTo.Build.InlineCSS));
});