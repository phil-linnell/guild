var gulp = require('gulp');

var stylus      = require('gulp-stylus');
var nib         = require('nib');

var browserSync = require('browser-sync');
var reload      = browserSync.reload;


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
gulp.task('build', ['css']);

// Watch
gulp.task('watch', function() {
	gulp.watch('src/**/*.styl', ['css']);
});

// Development
gulp.task('default', ['build', 'browser-sync', 'watch']);
