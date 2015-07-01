#!/bin/bash
set -ev
if [ "${TRAVIS_BRANCH}" = "master" ]; then
    export DEPLOY_HOST=558aaeb2500446c6d300019c@18fpoc-iworksfda.rhcloud.com
else
   export DEPLOY_HOST=558b6aed5973ca5b1b00004f@18fpocdev-iworksfda.rhcloud.com
fi


