import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
    getStorage,
    uploadBytes
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
import {
    getFirestore,
    getDoc,
    getDocs,
    setDoc,
    collection,
    doc,
    addDoc
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
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
const db = getFirestore(app);
var storage = getStorage(app);
const auth = getAuth(app);

const urlSearchParams = new URLSearchParams(window.location.search);
const document_id = urlSearchParams.get('doc-id');