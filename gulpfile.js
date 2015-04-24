var browserify = require('browserify');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var source = require("vinyl-source-stream");
var reactify = require('reactify');
var babelify = require('babelify');
var uglifyify = require('uglifyify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var gStreamify = require('gulp-streamify');
var sass = require('gulp-sass');
var usemin = require('gulp-usemin');
var cssmin = require('gulp-cssmin');
var shell = require('gulp-shell');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var watch = require('gulp-watch');
var server = require('gulp-server-livereload');

var production = process.env.NODE_ENV === 'production';
var platform = gutil.env.platform;

function handleError(task) {
  return function(err) {
    gutil.log(gutil.colors.red(err));
    notify.onError(task + ' failed, check the logs..')(err);
    this.emit('end');
  };
}

function scripts(watch) {
  var bundler, rebundle;
  bundler = browserify({
    basedir: __dirname,
    debug: !production,
    entries: './src/app.js',
    cache: {},
    packageCache: {},
    fullPaths: watch
  });
  if(watch) {
    bundler = watchify(bundler);
    bundler.on('time', function (time) {
      gutil.log(gutil.colors.green('Reload scripts: (' + time + ')'));
    })
  }

  bundler.transform(reactify, {"es6": true, "harmony": true});

  if (platform){
    bundler.transform(babelify);
  }

  if(production) {
    bundler.transform({global: true}, uglifyify);
  }

  rebundle = function() {
    var stream = bundler.bundle();
    stream.on('error', handleError('Browserify'));

    stream = stream.pipe(source('app.js'));

    if(production) {
      stream.pipe(gStreamify(uglify()));
    }

    return stream.pipe(gulp.dest('./dist/src/js'));
  };
  bundler.on('update', rebundle);
  return rebundle();
}

gulp.task('scripts', function() {
  return scripts(false);
});

gulp.task('watchScripts', function() {
  return scripts(true);
});

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(server({
      livereload: true,
      directoryListing: false,
      port: 8000,
      open: true
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
  gulp.src('./src/index.html')
    .pipe(plumber())
    .pipe(usemin())
    .pipe(gulp.dest('./dist/'));
  gulp.src('src/assets/**/*.*')
    .pipe(plumber())
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('watch', function() {
  //gulp.watch('src/**/*.js', ['scripts']);
  gulp.watch('src/**/*.scss', ['styles']);
  gulp.watch('src/*.scss', ['styles']);
  gulp.watch('src/index.html', ['copy']);
});



gulp.task('run', ['build'], function () {
  if (!platform) {
    return gutil.log(gutil.colors.red('You must select a platform for cordova (ios/android)'));
  }

  return gulp.src('./')
    .pipe(shell('cordova run ' + platform, {cwd: './cordova'}));
});

gulp.task('default', ['watchScripts', 'styles', 'copy', 'webserver', 'watch']);

gulp.task('build', ['scripts', 'styles', 'copy', 'minifycss']);