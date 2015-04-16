var browserify = require('browserify');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var source = require("vinyl-source-stream");
var reactify = require('reactify');
var babel = require('babelify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var usemin = require('gulp-usemin');
var cssmin = require('gulp-cssmin');
var shell = require('gulp-shell');

gulp.task('browserify', function(){
  var b = browserify();
  b.transform(reactify); // use the reactify transform
  b.transform(babel);
  b.add('./src/app.react.js');
  return b.bundle()
    .pipe(plumber())
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist/src/js'));
});

gulp.task('browserify-release', function () {
  var b = browserify();
  b.transform(reactify); // use the reactify transform
  b.transform(babel);
  b.add('./src/app.react.js');
  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/src/js'));
});

gulp.task('webserver', function () {
  gulp.src( 'dist' )
    .pipe(webserver({
      host:             'localhost',
      port:             8000,
      livereload:       true,
      directoryListing: false
    }));
});

gulp.task('styles', function () {
  gulp.src('./src/app.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./dist/src/css'));
});

gulp.task('minifycss', function () {
  gulp.src('./dist/src/css/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/src/css/'));
});

gulp.task('copy', function() {
  gulp.src('src/index.html')
    .pipe(plumber())
    .pipe(usemin())
    .pipe(gulp.dest('./dist/'));
  gulp.src('src/assets/**/*.*')
    .pipe(plumber())
    .pipe(gulp.dest('dist/assets'));
  gulp.src('bower_components/ratchet/dist/fonts/*')
    .pipe(plumber())
    .pipe(gulp.dest('dist/lib/fonts/'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['browserify']);
  gulp.watch('src/**/*.scss', ['styles']);
  gulp.watch('src/*.scss', ['styles']);
  gulp.watch('src/index.html', ['copy']);
});

gulp.task('cordova-run-android', function () {
  return gulp.src('./')
  .pipe(shell('cordova run android', {cwd: './cordova'}));
});

gulp.task('default', ['browserify', 'styles', 'copy', 'webserver', 'watch']);

gulp.task('server:dist', ['browserify-release', 'styles', 'copy', 'webserver', 'watch']);

gulp.task('build', ['browserify-release', 'styles', 'copy', 'minifycss']);

gulp.task('run-android', ['build', 'cordova-run-android']);