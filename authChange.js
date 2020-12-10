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

// Listen for Auth State Chnages
var uid;
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in : ', user);
        uid = user.uid;

        getData(uid);

    } else {
      alert("Kindly Login First");
      location.replace("create_account.html");
    }
  })


const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();

    auth.signOut().then(() => {

    });
})

function getData(uid) {
    //Get User Data
    const name = document.querySelector('#name');
    const email = document.querySelector('#email');
    const age = document.querySelector('#age');
    const photo = document.querySelector('#photo');
    console.log(uid);


    //Getting Data from Firebase
    // db.collection('todo').get().then((snapshot) => {
    //     snapshot.docs.forEach(doc => {
    //         renderList(doc);
    //     })
    // })



    db.collection('userInfo').where('uid','==',uid).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            name.innerHTML = doc.data().name;
            email.innerHTML = doc.data().email;
            age.innerHTML = doc.data().age;
            photo.src = doc.data().photo;
        })
    })
}



