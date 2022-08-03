#!/bin/bash
ESOUA_VERSION=$(node -p "require('./package.json').version")
ZIP_NAME=EsoUA_v$ESOUA_VERSION.zip

rm $ZIP_NAME

git archive --output=./$ZIP_NAME --format=zip HEAD EsoUI gamedata UkrainianScrollsOnline

ESOUA_VERSION=$ESOUA_VERSION ZIP_NAME=$ZIP_NAME node uploadAddOn.js
