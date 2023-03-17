  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
  import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { collection, addDoc, getFirestore, getDocs } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"
const firebaseConfig = {
  apiKey: "AIzaSyA0l9LZ3lYZWsSyPFTsxRACc2ltACy2hsI",
  authDomain: "ridealong-683df.firebaseapp.com",
  databaseURL: "https://ridealong-683df-default-rtdb.firebaseio.com",
  projectId: "ridealong-683df",
  storageBucket: "ridealong-683df.appspot.com",
  messagingSenderId: "553276766158",
  appId: "1:553276766158:web:1c8d10708b75961cae5d9f",
  measurementId: "G-CW67ZBW2B9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const submit = document.getElementById("submit");

const urlSearchParams = new URLSearchParams(window.location.search);
let document_id = urlSearchParams.get('doc-id');

submit.addEventListener('click', (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === '' || password === '') {
    const errorMessageText = "Please Enter your Details";
    alert(errorMessageText);
  } else {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log("Signed In");
        const user = userCredential.user;
        console.log(user);
        let user_id = user.uid;
        if (document_id == null || document_id == "") {

          let querySnapshot = await getDocs(collection(db, 'driver-details'));
          console.log(user_id);
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            if (doc.data().uid === user_id) {
              document_id = doc.id.toString();
            }
          });

          if (document_id == "" || document_id == null) {
            querySnapshot = await getDocs(collection(db, 'rider-details'));
            console.log(user_id);
            querySnapshot.forEach((doc) => {
              console.log(doc.id, " => ", doc.data());
              if (doc.data().uid === user_id) {
                document_id = doc.id.toString();
              }
            });
          }
        }
        console.log("document id",document_id);
        window.location.href = `./rider-details2.0/pages/page1/page1.html?doc-id=${document_id}`;
      })
      .catch((error) => {
        const errorMessageText = error.message;
        alert(errorMessageText);
      });
  }
});
