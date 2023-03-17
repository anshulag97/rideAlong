import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getStorage, uploadBytes, getMetadata, ref , getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
import { getFirestore, getDoc, getDocs, setDoc, collection, doc, addDoc, query, where } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"
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
var storage = getStorage(app);
const auth = getAuth(app);
var link = "";

console.log("Trip preview Entered");

const urlSearchParams = new URLSearchParams(window.location.search);
const document_id = urlSearchParams.get('doc-id');
let rider_id = urlSearchParams.get('rider-id');

const docDriver = doc(db, "driver-details", document_id);
const docSnapDriver = await getDoc(docDriver);
const dataDriver = docSnapDriver.data();

const docRider = doc(db, "rider-details", rider_id);
const docSnapRider = await getDoc(docRider);
const dataRider = docSnapRider.data();
  
const div = document.createElement("div");
  div.classList.add("trip-details");
  div.id = "trip-details"
  const tripPreview = document.getElementById('trip-preview');

  const path_driver = `images/${document_id}image.png`;
      console.log(path_driver);
      const storageRef = ref(storage , path_driver);
      console.log(storageRef);

    getDownloadURL(storageRef)
    .then((url) => {
        console.log(url);
        getMetadata(storageRef)
        .then((metadata) => {
            const data = JSON.parse(metadata.customMetadata.metadata);
            link = data.link;
       console.log(link);
       const image_driver = document.getElementById(`image-driver`);     
       image_driver.setAttribute('src' , link);
    })
  .catch((error) => {
    console.log("Uh-oh, an error occurred!")
  });
     
  })
  .catch((error) => {
    console.error(error);
  });

  const path_rider = `images/${rider_id}image.png`;
      console.log(path_rider);
      const storageReff = ref(storage , path_rider);
      console.log(storageReff);

    getDownloadURL(storageReff)
    .then((url) => {
        console.log(url);
        getMetadata(storageReff)
        .then((metadata) => {
            const data = JSON.parse(metadata.customMetadata.metadata);
            link = data.link;
       console.log(link);
       const image_rider = document.getElementById(`image-rider`);     
       image_rider.setAttribute('src' , link);
    })
  .catch((error) => {
    console.log("Uh-oh, an error occurred!")
  });
     
  })
  .catch((error) => {
    console.error(error);
  });

  div.innerHTML = `<br><br><br>

  <input type="submit" id="start-ride" value="Start Ride" >
   <input type="submit" id="end-ride" value="End Ride" disabled></input>

   <br><br>

    <h2> Trip Details </h2>
    <p>Origin: ${dataDriver.trip_details.origin_detail}</p>
    <p>Destination: ${dataDriver.trip_details.destination_detail}</p>
    <p>Date: ${dataDriver.trip_details.date}</p>
    <p>Time: ${dataDriver.trip_details.time}</p>
    <p>Luggage: ${dataDriver.trip_details.luggage}</p>
    <p>Passengers: ${dataDriver.trip_details.passengers}</p>
    <p>Pet: ${dataDriver.trip_details.pet}</p>
    <p>Price: ${dataDriver.trip_details.price}</p>
    <p>Description: ${dataDriver.trip_details.description}</p>

    


    <h2> Driver Details </h2>

    <img id="image-driver" src="${link}" alt="" style="height:100px">
    <p>Driver Name: ${dataDriver.name}</p>
    <p> Car Name: ${dataDriver.car_details.car_name} </p> 
    <p> Car Model: ${dataDriver.car_details.car_model} </p> 
    <p> Car Number: ${dataDriver.car_details.car_number} </p> 

    
    <h2> Rider Details </h2>
    <img id="image-rider" src="${link}" alt="" style="height:100px">
    <p>Rider Name: ${dataRider.name}</p>
  
    `;
  tripPreview.appendChild(div);


const start = document.getElementById('start-ride');
const end = document.getElementById('end-ride');
const trip_details = document.getElementById('trip-details')

start.addEventListener('click',(e)=>{
  e.preventDefault();

  
  end.removeAttribute("disabled");
  
  start.setAttribute("disabled" , true);


  const div = document.createElement("div");
  div.classList.add("sos-enabled");

  div.innerHTML = `<br>
  <input type="submit" id="sos" value="SOS" >
  <br><br>`;

  tripPreview.insertBefore(div, trip_details);

  const sos = document.getElementById('sos');
  sos.addEventListener('click', (e)=>{
    e.preventDefault();
    console.log("SOS Clicked");
    const emergencyNumber = "+1-6047796246";
    window.open("tel:" + emergencyNumber);
  });
})


end.addEventListener('click',async ()=>{

  // FLUSH TRIP DETAILS : For Rider and Driver
  const docRef = doc(db, "driver-details", document_id);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
  await setDoc(doc(db,"driver-details",document_id),{
    trip_details: {}    
        },{
        merge: true
    })
} else{
  await setDoc(doc(db,"rider-details",document_id),{
    trip_details: {}    
        },{
        merge: true
    })
}

const docReff = doc(db, "rider-details", rider_id);
const docSnapp = await getDoc(docReff);
if (docSnapp.exists()) {
  await setDoc(doc(db,"rider-details",rider_id),{
    trip_details: {}    
        },{
        merge: true
    })
} else{
  await setDoc(doc(db,"driver-details",rider_id),{
    trip_details: {}    
        },{
        merge: true
    })
}
    
  window.location.href = `./trip-completed.html?doc-id=${document_id}`;
})