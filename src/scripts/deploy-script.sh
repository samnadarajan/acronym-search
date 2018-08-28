#!/bin/bash
set -ev
cd src
mkdir config
cd config
echo "export const firebaseConfigProd = {
          apiKey: \"${FIREBASE_API}\",
          authDomain: \"${FIREBASE_DOMAIN}\",
          databaseURL: \"${FIREBASE_DB}\",
          projectId: \"${FIREBASE_PROJECT_ID}\",
          storageBucket: \"${FIREBASE_STORAGE_BUCKET}\",
          messagingSenderId: \"${FIREBASE_SENDER_ID}\"
      };" >> firebase.config.prod.ts

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
