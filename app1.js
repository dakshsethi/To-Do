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

    // let text = document.createElement("SPAN");
    // text.classList.add('text');
    // text.textContent = doc.data().item;
    // text.setAttribute('data-check',doc.data().check);
    // let chk = doc.data().check;
    // chk ? text.style.textDecoration='line-through' : text.style.textDecoration='';

    let text = document.createElement("INPUT");
    text.readOnly = true;
    text.value = doc.data().item;
    text.classList.add('disabled');
    text.setAttribute('data-check',doc.data().check);
    //text.setAttribute('onclick','check(this)');
    let chk = doc.data().check;
    chk ? text.classList.add('checked') : text.classList.remove('checked');;

    
    // let cross = document.createElement("DIV");
    // cross.classList.add('cross');
    // cross.textContent = 'X';

    let edit = document.createElement("I");
    edit.classList.add('far');
    edit.classList.add('fa-edit');
    edit.setAttribute('onclick','edit(this)');
    //edit.setAttribute('id','edit');

    let tick = document.createElement("I");
    tick.classList.add('fas');
    tick.classList.add('fa-check');
    tick.setAttribute('id','tick');
    tick.setAttribute('onclick','update()');
    tick.style.display="none";

    let cross = document.createElement("I");
    cross.classList.add('fas');
    cross.classList.add('fa-times'); 

    item.appendChild(text);
    item.appendChild(edit);
    item.appendChild(tick);
    item.appendChild(cross);
    itemList.appendChild(item);

    //Deleting Data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('todo').doc(id).delete();
    });
    
    //Checking the option (with updation)
    text.addEventListener('click', () => {
        check(text);
    })
}

function edit(edit) {
    let text = edit.previousSibling;

    text.classList.add('enabled');
    text.focus();
    text.readOnly = false;
    let tick = edit.nextSibling;
    tick.style.display="block";
    edit.style.display="none";

    tick.addEventListener('click', () => {
        update(text);
        edit.style.display="block";
        tick.style.display="none";
    })


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



function check(text) {
    let i = text.parentElement;
    let id = i.dataset.id;
    let c = true;
    if(!text.classList.contains('checked')) {
        text.classList.add('checked');
        c = true;
    } else {
        text.classList.remove('checked');
        c = false;
    }
    text.dataset.check = c;

    db.collection('todo').doc(id).delete();
    db.collection('todo').add({
        item: text.value,
        check: c
    });

    // db.collection('todo').doc(id).update({
    //     check: c
    // })
}

function update(text) {
    let i = text.parentElement;
    let id = i.dataset.id;
    let value = text.value;

    text.removeEventListener('click',check(text));
    text.classList.remove('checked');

    db.collection('todo').doc(id).update({
        item: value,
        check: false
    })
    text.classList.remove('enabled');
    text.readOnly = true;
}