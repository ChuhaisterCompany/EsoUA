#!/bin/bash
ESO_VERSION=$(cat .VERSION)
TIMESTAMP=$(date +%s)

rm *EsoUA-v$ESO_VERSION.zip

ZIP_NAME=$TIMESTAMP-EsoUA-v$ESO_VERSION.zip

git archive --output=./$ZIP_NAME --format=zip HEAD EsoUI gamedata UkrainianScrollsOnline

ESO_VERSION=$ESO_VERSION ZIP_NAME=$ZIP_NAME node uploadAddOn.js
