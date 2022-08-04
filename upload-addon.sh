#!/bin/bash
ID=3437
VERSION=$(cat .VERSION)
ZIP_NAME=EsoUA$VERSION.zip

# git archive --output=./$ZIP_NAME --format=zip HEAD EsoUI gamedata UkrainianScrollsOnline

SCRIPT_PATH=$(readlink -f "$0")
echo "$SCRIPT_PATH"

# curl -X POST -H "x-api-token:$ESOUI_API_TOKEN" \
#     -F id=$ID -F version=$VERSION -F compatible=8.0.0 -F updatefile=@/$ZIP_NAME \
#     https://api.esoui.com/addons/updatetest
