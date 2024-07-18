const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require ('gulp-sourcemaps')
const uglify = require("gulp-uglify")
const imagemin = require("gulp-imagemin")
// const obfuscate = require("gulp-obfuscate")

function comprimeImagens(){
    return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest("./build/images"))
}


function comprimeJavaSceript(){
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    // .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'))
}

function compilaSass() {
    return gulp
      .src("./source/sass/main.scss")
      .pipe(sourcemaps.init())
      .pipe(sass({
          outputStyle: 'compressed'
      }))
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest("./build/styles"));
  }

  exports.default = function(){
    gulp.watch('./source/sass/*.scss',{ignoreInitial: false}, gulp.series(compilaSass))
    gulp.watch('./source/scripts/*.js',{ignoreInitial: false}, gulp.series(comprimeJavaSceript))
    gulp.watch('./source/images/*',{ignoreInitial: false}, gulp.series(comprimeImagens))
}