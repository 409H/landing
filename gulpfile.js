var 
	gulp = require('gulp'),
	sass = require('gulp-sass'),
	del = require('del'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  watch = require('gulp-watch'),
  batch = require('gulp-batch'),
  runSequence = require('run-sequence'),
  gulpBrowser = require("gulp-browser"),
	webserver = require('gulp-webserver');
  
    
gulp.task('sass', function () {
 return gulp.src('src/css/index.scss')
    .pipe(sass({
      outputStyle: "compressed"
    }))
   .pipe(rename('bundle.css'))
   .pipe(gulp.dest('dist/css/'));
});	
 
gulp.task('concat-js',function() {
	return gulp.src([
		'src/js/index.js',
	])
	.pipe(concat('bundle.js'))
	.pipe(gulp.dest('dist/js/'));
});

gulp.task('minify-js',['concat-js'],function() {
	return gulp.src('static/js/app.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist/js/'));
});

gulp.task('browserify',function() {
  var stream = gulp.src('src/js/index.js')
    .pipe(gulpBrowser.browserify()) // gulp.browserify() accepts an optional array of tansforms 
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest("./dist/js/"));
    return stream;
});

gulp.task('copy-images',function(){
	return gulp.src([
		'src/img/**'])
	.pipe(gulp.dest('dist/img/'));
});

gulp.task('copy-fonts',function(){
	return gulp.src([
		'src/fonts/**'])
	.pipe(gulp.dest('dist/fonts/'));
});

gulp.task('copy-index',function(){
	return gulp.src([
		'src/index.html'])
	.pipe(gulp.dest('dist/'));
});

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});


gulp.task('clean',function(cb){
	 return del(['dist'], cb);
});

gulp.task('watch', function () {
    watch('**/*.scss', function (events) {
        runSequence('build');
    });
});

gulp.task('js',['browserify']);
gulp.task('static',['copy-fonts','copy-images','copy-index']);

//gulp.task('build',['clean','sass','js','static']);

gulp.task('build', function(callback) {
  runSequence(
    'clean',
    ['sass', 'js','static'],
    callback);
});




gulp.task('dev',['build','webserver']);

gulp.task('default',['build']);
