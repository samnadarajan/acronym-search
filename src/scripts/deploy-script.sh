#!/bin/bash
set -ev
echo "OLLIE OLLIE OX AND FREE"
echo ${FIREBASE_TOKEN}
echo ${GITHUB_TOKEN}
echo ${TEST_TOKEN}
mkdir config
echo "${TEST_TOKEN}" >> config/firebase.config.prod
cat config/firebase.config.prod
pwd
