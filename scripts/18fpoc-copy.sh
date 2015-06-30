#!bin/bash
set -ev

if ["${TRAVIS_BRANCH}" = "master"]; then
    export DEPLOY_HOST=558aaeb2500446c6d300019c@18fpoc-iworksfda.rhcloud.com
fi

sshpass scp -i ~/id_rsa_dpl webapps/ROOT.war $DEPLOY_HOST:$DEPLOY_PATH


