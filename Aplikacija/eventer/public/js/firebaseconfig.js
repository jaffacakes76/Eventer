// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCozmBei9ZpwoehJXM0zcFdXa-fuNT5Lc0",
    authDomain: "eventer-564b4.firebaseapp.com",
    databaseURL: "https://eventer-564b4.firebaseio.com",
    projectId: "eventer-564b4",
    storageBucket: "eventer-564b4.appspot.com",
    messagingSenderId: "109405152035",
    appId: "1:109405152035:web:12b36bda70fafb8ea0e296",
    measurementId: "G-G3CM15DQ0K"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    //references
    const auth = firebase.auth();
    const db = firebase.firestore();
    const functions=firebase.functions();
 