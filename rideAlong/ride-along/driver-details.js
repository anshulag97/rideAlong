import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, onAuthStateChanged , createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { collection, addDoc,getDocs,getFirestore,setDoc,doc,writeBatch } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"
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
const batch = writeBatch(db)

const urlSearchParams = new URLSearchParams(window.location.search);
const user_id = urlSearchParams.get('id');
console.log(user_id);
let document_id="";
const querySnapshot = await getDocs(collection(db, 'driver-details'));
console.log(user_id);
querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());


  if(doc.data().uid === user_id){
    document_id = doc.id.toString();
  }

});

const submit = document.getElementById("submit");

submit.addEventListener('click',async(e)=>{
    e.preventDefault();
    const car_Name = document.getElementById("car-name").value
    const car_Number = document.getElementById("car-number").value
    const car_Model = document.getElementById("car-model").value

    if(validate_field(car_Name) == false) {
      alert('Please enter all the details');
      return
    }

    if(validate_field(car_Number) == false) {
      alert('Please enter all the details');
      return
    }

    if(validate_field(car_Model) == false) {
      alert('Please enter all the details');
      return
    }


   await setDoc(doc(db,"driver-details",document_id),{
    car_details: {
        car_name: car_Name,
        car_model: car_Model,
        car_number: car_Number,
    }    
        },{
        merge: true
    })

    alert('Details Entered Successfully.');
    location.href = `./profile-setup.html?id=${user_id}`;

})

function validate_field(field){
  if(field === null || field === ''){
     return false
  }else{
      return true
  }
}