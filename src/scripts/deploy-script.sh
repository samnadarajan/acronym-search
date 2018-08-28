#!/bin/bash
set -ev
cd src
mkdir config
cd config
echo "${TEST_TOKEN}" >> firebase.config.prod.ts

echo "export const firebaseConfigDev = {
          apiKey: \"\",
          authDomain: \"\",
          databaseURL: \"\",
          projectId: \"\",
          storageBucket: \"\",
          messagingSenderId: \"\"
      };" >> firebase.config.dev.ts
echo "-----"
cd ../
ls


cat config/firebase.config.prod.ts
