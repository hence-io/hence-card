'use strict';

module.exports = function(browserSync) {
  var gulp = require('gulp');
  var autoprefixer = require('gulp-autoprefixer');
  var concat = require('gulp-concat');
  var compass = require('gulp-compass');
  var sourcemaps = require('gulp-sourcemaps');
  var minifyCss = require('gulp-minify-css');

  /**
   * Sass Tasks
   */
  // Compile SASS with sourcemaps + livereload.
  gulp.task('sass',['lintsass'], function () {
    return gulp.src(global.paths.sass)
      .pipe(sourcemaps.init())
      .pipe(compass({
        //config_file: './config.rb',
        sass: global.paths.src,
        css: global.paths.tmp + 'css',
        require: ['susy', 'modular-scale','breakpoint']
      }))
      .pipe(concat('hence-comp-ui-sample.css'))
      .pipe(autoprefixer())
      .pipe(sourcemaps.init({loadMaps: true})) // loads map
      //.pipe(minifyCss())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(global.paths.tmp + 'css'))
      .pipe(browserSync.stream());
  });
};
