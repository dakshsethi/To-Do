// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDAIX8Fb8_7D10DGV3516WWwvIvvx3R7u4",
    authDomain: "to-do-ee845.firebaseapp.com",
    projectId: "to-do-ee845",
    storageBucket: "to-do-ee845.appspot.com", //not required
    messagingSenderId: "1062394243290", //not required
    appId: "1:1062394243290:web:ca94e8f822a73bedae5de3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Make Auth and Firestore references
const auth = firebase.auth();
const db = firebase.firestore();

//Listen for Auth State Chnages
auth.onAuthStateChanged(user => {
    if (user) {
      console.log('user logged in : ', user);
      document.write("Welcome " + user.id);
    } else {
      alert("Kindly Login First");
      location.replace("signup.html");
    }
  })