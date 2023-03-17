import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
<<<<<<< HEAD
import { getStorage, uploadBytes } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
=======
import { getStorage, uploadBytes, getMetadata, ref , getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
>>>>>>> c15eb2eb851d9c657e2fff2af8a1ebb749f82ca3
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
<<<<<<< HEAD
=======
let imageArr = [];
var link= "";
>>>>>>> c15eb2eb851d9c657e2fff2af8a1ebb749f82ca3
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
<<<<<<< HEAD
=======
      imageArr.push(doc.id);
>>>>>>> c15eb2eb851d9c657e2fff2af8a1ebb749f82ca3
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

<<<<<<< HEAD
=======
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

>>>>>>> c15eb2eb851d9c657e2fff2af8a1ebb749f82ca3
  if(tempArr[i].trip_details.ride_approved == "true"){

    div.innerHTML = `<br><br><br>

<<<<<<< HEAD
=======
    <img id="image-${i}" src="${link}" alt="" style="height:100px">
>>>>>>> c15eb2eb851d9c657e2fff2af8a1ebb749f82ca3
    <p>Rider Name: ${tempArr[i].name}</p>
    <p>Origin: ${tempArr[i].trip_details.origin_detail}</p>
    <p>Destination: ${tempArr[i].trip_details.destination_detail}</p>
    <p>Date: ${tempArr[i].trip_details.date}</p>
    <p>Time: ${tempArr[i].trip_details.time}</p>
    <p>Luggage: ${tempArr[i].trip_details.luggage}</p>
    <p>Passengers: ${tempArr[i].trip_details.passengers}</p>
    <p>Pet: ${tempArr[i].trip_details.pet}</p>
    <p>Price: ${tempArr[i].trip_details.price}</p>
    <p>Description: ${tempArr[i].trip_details.description}</p>

    <input type="button" value="Already Accepted" id="accepted" disabled>
    <input type="submit" id="trip-preview-${i}" value="Trip Preview">
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
  div.innerHTML = `<br><br><br>

<<<<<<< HEAD
=======
  <img id="image-${i}" src="${link}" alt="" style="height:100px">
>>>>>>> c15eb2eb851d9c657e2fff2af8a1ebb749f82ca3
  <p>Rider Name: ${tempArr[i].name}</p>
    <p>Origin: ${tempArr[i].trip_details.origin_detail}</p>
    <p>Destination: ${tempArr[i].trip_details.destination_detail}</p>
    <p>Date: ${tempArr[i].trip_details.date}</p>
    <p>Time: ${tempArr[i].trip_details.time}</p>
    <p>Luggage: ${tempArr[i].trip_details.luggage}</p>
    <p>Passengers: ${tempArr[i].trip_details.passengers}</p>
    <p>Pet: ${tempArr[i].trip_details.pet}</p>
    <p>Price: ${tempArr[i].trip_details.price}</p>
    <p>Description: ${tempArr[i].trip_details.description}</p>


    <input type="button" value="Accept" id="accept-${i}">
    <input type="button" value="Decline" id="decline-${i}">
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
        trip_details :{
          requested_driver : ""
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
<<<<<<< HEAD
=======
  let imageArr = [];
var link= "";
>>>>>>> c15eb2eb851d9c657e2fff2af8a1ebb749f82ca3

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
<<<<<<< HEAD
=======
            imageArr.push(doc.id);
>>>>>>> c15eb2eb851d9c657e2fff2af8a1ebb749f82ca3
          }
      }
    });

    for(let i =0; i<tempArr.length;i++){

      const div = document.createElement("div");
    div.classList.add("driver-details");
    const availableDriver = document.getElementById('available');

<<<<<<< HEAD
=======
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
>>>>>>> c15eb2eb851d9c657e2fff2af8a1ebb749f82ca3
      div.innerHTML = `
      <h2> Request Approved </h2>
      <br>

<<<<<<< HEAD
=======
      <img id="image-${i}" src="${link}" alt="" style="height:100px">
>>>>>>> c15eb2eb851d9c657e2fff2af8a1ebb749f82ca3
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


    // const driverDetailsRef = collection(db, 'driver-details');
    // const driverDetailsSnapshot = await getDoc(doc(driverDetailsRef, document_id));
    
    // if (driverDetailsSnapshot.exists()) {
    //   const newCollectionRef = collection(db, 'trip-accepted');
    //   const newDocRef = await addDoc(newCollectionRef, { driver: driverDetailsSnapshot.data() });
    //   console.log('New document added with ID: ', newDocRef.id);
    //   alert("Ride Accepted!")
    //   console.log(user_email)
    //   const tripDocId = newDocRef.id;
    // } else {
    //   console.log('No such document!');
    // }
    
    // const riderDetailsRef = collection(db, 'rider-details');
    // const q = query(riderDetailsRef, where('email', '==', 'sunny@gmail.com'));
    // console.log(q);
    // const riderDetailsSnapshot = await getDocs(q);
    // console.log(riderDetailsSnapshot.docs);
    // if(riderDetailsSnapshot.size===1){
    //   console.log("helo")
    //   const riderDetailsDoc = riderDetailsSnapshot[0];
    //   const docRef = doc(db, "trip-accepted", 'HjR11Or3y3MbBqKhvjU0' );
    //   const tripRef = await getDoc(docRef);
    //   console.log(tripRef);
    //   if(tripRef.exists()){
        
    //     await setDoc(tripRef,{rider: riderDetailsDoc.data()},{merge:true});
    //     console.log("Proof of concept working")
    //   }else(
    //     console.log("no-rider-found")
    //   )


    // }else{
    //   console.log("error")
    // }
    // console.log(q)
    
    // if (riderDetailsSnapshot.exists()) {
      //   const tripRef = collection(db, 'trip-accepted');
      //   const tripQuery = query(tripRef, where('email', '==', user_email));
      //   const tripSnapshot = await getDoc(tripQuery);
      
      //   if (!tripSnapshot.empty) {
        //     const tripDoc = tripSnapshot.docs[0];
        //     const tripDocRef = doc(db, 'trip-accepted', tripDoc.id); // Create a DocumentReference object
        //     await setDoc(tripDocRef, { rider: riderDetailsSnapshot.data() }, { merge: true }); // Pass the DocumentReference object to setDoc()
        //   } else {
          //     console.log('No trip found for rider!');
          //   }
          // } else {
            //   console.log('No such document!');
            // }
            
            //  const riderDetailsRef = collection(db,'rider-details');
            //  const q = query(riderDetailsRef,where('requested_driver','==',user_email))
            //  const riderDetailsSnapshot = await getDoc(q);
            //  if(riderDetailsSnapshot.exists()){
              //    const tripRef = collection(db,'trip-accepted');
              //    const tripQuery = query(tripRef,where('email','==',user_email))
              //    const tripSnapshot = await getDoc(tripQuery)
              //    setDoc(tripSnapshot,{ rider: riderDetailsSnapshot.data()},{merge:true});
              
              //  }else{
                //   console.log('error')
                //  }
                
                // const driverDetailsRef = collection(db, 'driver-details');
                // const driverDetailsSnapshot = await getDoc(doc(driverDetailsRef, document_id));
            
                // if (driverDetailsSnapshot.exists()) {
                //   const newCollectionRef = collection(db, 'trip-accepted');
                //   const driver = new Map();
                //   for (const [key, value] of Object.entries(driverDetailsSnapshot.data())) {
                //     driver.set(key, value);
                //   }
                //   const driverObject = Object.fromEntries(driver);
                //   const newDocRef = await addDoc(newCollectionRef, driverObject);
                //   console.log('New document added with ID: ', newDocRef.id);
                //   alert("Ride Accepted!")
                // } else {
                //   console.log('No such document!');
                // }
            
                // const db = getFirestore();
              
              
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
  
