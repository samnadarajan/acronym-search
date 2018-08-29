#!/bin/bash
set -ev
cd src/config
echo "export const firebaseConfigDev = {
         apiKey: \"${DEV_FIREBASE_API}\",
         authDomain: \"${DEV_FIREBASE_DOMAIN}\",
         databaseURL: \"${DEV_FIREBASE_DB}\",
         projectId: \"${DEV_FIREBASE_PROJECT_ID}\",
         storageBucket: \"${DEV_FIREBASE_STORAGE_BUCKET}\",
         messagingSenderId: \"${DEV_FIREBASE_SENDER_ID}\"
     };" >> firebase.config.dev.ts

