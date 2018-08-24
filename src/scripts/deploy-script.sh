#!/bin/bash
set -ev
echo "OLLIE OLLIE OX AND FREE"
echo ${FIREBASE_TOKEN}
echo ${GITHUB_TOKEN}
echo ${TEST_TOKEN}
mkdir config
cd config
echo "export const firebaseConfigProd = {
          apiKey: \"\",
          authDomain: \"\",
          databaseURL: \"\",
          projectId: \"\",
          storageBucket: \"\",
          messagingSenderId: \"\"
      }" >> firebase.config.prod
echo "-----"
ls src
echo "-----"


cat firebase.config.prod
pwd
