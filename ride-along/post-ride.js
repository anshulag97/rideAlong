import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, onAuthStateChanged , createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { collection, addDoc,getDocs,getFirestore,setDoc,doc, getDoc,writeBatch , updateDoc} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"
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
const batch = writeBatch(db);

const urlSearchParams = new URLSearchParams(window.location.search);
const document_id = urlSearchParams.get('doc-id');


// adjust the number of luggage
const plusBtn1 = document.getElementById("plus_btn1");
const minusBtn1 = document.querySelector("#minus_btn1");
const luggageNum = document.getElementById("luggage-number");

plusBtn1.addEventListener("click", (e) => {
    e.preventDefault();
    luggageNum.value = parseInt(luggageNum.value) + 1;
    console.log(luggageNum.value);
});

minusBtn1.addEventListener("click", () => {
    if (parseInt(luggageNum.value) > 0) {
        luggageNum.value = parseInt(luggageNum.value) - 1;
    }
});


// adjust the number of passengers
const plusBtn2 = document.querySelector(".plus-btn2");
const minusBtn2 = document.querySelector(".minus-btn2");
const passengerNum = document.getElementById("passenger-number");

plusBtn2.addEventListener("click", () => {
    passengerNum.value = parseInt(passengerNum.value) + 1;
});

minusBtn2.addEventListener("click", () => {
    if (parseInt(passengerNum.value) > 0) {
        passengerNum.value = parseInt(passengerNum.value) - 1;
    }
});

submit.addEventListener('click',async(e)=>{
e.preventDefault();
const origin = document.getElementById('origin').value;

const destination = document.getElementById('destination').value;
const submit = document.getElementById('submit');
const date = document.getElementById('date').value;
const time = document.getElementById('time').value;
const luggage = luggageNum.value;
const passengers = passengerNum.value;
const pet = document.getElementById('pets').checked;
const price = document.getElementById('price').value;
const description = document.getElementById('description').value;

try {
  await setDoc(doc(db, "driver-details", document_id), {
    
      trip_details: {
        origin_detail: origin,
        destination_detail: destination,
        date: date,
        time: time,
        luggage: luggage,
        passengers: passengers,
        pet: pet,
        price: price,
        description: description
    }
  }, {
    merge: true
  });
    console.log("Document successfully updated!");
   } catch (error) {
    console.error("Error updating document: ", error);
  }
});

