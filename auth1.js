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

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = firebase.storage();

// Create a storage reference from our storage service
const storageRef = storage.ref();


//SignUp
const signup = document.querySelector('#signup');
signup.addEventListener('submit', (e) => {
    e.preventDefault();

    //Getting the user data
    const name = signup['name'].value;
    const email = signup['email'].value;
    const password = signup['password'].value;
    const age = signup['age'].value;
    const gender = signup['gender'].value;

    const ref = firebase.storage().ref();
    const file = document.querySelector('#file').files[0];
    var type = file.name.split(".");
    const metadata = {
        contentType: file.type
    };

    // var src = '';
    // const task = ref.child('images/'+ fname).put(file, metadata);
    // task.then(snapshot => snapshot.ref.getDownloadURL())
    //     .then(url => {
    //         src = url;
    //         console.log(src);
    //     }).catch(error => {
    //         console.log('error');
    //     })

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        const task = ref.child('images/'+ cred.user.uid + '.' + type[1]).put(file, metadata);
        
        task.then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                db.collection('userInfo').add({
                    uid: cred.user.uid,
                    name: name,
                    email: email,
                    age: age,
                    gender: gender,
                    photo: url
                });
            }).catch(error => {
                console.log('error');
            });

        // db.collection('userInfo').add({
        //     uid: cred.user.uid,
        //     name: name,
        //     email: email,
        //     age: age,
        //     gender: gender,
        //     //photo: url
        // }).then(() => {
        //     console.log("Account created");
        // });

    }).catch(error => {
        if(error.code == 'auth/email-already-in-use')
            alert(error.message);
        else if(error.code == 'auth/weak-password')
            alert(error.message)
    });
    
    signup.name.value = '';
    signup.email.value = '';
    signup.password.value = '';
    signup.age.value = '';
    signup.gender.value = '';
    signup.photo.value = '';


})

//LogIn
const uid = '';
const login = document.querySelector('#login');
login.addEventListener('submit', (e) => {
    e.preventDefault();

    //Getting the login data
    const email = login['login-email'].value;
    const password = login['login-pwd'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        location.replace('home.html');
    }).catch(error => {
        if(error.code == 'auth/wrong-password')
            alert(error.message);
    })
})






//Listen for Auth State Chnages
// auth.onAuthStateChanged(user => {
//     if (user) {
//       console.log('user logged in : ', user);
//       document.write("Welcome " + user.id);
//     } else {
//       alert("Kindly Login First");
//       location.replace("signup.html");
//     }
//   })