/* SASS */
var gulp = require('gulp'),
    config = require('./config'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    cssshrink = require('gulp-cssshrink'),
    csscomb = require('gulp-csscomb'),
    concat = require('gulp-concat'),
    combineMq = require('gulp-combine-mq'),
    purify = require('gulp-purifycss'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    newer = require('gulp-newer'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    plumber = require('gulp-plumber');

gulp.task('sass', function () {
    gulp.src(config.pathTo.Src.MainStyleFile)
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
        }))
        .pipe(newer(config.pathTo.Build.Styles))
        //.pipe(sourcemaps.init())

        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer(config.autoprefixerBrowsers))
        .pipe(concat(config.pathTo.Build.MainStyleFile))
        .pipe(csscomb())
        .pipe(combineMq({beautify: true}))
        .pipe(gulp.dest(config.pathTo.Build.Styles))

        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(config.pathTo.Build.Styles))

        .pipe(rename({ basename: 'main', suffix: '.purify' }))
        .pipe(purify(config.pathTo.Src.PurifyCssHtml))
        .pipe(gulp.dest(config.pathTo.Build.Styles))

        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())

        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.pathTo.Build.Styles))
        .pipe(reload({stream: true}));
});