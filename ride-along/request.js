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

const urlSearchParams = new URLSearchParams(window.location.search);
const document_id = urlSearchParams.get('doc-id');

const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');

menuButton.addEventListener('click', function () {
    console.log("button clicked");
    // menu.classList.remove('nonvisible');
    menu.classList.toggle('visible');
});

const backButton1 = document.getElementById("back-button1");

backButton1.addEventListener("click", function () {
    // backButton1.classList.add("visually-hidden");
    history.go(-1);
});


const myProfile = document.getElementById('profile-page');

myProfile.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.href = `./my-profile.html?doc-id=${document_id}`;
})

const safety = document.getElementById('safety-page');

safety.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.href = `./security/index.html?doc-id=${document_id}`;
})

const contact = document.getElementById('contact-page');

contact.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.href = `./contact us/index.html?doc-id=${document_id}`;
})

const requestPage = document.getElementById('request-page');

requestPage.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.href = `./request.html?doc-id=${document_id}`;
})


let user_email;
const docRef = doc(db, "driver-details", document_id);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
  const data = docSnap.data();
  user_email = data.email;
  console.log(user_email);

console.log(user_email);
let email_temp;
let tempArr = [];
let docArr = [];
let rider_id = [];
let imageArr = [];
var link= "";
const acceptButton = [];
const declineButton = [];
let querySnapshot = await getDocs(collection(db, 'rider-details'));


// console.log(user_id);
querySnapshot.forEach((doc) => {

  //   console.log(doc.data().trip_posted.trip_details);
  if (doc.data().trip_details == undefined) {
    console.log("hello")
  }
  else {
    console.log("in Else");
    console.log(doc.data().trip_details.requested_driver);
    email_temp = doc.data().trip_details.requested_driver;
    console.log(email_temp);
    console.log(user_email);
    if (user_email == email_temp) {
      console.log(doc.data().trip_details);
      tempArr.push(doc.data());
      docArr.push(doc.id);
      imageArr.push(doc.id);
    }
  }

});

console.log(tempArr);
console.log(docArr);
// console.log(tempArr[0].trip_details.price);

for (let i = 0; i < tempArr.length; i++) {

  const div = document.createElement("div");
  div.classList.add("rider-details");
  const availableRider = document.getElementById('available');

  console.log(tempArr[i]);

  const path = `images/${imageArr[i]}image.png`;
      console.log(path);
      const storageRef = ref(storage , path);
      console.log(storageRef);

    getDownloadURL(storageRef)
    .then((url) => {
        console.log(url);
        getMetadata(storageRef)
        .then((metadata) => {
            const data = JSON.parse(metadata.customMetadata.metadata);
            link = data.link;
       console.log(link);
       const image = document.getElementById(`image-${i}`);     
       image.setAttribute('src' , link);
    })
  .catch((error) => {
    console.log("Uh-oh, an error occurred!")
  });
     
  })
  .catch((error) => {
    console.error(error);
  });

  if(tempArr[i].trip_details.ride_approved == "true"){

    div.innerHTML = `
    <p class='time'>Date: ${tempArr[i].trip_details.date}</p>
    <p class='time'>Time: ${tempArr[i].trip_details.time}</p>
    <div class='enter=location'>
      <div class="fromLocation">${tempArr[i].trip_details.origin_detail}</div>
      <div class="toLocation">${tempArr[i].trip_details.destination_detail}</div>
    </div>

    <div class="rider-detailss">
      <img id="image-${i}" src="${link}" alt="rider-image">
      <div class="rider-info">
          <p class="name">${tempArr[i].name}</p>
          <div class="misc-details">
              <p class="luggage">Luggage: ${tempArr[i].trip_details.luggage}</p>
              <p class="passengers">Passenger(s): ${tempArr[i].trip_details.passengers}</p>
              <p class="pets">Pets: ${tempArr[i].trip_details.pet}</p>
          </div>
      </div>
    </div>

    <div class="btns">
      <input type="button" value="Already Accepted" id="accepted" disabled></button>

      <input type="submit" id="trip-preview-${i}" value="Trip Preview">
    </div>

    
    
  `;

  availableRider.appendChild(div);

  // const trip_preview = document.getElementById(`trip-preview-${i}`);

  rider_id[i] = document.getElementById(`trip-preview-${i}`);

  rider_id[i].addEventListener('click',()=>{
  console.log(docArr[i]);
  console.log(rider_id[i]);  
  window.location.href = `./trip-preview.html?doc-id=${document_id}&rider-id=${docArr[i]}`;
  })
  }
  else{
  div.innerHTML = `

  <p class='time'>Date: ${tempArr[i].trip_details.date}</p>
    <p class='time'>Time: ${tempArr[i].trip_details.time}</p>
    <div class='enter-location'>
      <div class="fromLocation">${tempArr[i].trip_details.origin_detail}</div>
      <div class="toLocation">${tempArr[i].trip_details.destination_detail}</div>
    </div>

    <div class="rider-detailss">
      <img id="image-${i}" src="${link}" alt="rider-image">
      <div class="rider-info">
          <p class="name">${tempArr[i].name}</p>
          <div class="misc-details">
              <p class="luggage">Luggage: ${tempArr[i].trip_details.luggage}</p>
              <p class="passengers">Passenger(s): ${tempArr[i].trip_details.passengers}</p>
              <p class="pets">Pets: ${tempArr[i].trip_details.pet}</p>
          </div>
      </div>
    </div>

    <div class="btns">
      <input type="button" value="Accept" id="accept-${i}">

      <input type="button" value="Decline" id="decline-${i}">
    </div>
  `;

  availableRider.appendChild(div);

  acceptButton[i] = document.getElementById(`accept-${i}`);

  acceptButton[i].addEventListener('click', async (e) => {
    console.log("Approve");
    console.log(acceptButton[i]);
    e.preventDefault();
    console.log(docArr[i]);
    await setDoc(doc(db,"rider-details",docArr[i]),{
      trip_details :{
        ride_approved : "true",
      }    
          },{
          merge: true
      })
      rider_id[i]= docArr[i];
      console.log(rider_id[i]);
      alert("Request Approved!");
      location.reload();
  });
  }

  declineButton[i] = document.getElementById(`decline-${i}`);

  if(declineButton[i] != null || declineButton[i] == ""){
    declineButton[i].addEventListener('click', async (e) => {
      console.log("Decline");
      e.preventDefault();
      console.log(docArr[i]);
      await setDoc(doc(db,"rider-details",docArr[i]),{
        
        trip_details: {}    
            },{
            merge: true
        })

        await setDoc(doc(db,"rider-details",docArr[i]),{
        
          trip_details :{
            requested_driver : "",
            ride_approved : "false",
  
          }    
              },{
              merge: true
          })
        rider_id = docArr[i];
        alert("Request Declined!");
        location.reload();
    });
  }

}
} else {



const docRef = doc(db, "rider-details", document_id);
const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  user_email = data.email;
  let tempArr = [];
  let docArr = [];
  let imageArr = [];
var link= "";

if(data.trip_details.ride_approved == "true"){

    let querySnapshot = await getDocs(collection(db, 'driver-details'));
    querySnapshot.forEach((doc) => {

      if(doc.data().trip_details == undefined){
        console.log("hello")
      }
      else{
        if(data.trip_details.requested_driver == doc.data().email){
            console.log(doc.data().trip_details);
            tempArr.push(doc.data());
            docArr.push(doc.id);
            imageArr.push(doc.id);
          }
      }
    });

    for(let i =0; i<tempArr.length;i++){

      const div = document.createElement("div");
    div.classList.add("driver-details");
    const availableDriver = document.getElementById('available');

    const path = `images/${imageArr[i]}image.png`;
      console.log(path);
      const storageRef = ref(storage , path);
      console.log(storageRef);

    getDownloadURL(storageRef)
    .then((url) => {
        console.log(url);
        getMetadata(storageRef)
        .then((metadata) => {
            const data = JSON.parse(metadata.customMetadata.metadata);
            link = data.link;
       console.log(link);
       const image = document.getElementById(`image-${i}`);     
       image.setAttribute('src' , link);
    })
  .catch((error) => {
    console.log("Uh-oh, an error occurred!")
  });
     
  })
  .catch((error) => {
    console.error(error);
  });

  console.log(i);
      div.innerHTML = `
      <h2> Request Approved </h2>
      <br>

      <img id="image-${i}" src="${link}" alt="" style="height:100px">
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

      <input type="submit" id="request-driver-${i}" value="Request Approved" disabled>   
      <input type="submit" id="trip-preview-${i}" value="Trip Preview">
    `;
     availableDriver.appendChild(div);

     document.getElementById(`trip-preview-${i}`).addEventListener('click',()=>{
      // rider_id = document_id;
      window.location.href = `./trip-preview.html?doc-id=${docArr[i]}&rider-id=${document_id}`;
    })

  }
  }
  else if(data.trip_details.ride_approved == ""){
    const div = document.createElement("div");
    div.classList.add("driver-details");
    const availableDriver = document.getElementById('available');

    div.innerHTML = `
      <h2> Request Rejected </h2> `;
      availableDriver.appendChild(div);
  }
  else{
    const div = document.createElement("div");
    div.classList.add("driver-details");
    const availableDriver = document.getElementById('available');

    div.innerHTML = `
      <h2> No Update Yet. </h2> `;
      availableDriver.appendChild(div);
  }
}
