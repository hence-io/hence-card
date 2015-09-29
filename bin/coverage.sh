#!/usr/bin/env bash

IST=./node_modules/.bin/istanbul
WCT=./node_modules/.bin/wct
WCT_VAR='window.parent.WCT.share.__coverage__'

${IST} instrument ./test/behaviour -o ./coverage --variable ${WCT_VAR}
