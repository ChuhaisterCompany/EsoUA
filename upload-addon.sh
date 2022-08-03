#!/bin/bash
ESOUA_VERSION=$(node -p "require('./package.json').version")
TIMESTAMP=$(date +%s)

rm *EsoUA-v$ESOUA_VERSION.zip

ZIP_NAME=$TIMESTAMP-EsoUA-v$ESOUA_VERSION.zip

# git archive --output=./$ZIP_NAME --format=zip HEAD EsoUI gamedata UkrainianScrollsOnline

ESOUA_VERSION=$ESOUA_VERSION ZIP_NAME=$ZIP_NAME node uploadAddOn.js
