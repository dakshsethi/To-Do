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



const itemList = document.querySelector("#itemList");

//Create Element and Render List
function renderList(doc) {
    let item = document.createElement("DIV");
    item.classList.add('item');
    item.setAttribute('data-id',doc.id);

    let text = document.createElement("SPAN");
    text.classList.add('text');
    text.textContent = doc.data().item;
    text.setAttribute('data-check',doc.data().check);

    let cross = document.createElement("DIV");
    cross.classList.add('cross');
    cross.textContent = 'X';

    item.appendChild(text);
    item.appendChild(cross);
    itemList.appendChild(item);

    //Deleting Data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('todo').doc(id).delete();
    });
}


//Getting Data from Firebase
// db.collection('todo').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderList(doc);
//     })
// })

//Adding new data
const form = document.querySelector('#to-do');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('todo').add({
        item: form.item.value,
        check: false
    });
    form.item.value = '';
});

//Real-time Listener
db.collection('todo').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added') {
            renderList(change.doc);
        } else if (change.type == 'removed') {
            let text = itemList.querySelector('[data-id=' + change.doc.id + ']');
            itemList.removeChild(text);
        }
    })
})
