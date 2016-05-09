var 
	gulp = require('gulp'),
	sass = require('gulp-sass'),
	del = require('del'),
	webserver = require('gulp-webserver');
 
gulp.task('sass', function () {
 return gulp.src('src/sass/metamask.scss')
    .pipe(sass({
      outputStyle: "compressed"
    }))
   .pipe(gulp.dest('dist/css/'));
});	
 
gulp.task('concat-js',function() {
	return gulp.src([
		'src/js/main.js',
	])
	.pipe(concat('bundle.js'))
	.pipe(gulp.dest('dist/js/'));
});

gulp.task('minify-js',['concat-js'],function() {
	return gulp.src('static/js/app.js')
	.pipe(uglify())
	.pipe(rename('app.min.js'))
	.pipe(gulp.dest('dist/js/'));
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

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});


gulp.task('clean',function(){
	del(['dist']);
});


gulp.task('build',['clean','sass'],function(){

});


gulp.task('default',['clean'],function(){
	gulp.start('build');
});
