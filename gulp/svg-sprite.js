/* SVG sprite */
//var gulp = require('gulp'),
//    config = require('./config'),
//    svg2png = require('gulp-svg2png'),
//    imagemin = require('gulp-imagemin'),
//    svgspritesheet = require('gulp-svg-spritesheet'),
//    newer = require('gulp-newer'),
//    gutil = require('gulp-util'),
//    browserSync = require("browser-sync"),
//    reload = browserSync.reload,
//    plumber = require('gulp-plumber');
//
//gulp.task('svg-sprite', function () {
//    gulp.src(config.pathTo.Src.SvgSprite)
//        .pipe(plumber(function(error) {
//            gutil.log(gutil.colors.red(error.message));
//            this.emit('end');
//        }))
//        .pipe(newer(config.pathTo.Build.SvgSprite))
//        .pipe(svgspritesheet({
//            cssPathNoSvg: '../svg/sprite/svg-sprite.png',
//            cssPathSvg: '../svg/sprite/svg-sprite.svg',
//            padding: 1,
//            pixelBase: 16,
//            positioning: 'packed',
//            templateSrc: config.pathTo.Src.SvgSpriteTpl,
//            templateDest: config.pathTo.Build.SvgSpriteCSS,
//            units: 'rem'
//        }))
//        .pipe(imagemin({
//            multipass: true,
//            optimizationLevel: 7
//        }))
//        .pipe(gulp.dest(config.pathTo.Build.SvgSprite))
//        .pipe(svg2png())
//        .pipe(gulp.dest(config.pathTo.Build.SvgSpriteNoSvg))
//        .pipe(reload({stream: true}));
//});

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


//gulp.task('icons', function () {
//    return gulp.src(paths.icons)
//        .pipe(svgmin())
//        .pipe(svgstore({ fileName: 'icons.svg', inlineSvg: true}))
//        .pipe(cheerio({
//            run: function ($, file) {
//                $('svg').addClass('hide');
//                $('[fill]').removeAttr('fill');
//            },
//            parserOptions: { xmlMode: true }
//        }))
//        .pipe(gulp.dest('./src/inc/'))
//        .pipe(reload({stream:true}));
//});
