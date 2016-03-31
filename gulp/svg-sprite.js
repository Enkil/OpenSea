/* SVG sprite */
var gulp = require('gulp'),
    config = require('./config'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    newer = require('gulp-newer'),
    gutil = require('gulp-util'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    path = require('path'),
    cheerio = require('gulp-cheerio'),
    plumber = require('gulp-plumber');

gulp.task('svg-sprite', function () {
    gulp.src(config.pathTo.Src.SvgSprite)
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
        }))
        .pipe(newer(config.pathTo.Build.SvgSprite))
        .pipe(svgmin())
        .pipe(svgstore())
        .pipe(cheerio({
            run: function ($, file) {
                $('svg').addClass('_hide');
                $('[fill]').removeAttr('fill');
            },
            parserOptions: { xmlMode: true }
        }))
        //.pipe(svgstore())
        .pipe(gulp.dest(config.pathTo.Build.SvgSprite))
        .pipe(reload({stream: true}));
});

