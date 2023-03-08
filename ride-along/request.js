import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getStorage  , uploadBytes } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
import { getFirestore ,getDoc,getDocs, setDoc, collection ,doc, addDoc} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

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
var storage =  getStorage(app);
const auth = getAuth(app);

const urlSearchParams = new URLSearchParams(window.location.search);
const document_id = urlSearchParams.get('doc-id');
let user_email;
const docRef = doc(db, "driver-details", document_id);

const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
    const data = docSnap.data();
    user_email = data.email;
    console.log(user_email);
  } else {
    console.log("No such document!");
  }

  console.log(user_email);
let email_temp;
let tempArr = [];
let querySnapshot = await getDocs(collection(db, 'rider-details'));
// console.log(user_id);
querySnapshot.forEach((doc) => {

//   console.log(doc.data().trip_posted.trip_details);
  if(doc.data().trip_details == undefined){
    console.log("hello")
  }
  else{
    console.log("in Else");
    console.log(doc.data().trip_details.requested_driver);
    email_temp = doc.data().trip_details.requested_driver;
    console.log(email_temp);
    console.log(user_email);
    if(user_email == email_temp){
        console.log(doc.data().trip_details);
        tempArr.push(doc.data());
      }
  }

});

console.log(tempArr);
console.log(tempArr[0].trip_details.price);

for(let i =0; i<tempArr.length;i++){

    const div = document.createElement("div");
  div.classList.add("rider-details");
  const availableRider = document.getElementById('available');

  div.innerHTML = `<br><br><br>

  <p>Driver Name: ${tempArr[i].name}</p>
    <p>Origin: ${tempArr[i].trip_details.origin_detail}</p>
    <p>Destination: ${tempArr[i].trip_details.destination_detail}</p>
    <p>Date: ${tempArr[i].trip_details.date}</p>
    <p>Time: ${tempArr[i].trip_details.time}</p>
    <p>Luggage: ${tempArr[i].trip_details.luggage}</p>
    <p>Passengers: ${tempArr[i].trip_details.passengers}</p>
    <p>Pet: ${tempArr[i].trip_details.pet}</p>
    <p>Price: ${tempArr[i].trip_details.price}</p>
    <p>Description: ${tempArr[i].trip_details.description}</p>
  `;
   availableRider.appendChild(div);

//    const requestDriver = document.getElementById(`request-driver-${i}`);

// requestDriver.addEventListener('click',async (e)=>{

//     e.preventDefault();
//     console.log("Request Clicked");

//     console.log(tempArr[i].email);
//     try {
//         await setDoc(doc(db, "rider-details", document_id), {
//             trip_details: {
//               origin_detail: fromLocation.value,
//               destination_detail: toLocation.value,
//               date: rideDate.value,
//               time: rideTime.value,
//               luggage: luggageNum.value,
//               passengers: passengerNum.value,
//               pet: petChecked.checked,
//               requested_driver: tempArr[i].email
//            }
//         }, {
//           merge: true
//         });
//           console.log("Document successfully updated!");
//          } catch (error) {
//           console.error("Error updating document: ", error);
//         }

// })

}
