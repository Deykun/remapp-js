var gulp = require('gulp');

var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');

browserSync = require("browser-sync"),

//js
gulp.task('js', function(){
    //gulp.src(['./dev/js/lib/*.js', './dev/js/local.fn.js', './dev/js/*.js' ])
    gulp.src(['./dev/js/lib/*.js', './dev/js/global.js', './dev/js/frontend.js', './dev/js/interactions.js' ])
        .pipe(concat('scieski.js'))
        .pipe(gulp.dest('./js'))
        .pipe(uglify())
        .pipe(rename('scieski.min.js'))
        .pipe(gulp.dest('./js'));
});

//css
gulp.task('css', function (){
    gulp.src(['./dev/sass/style.scss'])
        .pipe(sass())
		.pipe(rename('stylesheet.min.css'))
        .pipe(prefix(
            "last 1 version", "> 1%", "ie 8", "ie 7"
            ))
        .pipe(minifycss())
        .pipe(gulp.dest('./css/'));
});

//html
gulp.task('html', function () {
    gulp.src(['./dev/index.html'])
        .pipe(htmlmin({collapseWhitespace: true, removeComments: false}))
        .pipe(gulp.dest('./'));
});

gulp.task('default', function(){

    browserSync.init({
        server: "./"
    });
    gulp.watch(["./index.html", "./js/*.js", "./css/*.css"], browserSync.reload);

    gulp.watch("./dev/sass/*.scss", function(event){
        gulp.run('css');
    });
    
    gulp.watch("./dev/js/*.js", function(event){
        gulp.run('js');
    });
	
	gulp.watch("./dev/index.html", function(event){
        gulp.run('html');
    });
    
});
