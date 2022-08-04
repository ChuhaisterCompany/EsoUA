#!/bin/bash
ID=3437
VERSION=$(cat .VERSION)
ZIP_NAME=EsoUA$VERSION.zip

git archive --output=./$ZIP_NAME --format=zip HEAD EsoUI gamedata UkrainianScrollsOnline

curl -X POST -H "x-api-token:$ESOUI_API_TOKEN" \
    -F id=$ID -F version=$VERSION -F compatible=8.0.0 -F updatefile=.github/workflows/$ZIP_NAME \
    https://api.esoui.com/addons/updatetest
