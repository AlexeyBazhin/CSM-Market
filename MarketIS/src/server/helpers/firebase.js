/* eslint-disable no-undef */
const firebaseAdmin = require('firebase-admin');
const firebase = require('firebase');

const firebaseConfig = {
    apiKey: 'AIzaSyCPQmbzxIjIivFSDovBpJDkn74VVd0wf1I',
    authDomain: 'csmmarkets.firebaseapp.com',
    databaseURL: 'csmmarkets.firebaseapp.com',
    projectId: 'csmmarkets',
    storageBucket: 'csmmarkets.appspot.com',
    messagingSenderId: '251347060035',
    appId: '1:251347060035:web:4342257c246506fb9bdbf6',
};

firebaseAdmin.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

module.exports = {
    firestore: firebase.firestore(),
    authAdmin: firebaseAdmin.auth(),
    auth: firebase.auth(),
};
