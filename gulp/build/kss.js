'use strict';

import gulp from 'gulp';
import styleguide from 'sc5-styleguide';

let styleguideDir = global.paths.dist + 'styleguide/';
let compSass = global.comp.name + '.scss';
let compCss = global.comp.name + '.css';

import sassCompilation from './../sass';
sassCompilation({
  taskName: 'kss-sass',
  dest: styleguideDir,
  concat: 'public/style.css',
  bypassSourcemap: true,
  replace: {
    'this': '/bower_components',
    'with': '../../bower_components'
  }
});

/**
 * Sass Tasks
 */
gulp.task('kss', ['kss-sass'], function () {
  // Build the kss guide
  gulp.src(global.paths.sass)
    .pipe(styleguide.generate({
      title: 'Component Styleguide',
      server: true,
      rootPath: styleguideDir,
      overviewPath: 'README.md'
    }))
    .pipe(gulp.dest(styleguideDir));
});
