import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getStorage, uploadBytes, getMetadata, ref , getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { collection, addDoc, getDocs, getFirestore, setDoc, doc, getDoc, writeBatch, updateDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"
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
var storage = getStorage(app);
const batch = writeBatch(db);

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




let isDriver = false;
const picture = document.getElementById('picture');
const username = document.getElementById('user-name');
const email = document.getElementById('email');
const name = document.getElementById('name');

const vehicleDiv = document.getElementById('vehicle-details');
const car_model = document.getElementById('car-model');
const car_name = document.getElementById('car-name');
const car_number = document.getElementById('car-number');

const emergency_name = document.getElementById('emergency-name');
const emergency_phone = document.getElementById('emergency-phone');

const update_image = document.getElementById('update-image');
const update_name = document.getElementById('update-name');
const update_car_model = document.getElementById('update-car-model');
// const update_emergency_name = document.getElementById('update-emergency-name');
const update_emergency_phone = document.getElementById('update-emergency-phone');


const update = document.getElementById('update');
const sign_out = document.getElementById('sign-out');


const driverDetailsRef = collection(db, 'driver-details');
const driverDocRef = doc(driverDetailsRef, document_id);
const driverRef = await getDoc(driverDocRef);

const image_div = document.getElementById('image-div');
const capturedImg = document.getElementById("captured-img");
const cameraFeed = document.getElementById('cameraFeed');


const path = `images/${document_id}image.png`;
const storageRef = ref(storage , path);
let link = "";
console.log(storageRef);

getDownloadURL(storageRef)
.then((url) => {
  getMetadata(storageRef)
  .then((metadata) => {
      const data = JSON.parse(metadata.customMetadata.metadata);
      link = data.link;
 picture.setAttribute('src' , link);
})
.catch((error) => {
console.log("Uh-oh, an error occurred!")
});

})
.catch((error) => {
console.error(error);
});

if (driverRef.exists()) {
  
  isDriver = true;
  let driverData = driverRef.data();

  username.innerHTML = `${driverData.name}`;
  email.value = `${driverData.email}`
  name.value = `${driverData.name}`;

  car_model.value = `${driverData.car_details.car_model}`;
  car_name.value = `${driverData.car_details.car_name}`;
  car_number.value = `${driverData.car_details.car_number}`;

  emergency_name.value = `${driverData.emergency_details.name}`;
  emergency_phone.value = `${driverData.emergency_details.phone}`;

} else {

  const riderDetailsRef = collection(db, 'rider-details');
  const riderDocRef = doc(riderDetailsRef, document_id);
  const riderRef = await getDoc(riderDocRef);
  if (riderRef.exists()) {

    vehicleDiv.classList.add("display-none");
    let riderData = riderRef.data();

    console.log(riderData);
    username.innerHTML = `${riderData.name}`;
    email.value = `${riderData.email}`
    name.value = `${riderData.name}`;

    emergency_name.value = `${riderData.emergency_details.name}`;
    emergency_phone.value = `${riderData.emergency_details.phone}`;

  } 
  else {
    console.log("User is not authenticated");
  }
}

update_name.addEventListener('click',()=>{
   name.removeAttribute('disabled');
   name.focus();
});

update_car_model.addEventListener('click',()=>{
  car_model.removeAttribute('disabled');
  car_name.removeAttribute('disabled');
  car_number.removeAttribute('disabled');
  car_model.focus();
});

update_emergency_phone.addEventListener('click',()=>{
  emergency_phone.removeAttribute('disabled');
  emergency_name.removeAttribute('disabled');
  emergency_phone.focus();
  emergency_name.focus();
});

let dataURL ="";
update_image.addEventListener('click', ()=>{
  image_div.style.display = 'block';

const context = capturedImg.getContext('2d');
context.scale(0.5, 0.5);
document.getElementById("capture-btn").addEventListener("click", function () {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then( (stream) => {
      cameraFeed.srcObject = stream;
    }).catch( (error) => {
        console.log("failed to get media stream", error);
    });

  } else {
    console.log("media devices not available in this browser");
  }
});

// Trigger photo take
document.getElementById("snap-btn").addEventListener("click",  () => {
  context.drawImage(cameraFeed, 0, 0);
  dataURL = capturedImg.toDataURL();
});

})


update.addEventListener('click', async ()=>{
 
  if(dataURL == ""){
    dataURL = link;
  }
  const mimeType = dataURL.split(';')[0].split(':')[1];
      const blob = new Blob([dataURL], { type: mimeType });
      blob.name = document_id+"image.png";
      console.log(blob.name);
      // blob.id = user_id;
  
      const metadata = {
      link: dataURL,
      description: 'This is a description of my image'
  };
  const metadataStr = JSON.stringify(metadata);
  
      if (blob && blob.type.match('image.*')) {
       console.log(blob.name);
       let name = document_id+'image.png';
        const imageRef = ref(storage , `images/${name}`);
        uploadBytes(imageRef , blob, { customMetadata: { metadata: metadataStr } }).then(async function(snapshot) {
          console.log('Uploaded image:', snapshot.metadata.fullPath);
          console.log(document_id);
          })
      } else {
        console.log('Invalid file selected');
      }

  if(isDriver == true){
    await setDoc(doc(db,"driver-details",document_id),{
      name: name.value,
      car_details: {
          car_name: car_name.value,
          car_model: car_model.value,
          car_number: car_number.value,
      },
      emergency_details: {
        name: emergency_name.value,
        phone: emergency_phone.value,
      }    
          },{
          merge: true
      });

      location.reload();
  }
  else{
    await setDoc(doc(db,"rider-details",document_id),{
      name: name.value,
      emergency_details: {
        name: emergency_name.value,
        phone: emergency_phone.value,
      }    
          },{
          merge: true
      })
      location.reload();
  }
})


sign_out.addEventListener('click',()=>{

  window.location.href = `./sign-in.html`;

})


