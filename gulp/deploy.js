import _ from 'lodash';
import gulp from 'gulp';
import fs from 'fs';
import util from 'gulp-util';
import {execSync} from 'child_process';
import runSequence from 'run-sequence';

let version = util.env.version;

let updateConfig = (file, done)=> {
  let data = fs.readFileSync(`./${file}.json`, 'utf8');

  var config = JSON.parse(data);
  config.version = version;
  var string = JSON.stringify(config, null, '\t');

  fs.writeFileSync(`./${file}.json`, string, 'utf8');

  console.log(`updated ${file} to ${version}`);
};

gulp.task('version-bump',function(done){
  updateConfig('bower');
  updateConfig('package');
  done();
});

gulp.task('deploy', ['build'], function (done) {
  //runSequence(
  //  'version-bump',
  //  'git-add',
  //  'git-commit',
  //  'git-push',
  //  'git-push-tags',
  //  done
  //);

  updateConfig('bower');
  updateConfig('package');

  //console.log(`version updated to ${version}. Committing and tagging now...`);
  execSync(`git add --all && git commit -m "- version bump" && git tag v${version} && git push && git push --tags`, {stdio: 'inherit'});

});
