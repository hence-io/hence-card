'use strict';

import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import compass from 'gulp-compass';
import sourcemaps from 'gulp-sourcemaps';
import minifyCss from 'gulp-minify-css';
import gulpkss from 'gulp-kss';
import gulpif from 'gulp-if';

/**
 * Sass Tasks
 */
let sassCompilation = function(taskName, destDir, browserSync, minify = false, kss = false) {
  // Compile SASS with sourcemaps + livereload.
  gulp.task(taskName,['lintsass'], function () {
    gulp.src(global.paths.fonts)
      .pipe(gulp.dest(destDir + 'fonts'));

    gulp.src(global.paths.sass)
      .pipe(compass(global.compassOptions))
      .pipe(concat('hence-comp-ui-sample.css'))
      .pipe(autoprefixer())
      .pipe(sourcemaps.init({loadMaps: true})) // loads map
      .pipe(gulpif(minify,minifyCss()))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(destDir + 'css'))
      .pipe(browserSync.stream());

    if(kss) {
      gulp.src(global.paths.sass)
        .pipe(gulpkss({
          overview: global.paths.dist + 'css/styleguide.md'
        }))
        .pipe(gulp.dest(global.paths.dist + 'css/styleguide'));
    }
  });
};

export default sassCompilation;