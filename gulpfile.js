var gulp = require('gulp');


var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

gulp.task('minify-js', function() {
  return gulp.src('js/*.js')
    .pipe($.rename({ suffix: '.min' })) 
    .pipe($.uglify({ preserveComments:'some' })) 
    .pipe(gulp.dest('dist/js')); 
});


gulp.task('concat-js', function () {
    gulp.src('dist/js/*.min.js')  
    .pipe($.concat('libs.js'))  
    .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-css', function () {
    gulp.src('dist/css/*.css') 
    .pipe($.rename({ suffix: '.min' })) 
    .pipe($.minifyCss()) 
    .pipe(gulp.dest('dist/css'));
});

gulp.task('concat-css', function () {
    gulp.src('dist/css/*.min.css')  
    .pipe($.concat('libs.css'))  
    .pipe(gulp.dest('dist/css'));
});

gulp.task('less-to-css', function () {
    gulp.src('less/*.less')
    .pipe($.less())
    .pipe(gulp.dest('dist/css'));
});
gulp.task('auto-less',function(){
   gulp.watch('less/*.less',['less-to-css'])
});
//BrowserSync
gulp.task('serve', function() {
    gulp.start('less-to-css');
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
  
    gulp.watch('less/*.less',['less-to-css']);
    gulp.watch(['*.html','less/*.less','js/*.js','dist/css/*.css']).on("change", browserSync.reload);;
});
 

