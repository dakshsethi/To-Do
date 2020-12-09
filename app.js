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
  } else {
    console.log('user logged out');
  }
})





//SignUp
const signUp = document.querySelector("#signup");
signUp.addEventListener('submit', (e) => {
  e.preventDefault();

  //Getting User Info
  const email =  signUp['email-signup'].value;
  const password =  signUp['password-signup'].value;

  //SignUp the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    location.replace("index.html")
  });
});

//Logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();

  auth.signOut().then(() => {
    //location.replace("https://www.w3schools.com")
  });
});

//Login
const login = document.querySelector("#login");
login.addEventListener("submit", (e) => {
  e.preventDefault();

  //Getting User Info
  const email = login['email'].value;
  const password = login['password'].value;

  auth.signInWithEmailAndPassword(email, password).then(cred => {
    location.replace("index.html")
  });
});