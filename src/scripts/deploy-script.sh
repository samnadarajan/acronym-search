#!/bin/bash
set -ev
echo "OLLIE OLLIE OX AND FREE"
echo ${FIREBASE_TOKEN}
echo ${GITHUB_TOKEN}
echo ${TEST_TOKEN}
mkdir config
echo ${TEST_TOKEN} >> config/environment.prod.ts
cat config/environment.prod.ts
