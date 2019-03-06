import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

const emailPattern = ".*@kunzleigh.com$";

const getPatternCollections = () => {
    console.log("hey You let's go");
    return "this";
};

exports.auth = functions.auth.user().onCreate((user) => {
    const emailRegex = RegExp(emailPattern);
    if (emailRegex.test(user.email)) {
        return null;
    }

    return admin.auth().updateUser(user.uid, {disabled: true});
});

exports.getEmailPatterns = functions.https.onRequest((request, response) => {
    const patterns = [];

    const test = getPatternCollections();
    console.log(test);
    return admin.firestore().collection("emailpatterns").get().then(snapshot => {

        snapshot.forEach(doc => {
            patterns.push(doc.data());
        });
        response.set('Access-Control-Allow-Origin', '*');
        response.send(patterns);
    }).catch(error => response.send(error));
});
