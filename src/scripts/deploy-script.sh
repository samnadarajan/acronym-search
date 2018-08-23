#!/bin/bash
set -ev
echo "OLLIE OLLIE OX AND FREE"
echo ${FIREBASE_TOKEN}
echo ${GITHUB_TOKEN}
echo ${TEST_TOKEN}
mkdir -p src/{config}
echo "${TEST_TOKEN}" >> src/config/firebase.config.prod
cat src/config/firebase.config.prod
pwd
