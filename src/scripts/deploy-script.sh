#!/bin/bash
set -ev
cd src
ls
echo "----"
ls config/
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
         apiKey: \"${DEV_FIREBASE_API}\",
         authDomain: \"${DEV_FIREBASE_DOMAIN}\",
         databaseURL: \"${DEV_FIREBASE_DB}\",
         projectId: \"${DEV_FIREBASE_PROJECT_ID}\",
         storageBucket: \"${DEV_FIREBASE_STORAGE_BUCKET}\",
         messagingSenderId: \"${DEV_FIREBASE_SENDER_ID}\"
     };" >> firebase.config.dev.ts

