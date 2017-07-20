var gulp = require('gulp');

var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var concat = require('gulp-concat');

browserSync = require("browser-sync"),

// SASS
gulp.task('sass', function (){
    gulp.src(['./dev/sass/style.scss'])
        .pipe(sass())
.pipe(rename('stylesheet.min.css'))
        .pipe(prefix(
            "last 1 version", "> 1%", "ie 8", "ie 7"
            ))
        .pipe(minifycss())
        .pipe(gulp.dest('./css/'));
});

//JS
gulp.task('uglify', function(){
    //gulp.src(['./dev/js/lib/*.js', './dev/js/local.fn.js', './dev/js/*.js' ])
    gulp.src(['./dev/js/lib/*.js', './dev/js/variables.js', './dev/js/functions.js', './dev/js/frontend.js', './dev/js/interactions.js' ])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./js')); 
        /*.pipe(uglify())
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest('./js'));*/
});

gulp.task('default', function(){

    browserSync.init({
        server: "./"
    });
    gulp.watch(["./index.html", "./js/*.js"], browserSync.reload);

    gulp.watch("./dev/sass/*.scss", function(event){
        gulp.run('sass');
    });
    
    gulp.watch("./dev/js/*.js", function(event){
        gulp.run('uglify');
    });
    
});
