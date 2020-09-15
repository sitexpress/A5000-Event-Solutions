const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
// const pipeline = require('readable-stream');
const {
    Readable,
    Writable,
    Transform,
    Duplex,
    pipeline,
    finished
  } = require('readable-stream');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
    gulp.watch('dist/*.html').on('change', browserSync.reload)
    gulp.watch("dist/js/*.js").on('change', browserSync.reload)
});

gulp.task('styles', function () {
    return gulp.src('src/sass/**/*.+(scss|sass)')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
          }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream())
});

gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.+(scss|sass|css)', gulp.parallel('styles'))
    gulp.watch('src/*.html').on('change', gulp.parallel('html'))
    
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/'));
});

// gulp.task('scripts', () => {
// 	gulp.src('src/js/*.js')
// 		.pipe(babel({
// 			presets: ['@babel/preset-env']
// 		}))
// 		.pipe(gulp.dest('dist/js'))
// });

gulp.task('scripts', () => {
    return pipeline(
        gulp.src('src/js/*.js')
            .pipe(babel({
                presets: ['@babel/preset-env']
            })),
        uglify(),
        gulp.dest('dist/js')
    );
});

// gulp.task('scripts', function () {
//     return pipeline(
//         gulp.src('src/js/*.js'),
//         uglify(),
//         gulp.dest('dist/js')
//     );
// });

gulp.task('fonts', function() {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('icons', function() {
    return gulp.src('src/icons/*')
        .pipe(gulp.dest('dist/icons'));
});

gulp.task('php', function() {
    return gulp.src('src/*.php')
        .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'watch', 'html', 'scripts', 'fonts', 'icons', 'php', 'images'));