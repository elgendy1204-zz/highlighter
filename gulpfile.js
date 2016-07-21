const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sass = require('gulp-sass');
const pump = require('pump');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const sourceFile = './src/js/highlighter.js';
const destFile = 'highlighter.min.js';
const destFolder = './dist/js/';

gulp.task('sass:dev', () => {
	return gulp.src('./src/sass/style.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed', includePaths: ['./src/sass/modules'] }).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 10 versions']
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('sass', () => {
	return gulp.src('./src/sass/style.scss')
		.pipe(sass({ outputStyle: 'compressed', includePaths: ['./src/sass/modules'] }).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 15 versions']
		}))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task("js", () => {
	return browserify(sourceFile)
		.transform(babelify, { "compact": false })
		.bundle()
		.on("error", swallowError )
		.pipe(source(destFile))
		.pipe(buffer())
		.pipe(gulp.dest(destFolder));
});

gulp.task("js:dev", () => {
	return browserify(sourceFile, { debug: true })
		.transform(babelify, { "compact": false })
		.bundle()
		.on("error", swallowError)
		.pipe(source(destFile))
		.pipe(buffer())
		.pipe(gulp.dest(destFolder));
});

gulp.task('compress', function(cb) {
	pump([
			gulp.src('./dist/js/main.min.js'),
			uglify({ mangle: true }),
			gulp.dest(destFolder)
		],
		cb
	);
});

gulp.task('watch', () => {
	gulp.watch('./src/sass/**/*.scss', ['sass:dev']);
	gulp.watch('./src/js/*.js'], ['js:dev']);
});

gulp.task('default', ['sass:dev', 'js:dev','watch']);

function swallowError(error) {
	console.log(error.toString());
	this.emit('end');
}