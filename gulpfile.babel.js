var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');

var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');

var stylus = require('gulp-stylus');
var nib = require('nib');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('react', function() {
  var bundler = watchify(browserify({
    entries: ['./src/components/app/app.jsx'],
    debug: true,
    transform:  [reactify],
    extensions: ['.jsx'],
    cache: {},
    packageCache: {},
    fullPaths: false
  }))
  function build(file) {
    if (file) gutil.log('Recompiling ' + file);
    return bundler
      .transform(babelify, {presets: ["es2015", "react"]})
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('app.js'))
      .pipe(gulp.dest('./public'));
  }
  build()
  bundler.on('update', build)
});


gulp.task('browser-sync', function() {
  browserSync.init( {
		server: {
			baseDir: "./src"
		},
    port: "3000",
    open: false
  });
});


// CSS
gulp.task('css', function() {
  return gulp.src('src/styles.styl')
    .pipe(stylus({ use: nib() }))
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(reload({stream: true}));
});


// Initial build
gulp.task('build', ['react', 'css']);

// Watch
gulp.task('watch', function() {
	gulp.watch('src/**/*.styl', ['css']);
});

// Development
gulp.task('default', ['build', 'browser-sync', 'watch']);
