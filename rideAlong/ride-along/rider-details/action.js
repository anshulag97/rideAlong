import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getStorage  , uploadBytes, getMetadata, ref , getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
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

// const documentRef = doc(db, 'rider-details', document_id);

// // Get the document data and retrieve the UID from the data
// const documentData = await getDoc(documentRef);
// if (documentData.exists()) {
//   const uid = documentData.get('uid');
//   console.log(`The UID for document ${document_id} is ${uid}`);
// } else {
//   console.log(`No document found with ID ${documentId}`);
// }

// action on menu button
const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');

menuButton.addEventListener('click', function () {
    console.log("button clicked");
    // menu.classList.remove('nonvisible');
    menu.classList.toggle('visible');
});

const myProfile = document.getElementById('profile-page');

myProfile.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.href = `../my-profile.html?doc-id=${document_id}`;
})

const safety = document.getElementById('safety-page');

safety.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.href = `../security/index.html?doc-id=${document_id}`;
})

const contact = document.getElementById('contact-page');

contact.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.href = `../contact us/index.html?doc-id=${document_id}`;
})

const homePage = document.getElementById('home-page');

homePage.addEventListener('click', (e)=>{
  e.preventDefault();
  console.log("home")
    window.location.href = `./index.html?doc-id=${document_id}`;
})

const signOutPage = document.getElementById('sign-out-page');

signOutPage.addEventListener('click', (e)=>{
  e.preventDefault();
    window.location.href = `../sign-in.html?doc-id=${document_id}`;
})



// get the buttons and pages
const findRide = document.getElementById("findRidebutton");
const offerRideButton = document.getElementById("offerRidebutton");
const findrideButton = document.getElementById("rider-post-ride-submit");
// const requestRide = document.querySelector(".requestRide");
const requestRide2 = document.getElementById("requestRide2");
const startRide1 = document.getElementById("startRide1");
const startRide2 = document.getElementById("startRide2");
const endRide = document.getElementById("endRide");
const endrideSubmit = document.getElementById("endrideSubmit");
const backButton1 = document.getElementById("back-button1");
const backButton2 = document.getElementById("back-button2");
const riderPage1 = document.getElementById("rider-page1");
const riderPage2 = document.getElementById("rider-page2");
const riderPage3 = document.getElementById("rider-page3");
const riderPage4 = document.getElementById("rider-page4");
const riderPage5 = document.getElementById("rider-page5");
const riderPage6 = document.getElementById("rider-page6");
const riderPage7 = document.getElementById("rider-page7");
const riderPage8 = document.getElementById("rider-page8");

const requestPage = document.getElementById('request-page');

requestPage.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.href = `../request.html?doc-id=${document_id}`;
})

// let intervalId = setInterval(async ()=>{
//     let driver_email = "";
//     const docRef = doc(db, "driver-details", document_id);
//         const documentData = await getDoc(docRef);
//         console.log(documentData);
//         if (documentData.exists()) {
//             driver_email = documentData.data().email;
//             console.log(driver_email);
    
//             let querySnapshot = await getDocs(collection(db, 'rider-details'));
//         querySnapshot.forEach(async (document) => {
    
//             if(document.data().trip_details.notified == true){
//                 clearInterval(intervalId);
//             }
//             else{
//                 console.log(document.data().trip_details.requested_driver);
//           if(document.data().trip_details.requested_driver === driver_email && document.data().trip_details.notified_driver != true){
//             console.log(document.data().name);
//             alert("You have a new request");
//             await setDoc(doc(db,"rider-details",document.id),{
//                 trip_details: {
//                     notified_driver : true
//                 }    
//                     },{
//                     merge: true
//                 })
//           }
//           else{
//            console.log("Emaildid not match or already notified")
//           }     
//             } 
//         });
//             } else {
//            console.log(" Not a driver");
    
//            const docRef = doc(db, "rider-details", document_id);
//     const document = await getDoc(docRef);

//     if(document.data().trip_details.ride_approved == "true" && document.data().trip_details.notified_rider != true){
//                console.log(document.data().name);
//                alert("Your request is aproved.");
//                await setDoc(doc(db,"rider-details",document.id),{
//                    trip_details: {
//                        notified_rider : true
//                    }    
//                        },{
//                        merge: true
//                    })
//              } else if(document.data().trip_details.ride_approved == "false" && document.data().trip_details.notified_rider != true){
//                 console.log(document.data().name);
//                alert("Your request is Declined.");
//                await setDoc(doc(db,"rider-details",document.id),{
//                    trip_details: {
//                        notified_rider : true
//                    }    
//                        },{
//                        merge: true
//                    })
//              }
//              else{
//               console.log("Emaildid not match or already notified")
//              }

//             }
    
//         },4000);

offerRideButton.addEventListener('click',async (e)=>{

    e.preventDefault();
    console.log("OFFER");

    const docRef = doc(db, "driver-details", document_id);
    const documentData = await getDoc(docRef);
    console.log(documentData);
    if (documentData.exists()) {
          const isDriver = documentData.get('is_Driver');
          console.log(`The driver for document ${document_id} is ${isDriver}`);
          window.location.href = `../post-ride.html?doc-id=${document_id}`
        } else {
          console.log(`No driver details found with ID ${document_id}`);
          alert("Please Login as Driver");
        }
})


// Validate field function
function validate_field(field){
    if(field === null || field === ''){
      return false
    }else{
        return true
    }
  };



// add click event listeners to the buttons
findRide.addEventListener("click", function () {
    riderPage1.classList.add("nonvisible");
    riderPage2.classList.remove("nonvisible");
    backButton1.classList.remove("visually-hidden");

});
findrideButton.addEventListener("click", function () {

    if(validate_field(fromLocationInput.value) == false) {
        alert('Please enter the start location');
        return
    }

    if(validate_field(toLocationInput.value) == false) {
        alert('Please enter the destination');
        return
    }

    if(validate_field(dateInput.value) == false) {
        alert('Please enter date');
        return
    }

    if(validate_field(timeInput.value) == false) {
        alert('Please enter time');
        return
    }


    backButton1.classList.add("visually-hidden");
    backButton2.classList.remove("visually-hidden");
    riderPage2.classList.add("nonvisible");
    riderPage3.classList.remove("nonvisible");
    submitRideRequest();
});
// requestRide.addEventListener("click", function () {
//     riderPage3.classList.add("nonvisible");
//     riderPage4.classList.remove("nonvisible");
// });
// requestRide2.addEventListener("click", function () {
//     riderPage4.classList.add("nonvisible");
//     riderPage5.classList.remove("nonvisible");
// });
// startRide1.addEventListener("click", function () {
//     riderPage5.classList.add("nonvisible");
//     riderPage6.classList.remove("nonvisible");
// });
// startRide2.addEventListener("click", function () {
//     riderPage6.classList.add("nonvisible");
//     riderPage7.classList.remove("nonvisible");
//     initMap();
// });
// endRide.addEventListener("click", function () {
//     riderPage7.classList.add("nonvisible");
//     riderPage8.classList.remove("nonvisible");
// });
// endrideSubmit.addEventListener("click", function () {
//     riderPage8.classList.add("nonvisible");
//     riderPage1.classList.remove("nonvisible");
// });

backButton1.addEventListener("click", function () {
    riderPage1.classList.remove("nonvisible");
    riderPage2.classList.add("nonvisible");
    backButton1.classList.add("visually-hidden");
});
backButton2.addEventListener("click", function () {
    riderPage3.classList.add("nonvisible");
    riderPage2.classList.remove("nonvisible");
    backButton2.classList.add("visually-hidden");
    backButton1.classList.remove("visually-hidden");
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

// adjust the number of luggage
const plusBtn1 = document.querySelector(".plus-btn1");
const minusBtn1 = document.querySelector(".minus-btn1");
const luggageNum = document.getElementById("luggage-number");

plusBtn1.addEventListener("click", () => {
    luggageNum.value = parseInt(luggageNum.value) + 1;
});

minusBtn1.addEventListener("click", () => {
    if (parseInt(luggageNum.value) > 0) {
        luggageNum.value = parseInt(luggageNum.value) - 1;
    }
});



// get the find a ride requirements
let fromLocationInput = document.getElementById("fromlocation");
let toLocationInput = document.getElementById("tolocation");
let dateInput = document.getElementById("date");
let timeInput = document.getElementById("time");
let petChecked = document.getElementById("pets");
let requestrideArray = [];

dateInput.addEventListener("change", function () {
    if (dateInput.value) {
        dateInput.style.backgroundColor = "rgb(95, 105, 255)";
        dateInput.style.color = "white";
    }
});

timeInput.addEventListener("change", function () {
    if (timeInput.value) {
        timeInput.style.backgroundColor = "rgb(95, 105, 255)";
        timeInput.style.color = "white";
    }
});


// create city class
class Ride {
    constructor(fromLocation, toLocation, dateInput, timeInput, luggageNum, passengerNum, petChecked) {
        this.fromLocation = fromLocation;
        this.toLocation = toLocation;
        this.dateInput = dateInput;
        this.timeInput = timeInput;
        this.luggageNum = luggageNum;
        this.passengerNum = passengerNum;
        this.petChecked = petChecked
    }
}
let tempArr = [];
let imageArr = [];
var link= "";
async function submitRideRequest() {
    const ride = new Ride(fromLocationInput.value, toLocationInput.value, dateInput.value, timeInput.value, luggageNum.value, passengerNum.value, petChecked.checked ? true : false);
    requestrideArray.push(ride);
    console.log(requestrideArray);

    let origin_temp;
    let destination_temp;
    let querySnapshot = await getDocs(collection(db, 'driver-details'));
    // console.log(user_id);
    querySnapshot.forEach((doc) => {

    //   console.log(doc.data().trip_posted.trip_details);
      if(doc.data().trip_details == undefined){
        console.log("hello")
      }
      else{
        console.log("in Else");
        origin_temp = doc.data().trip_details.origin_detail;
        destination_temp = doc.data().trip_details.destination_detail;
        if(fromLocationInput.value == origin_temp && toLocationInput.value == destination_temp){
            console.log(doc.data().trip_details);
            tempArr.push(doc.data());
            imageArr.push(doc.id);
          }
      }

    });

    console.log(tempArr);
    // console.log(tempArr[0].trip_details.price);
    if(tempArr.length == 0){
        const availableDriver = document.getElementById('available');
        const div = document.createElement("div");
        div.classList.add("no-driver");
      
        div.innerHTML = `
        <h4 >No drivers found going along this route</h4>
        <h4 >Try changing your locations</h4>`
        availableDriver.appendChild(div);

    }

    for(let i =0; i<tempArr.length;i++){

        const div = document.createElement("div");
      div.classList.add("driver-details");
      const availableDriver = document.getElementById('available');


      const docRider = doc(db, "rider-details", document_id);
      const docSnapRider = await getDoc(docRider);
      const dataRider = docSnapRider.data();
      const requestDriver = [];
      

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

  console.log(link);

      if( dataRider.trip_details.requested_driver === tempArr[i].email){

        console.log("Already Requested to ", tempArr[i].name);
        
        div.innerHTML = `

        <p class='time'>Date: ${tempArr[i].trip_details.date}</p>
        <p class='time'>Time: ${tempArr[i].trip_details.time}</p>
        <div class='enter-location'>
        <div class="fromLocation">${tempArr[i].trip_details.origin_detail}</div>
        <div class="toLocation">${tempArr[i].trip_details.destination_detail}</div>
        </div>

        <div class="rider-detailss">
        <img id="image-${i}" src="${link}" alt="driver-image">
        <div class="rider-info">
            <p class="name">${tempArr[i].name}</p>
            <div class="misc-details">
                <p class="luggage">Luggage: ${tempArr[i].trip_details.luggage}</p>
                <p class="passengers">Passenger(s): ${tempArr[i].trip_details.passengers}</p>
                <p class="pets">Pets: ${tempArr[i].trip_details.pet}</p>
                <p><b>${tempArr[i].trip_details.price}</b></p>
            </div>
        </div>
        </div>

        <div class="btns">
        <input type="submit" id="request-driver-${i}" value="Already Requested" disabled>
        </div>







        
      `;
       availableDriver.appendChild(div);

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
      <img id="image-${i}" src="${link}" alt="driver-image">
      <div class="rider-info">
          <p class="name">${tempArr[i].name}</p>
          <div class="misc-details">
              <p class="luggage">Luggage: ${tempArr[i].trip_details.luggage}</p>
              <p class="passengers">Passenger(s): ${tempArr[i].trip_details.passengers}</p>
              <p class="pets">Pets: ${tempArr[i].trip_details.pet}</p>
              <p><b>${tempArr[i].trip_details.price}</b></p>
          </div>
      </div>
      </div>

      <div class="btns">
      <input type="submit" id="request-driver-${i}" value="Request to Book">
      </div>



      
      `;
       availableDriver.appendChild(div);
      }
       requestDriver[i] = document.getElementById(`request-driver-${i}`);
       console.log(requestDriver);
    requestDriver[i].addEventListener('click',async (e)=>{

        console.log(requestDriver);
        //  e.preventDefault();
        console.log("Request Clicked");

        console.log(tempArr[i].email);
        try {
            await setDoc(doc(db, "rider-details", document_id), {
                trip_details: {
                  origin_detail: fromLocationInput.value,
                  destination_detail: toLocationInput.value,
                  date: dateInput.value,
                  time: timeInput.value,
                  luggage: luggageNum.value,
                  passengers: passengerNum.value,
                  pet: petChecked.checked,
                  requested_driver: tempArr[i].email
               }
            }, {
              merge: true
            });
            alert("Request Sent !")
              console.log("Document successfully updated!");
              window.location.reload();
             } catch (error) {
              console.error("Error updating document: ", error);
            }

    })

    }


    


    // PUSH requestrideArray into the database for rider-details under particular document id as trip-details

    


}





//start and end point search and map routing 
document.addEventListener('DOMContentLoaded', () => {
    const fromLocationSuggestions = document.getElementById('fromlocation-suggestions');
    handleLocationInput(fromLocationInput, fromLocationSuggestions, (position) => {
        fromLocation = position;
        if (fromLocation && toLocation) {
            drawRoute(fromLocation, toLocation);
        }
    });

    const toLocationSuggestions = document.getElementById('tolocation-suggestions');
    handleLocationInput(toLocationInput, toLocationSuggestions, (position) => {
        toLocation = position;
        if (fromLocation && toLocation) {
            drawRoute(fromLocation, toLocation);
        }
    });
});

let fromLocation = null;
let toLocation = null;

function handleLocationInput(inputElement, suggestionsElement, setLocation) {
    inputElement.addEventListener('input', (event) => {
        const query = event.target.value;

        if (query.length < 3) {
            suggestionsElement.innerHTML = '';
            suggestionsElement.classList.remove('active');
            return;
        }

        tt.services.fuzzySearch({
                key: 'ZUPTa4pAyMBVSiucNojSQx84q9u7PIw4',
                query: query,
                countrySet: 'CA'
            })
            .then((response) => {
                suggestionsElement.innerHTML = '';

                response.results.forEach((result) => {
                    const suggestion = document.createElement('div');
                    let displayText = result.address.freeformAddress;
                    if (result.poi && result.poi.name) {
                        displayText = result.poi.name + ', ' + displayText;
                    }
                    suggestion.textContent = displayText;
                    suggestion.addEventListener('click', () => {
                        inputElement.value = displayText;
                        suggestionsElement.innerHTML = '';
                        suggestionsElement.classList.remove('active');
                        setLocation(result.position);
                    });

                    suggestionsElement.appendChild(suggestion);
                });

                if (response.results.length > 0) {
                    suggestionsElement.classList.add('active');
                } else {
                    suggestionsElement.classList.remove('active');
                }
            });
    });

    document.addEventListener('click', (event) => {
        if (event.target !== inputElement) {
            suggestionsElement.innerHTML = '';
            suggestionsElement.classList.remove('active');
        }
    });
}

let map = tt.map({
    key: 'ZUPTa4pAyMBVSiucNojSQx84q9u7PIw4',
    container: 'map',
    center: [-122.9046, 49.1949],
    zoom: 9
});

let map1 = tt.map({
    key: 'ZUPTa4pAyMBVSiucNojSQx84q9u7PIw4',
    container: 'map1',
    center: [-122.9046, 49.1949],
    zoom: 9
});
console.log(map1);

function drawRoute(from, to) {
    tt.services.calculateRoute({
            key: 'ZUPTa4pAyMBVSiucNojSQx84q9u7PIw4',
            traffic: false,
            locations: [from, to]
        })
        .then((response) => {
            const geojson = response.toGeoJson();
            if (map.getSource('route')) {
                map.getSource('route').setData(geojson);
                map1.getSource('route').setData(geojson);
            } else {
                map.addSource('route', {
                    type: 'geojson',
                    data: geojson
                });
                map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: 'route',
                    paint: {
                        'line-color': 'gray',
                        'line-width': 3
                    }
                });

                map1.addSource('route', {
                    type: 'geojson',
                    data: geojson
                });
                map1.addLayer({
                    id: 'route',
                    type: 'line',
                    source: 'route',
                    paint: {
                        'line-color': 'gray',
                        'line-width': 3
                    }
                });
            }

            // Zoom to fit the route on the map
            const coordinates = geojson.features[0].geometry.coordinates;
            const bounds = coordinates.reduce((bounds, coord) => {
                return bounds.extend(coord);
            }, new tt.LngLatBounds(coordinates[0], coordinates[0]));
            map.fitBounds(bounds, {
                padding: 30
            });

            map1.fitBounds(bounds, {
                padding: 30
            });


            // set the marker on the routing map
            addMarker(from, 'start-icon');
            addMarker(to, 'end-icon');
        })
        .catch((error) => {
            console.error('Error calculating the route:', error);
        });

}


//add start and end point icon to the routing map
function addMarker(position, iconClass) {
    const existingMarker = document.getElementById(iconClass);
    if (existingMarker) {
        existingMarker.remove();
    }

    const markerElement = document.createElement('div');
    markerElement.className = 'custom-icon ' + iconClass;
    markerElement.id = iconClass;

    new tt.Marker({
            element: markerElement
        })
        .setLngLat([position.lng, position.lat])
        .addTo(map);

        new tt.Marker({
            element: markerElement
        })
        .setLngLat([position.lng, position.lat])
        .addTo(map1);
}


function addBlueDotMarker(position) {
    const blueDotMarkerElement = document.createElement('div');
    blueDotMarkerElement.className = 'blue-dot-marker';

    const blueDotMarker = new tt.Marker({
      element: blueDotMarkerElement
    }).setLngLat([position.longitude, position.latitude]).addTo(map);

    return blueDotMarker;
  }


  function updateLocation(position) {
    const newPosition = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    };

    if (!blueDotMarker) {
      blueDotMarker = addBlueDotMarker(newPosition);
    } else {
      blueDotMarker.setLngLat([newPosition.longitude, newPosition.latitude]);
    }
  }


  let blueDotMarker;

  if ('geolocation' in navigator) {
    const watchOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.watchPosition(updateLocation, (error) => {
      console.error('Error watching position:', error);
    }, watchOptions);
  } else {
    console.error('Geolocation not available');
  }


//switch button hover or click action
const switchButton = document.getElementById("switch-button");
const switchButtonImage = switchButton.querySelector("img");

switchButton.addEventListener("mouseover", () => {
    switchButtonImage.src = "/ride-along/rider-details2.0/icon/Group 1509-blue.svg";
});

switchButton.addEventListener("mouseout", () => {
    switchButtonImage.src = "/ride-along/rider-details2.0/icon/Group 1509-gray.svg";
});

switchButton.addEventListener("click", () => {
    switchButtonImage.src = "/ride-along/rider-details2.0/icon/Group 1509-blue.svg";
    const fromLocationInput = document.getElementById("fromlocation");
    const toLocationInput = document.getElementById("tolocation");

    // Swap the input values
    const tempLocation = fromLocationInput.value;
    fromLocationInput.value = toLocationInput.value;
    toLocationInput.value = tempLocation;

    const tempPosition = fromLocation;
    fromLocation = toLocation;
    toLocation = tempPosition;

    // Redraw the route 
    if (fromLocation && toLocation) {
        drawRoute(fromLocation, toLocation);
    }
});