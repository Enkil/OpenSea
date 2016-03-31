const gulp = require('gulp'),
    config = require('./config'),
    dirSync = require( 'gulp-directory-sync' ),
    browserSync = require("browser-sync"),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    styleguide = require('sc5-styleguide');

const styleguidePath = 'docs/styleguide'; // папка, куда будет генерироваться стайлгайд
const overviewPath = 'src/scss/styleguide.md'; //путь до описания стайлгайда
const scssRoot =  'src/scss/main.scss'; // путь до главного sass-файла


gulp.task('styleguide:generate', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(styleguide.generate({
            title: 'OpenSea styleguide',
            server: true,
            rootPath: styleguidePath,
            overviewPath: overviewPath,
            extraHead: [
                '<style>html {font-size:10px} body {font-size:16px}</style>'
            ]
        }))
        .pipe(gulp.dest(styleguidePath));
});

gulp.task('styleguide:applystyles', function() {
    return gulp.src(scssRoot)
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(styleguide.applyStyles())
        .pipe(gulp.dest(styleguidePath));
});

gulp.task('styleguide:copyFonts', function () {
    return gulp.src('')
        .pipe(plumber())
        .pipe(dirSync('src/scss/fonts/', styleguidePath + '/fonts/', {printSummary: true}))
        .pipe(browserSync.stream());
});


gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles','styleguide:copyFonts']);
