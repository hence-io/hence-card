#!/usr/bin/env bash

cd ../hence-html
gulp build
cd ../hence-card/bower_components/hence-html
cp -vR ../../../hence-html/dist .
cd ../..
gulp
