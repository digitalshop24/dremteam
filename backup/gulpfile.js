
var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');

gulp.task('sass', function () {
	gulp.src('sass/main.scss')
	.pipe(plumber())
	.pipe(sass({errLogToConsole: true}))
	.pipe(gulp.dest('css'));
	gulp.src('sass/cat.scss')
	.pipe(plumber())
	.pipe(sass({errLogToConsole: true}))
	.pipe(gulp.dest('css'));
	gulp.src('sass/order.scss')
	.pipe(plumber())
	.pipe(sass({errLogToConsole: true}))
	.pipe(gulp.dest('css'));
	gulp.src('sass/cont.scss')
	.pipe(plumber())
	.pipe(sass({errLogToConsole: true}))
	.pipe(gulp.dest('css'));
});



