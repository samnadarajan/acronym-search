#!/bin/bash
set -ev
echo "OLLIE OLLIE OX AND FREE"
echo ${FIREBASE_TOKEN}
echo ${GITHUB_TOKEN}
echo ${TEST_TOKEN}
cd src
mkdir config
cd config
echo "${TEST_TOKEN}" >> firebase.config.prod
cat firebase.config.prod
pwd
