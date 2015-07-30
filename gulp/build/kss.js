'use strict';

import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import gulpkss from 'gulp-kss';
import gulpif from 'gulp-if';
import insert from 'gulp-insert';
import del from 'del';

let compassOptions = {
  //config_file: './config.rb',
  sass: global.paths.src,
  css: global.paths.tmp + 'css',
  require: ['susy', 'modular-scale', 'breakpoint', 'font-awesome-sass']
};
let styleguideDir = global.paths.dist + 'styleguide/';
let compSass = global.comp.name + '.scss';
let compCss = global.comp.name + '.css';

/**
 * Sass Tasks
 */
gulp.task('kss', ['sass'], function () {
  del.sync([styleguideDir + '*']);

  gulp.src(global.paths.src + compSass)
  //gulp.src(global.paths.src + compSass)
//    .pipe(insert.wrap(`
///*
//${global.comp.name}
//
//A web component
//
//Markup: ${global.comp.name}.html
//
//Style guide: component
//*/
//${global.comp.name} {
//`, '}'))
    .pipe(gulpkss({
      overview: './README.md'
    }))
    .pipe(gulp.dest(styleguideDir));

  gulp.src(global.paths.tmp + 'css/' + compCss + '.css')
    .pipe(concat('public/style.css'))
    .pipe(gulp.dest(styleguideDir));
});
