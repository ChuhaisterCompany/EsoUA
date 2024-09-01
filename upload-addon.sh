#!/bin/bash
VERSION=$(cat UkrainianScrollsOnline/UkrainianScrollsOnline.txt | grep "## Version: [0-9\.]*" | cut -d \  -f3)
ZIP_NAME=EsoUA$VERSION.zip

git archive --output=./$ZIP_NAME --format=zip HEAD EsoUI gamedata UkrainianScrollsOnline

curl -X POST -H "x-api-token:$ESOUI_API_TOKEN" \
    -F id=$ESOUI_ID -F version=$VERSION -F compatible=10.1.0 -F updatefile=@/home/runner/work/EsoUA/EsoUA/$ZIP_NAME \
    https://api.esoui.com/addons/update
