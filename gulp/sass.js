'use strict';

import _ from 'lodash';
import gulp from 'gulp';
import util from 'gulp-util';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import concat from 'gulp-concat';
import compass from 'gulp-compass';
import sourcemaps from 'gulp-sourcemaps';
import minifyCss from 'gulp-minify-css';
import gulpif from 'gulp-if';

let styleOptions = {
  style: 'expanded',
  time: true,
  sourcemap: true,
  sass: global.paths.src,
  css: global.paths.tmp + 'css',
  require: ['susy', 'modular-scale', 'breakpoint', 'font-awesome-sass']
};

/**
 * Sass Tasks
 */
let sassCompilation = function (opts) {
  let requiredTasks = [];
  opts.dest = opts.dest ? opts.dest : (opts.dist ? global.paths.dist + 'css' : global.paths.tmp + 'css');

  if (opts.dist || opts.lint) {
    requiredTasks.push('lintsass');
  }

  // defaults so gulpif knows what is what
  _.defaults(opts, {
    dist: false,
    replace: false,
    concat: false,
    bypassSourcemap: false,
    browserSync: {stream: util.noop, notify: util.noop} // fall back to prevent issues with live injection
  });

  // Compile SASS with sourcemaps + livereload.
  gulp.task(opts.taskName, requiredTasks, function () {
    let {dist, bypassSourcemap, browserSync} = opts;

    //gulp.src(global.paths.fonts)
    //  .pipe(gulp.dest(dest + 'fonts'));

    browserSync.notify("Compiling SASS, please wait!");

    return gulp.src(global.paths.sass)
      .pipe(plumber())
      .pipe(gulpif(!bypassSourcemap && !dist, sourcemaps.init({loadMaps: true})))
      .pipe(compass(styleOptions))
      .pipe(gulpif(opts.replace, replace(opts.replace.this, opts.replace.with)))
      .pipe(concat(opts.concat ? opts.concat : global.comp.css))
      .pipe(autoprefixer())
      .pipe(gulpif(dist, minifyCss()))
      .pipe(gulpif(dist, rename({suffix: '.min'})))
      .pipe(gulpif(!bypassSourcemap && !dist, sourcemaps.write('./')))
      .pipe(gulp.dest(opts.dest))
      .pipe(browserSync.stream());
  });
};

export {styleOptions};
export default sassCompilation;
