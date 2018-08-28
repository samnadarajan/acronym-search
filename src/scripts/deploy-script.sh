#!/bin/bash
set -ev
cd src
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
cd ../../
ls


cat firebase.config.prod
