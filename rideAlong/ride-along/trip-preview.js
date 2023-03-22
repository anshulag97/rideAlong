import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getStorage,
  uploadBytes,
  getMetadata,
  ref,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
import {
  getFirestore,
  getDoc,
  getDocs,
  setDoc,
  collection,
  doc,
  addDoc,
  query,
  where
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

let fromLocationInput = "";
let toLocationInput = "";
  
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

  fromLocationInput = dataDriver.trip_details.origin_detail;
  toLocationInput = dataDriver.trip_details.destination_detail;
  div.innerHTML = `

  <div class='btns'>

    <input type="submit" id="start-ride" value="Start Ride" >
   <input type="submit" id="end-ride" value="End Ride" disabled></input>
  
   </div>

    <h2> Trip Details</h2>

    <p class='time'>Date: ${dataDriver.trip_details.date}</p>
    <p class='time'>Time: ${dataDriver.trip_details.time}</p>
    <div class='enter-location'>
      <div class="fromLocation">${dataDriver.trip_details.origin_detail}</div>
      <div class="toLocation">${dataDriver.trip_details.destination_detail}</div>
    </div>

    <div class='details'>
      <h2> Driver Details</h2>

      <div class="rider-detailss">
        <img id="image-driver" src="${link}" alt="" style="height:100px">
          <div class="rider-info">
              <p class="name">${dataDriver.name}</p>
              <div class="misc-details">
                  <p class="luggage">Luggage: ${dataDriver.trip_details.luggage}</p>
                  <p class="passengers">Passenger(s): ${dataDriver.trip_details.passengers}</p>
                  <p class="pets">Pets: ${dataDriver.trip_details.pet}</p>
              </div>
          </div>
      </div>
      </div>
    

    
      <div class='details'>   
      <h2> Rider Details</h2>

      <div class="rider-detailss">
        <img id="image-rider" src="${link}" alt="" style="height:100px">
          <div class="rider-info">
              <p class="name">${dataRider.name}</p>
          </div>
        </div>
        </div>
    


    
  
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

  div.innerHTML = `
  <input type="submit" id="sos" value="SOS" >
  `;

  tripPreview.insertBefore(div, trip_details);

  const sos = document.getElementById('sos');
  sos.addEventListener('click', (e)=>{
    e.preventDefault();
    console.log("SOS Clicked");
    const emergencyNumber = "+1-6047796246";
    window.open("tel:" + emergencyNumber);
  });

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
});


console.log(fromLocationInput);
console.log(toLocationInput);
const key = "ZUPTa4pAyMBVSiucNojSQx84q9u7PIw4";
let fromLocation = "";
let toLocation = "";

fetch(`https://api.tomtom.com/search/2/geocode/${encodeURIComponent(fromLocationInput)}.json?key=${key}`)
  .then(response => response.json())
  .then(data => {
    // extract the latitude and longitude from the API response
    console.log("POSITION");
    fromLocation = data.results[0].position;
    console.log(fromLocation);
    if (fromLocation && toLocation) {
      drawRoute(fromLocation, toLocation);
  }
  })
  .catch(error => console.error(error));


  fetch(`https://api.tomtom.com/search/2/geocode/${encodeURIComponent(toLocationInput)}.json?key=${key}`)
  .then(response => response.json())
  .then(data => {
    // extract the latitude and longitude from the API response
    console.log("POSITION");
    toLocation = data.results[0].position;
    console.log(toLocation);
    if (fromLocation && toLocation) {
      drawRoute(fromLocation, toLocation);
  }
  })
  .catch(error => console.error(error));


let map = tt.map({
  key: 'ZUPTa4pAyMBVSiucNojSQx84q9u7PIw4',
  container: 'map',
  center: [-122.9046, 49.1949],
  zoom: 9
});


function drawRoute(from, to) {
  console.log(from);
  console.log(to);
  tt.services.calculateRoute({
          key: 'ZUPTa4pAyMBVSiucNojSQx84q9u7PIw4',
          traffic: false,
          locations: [from, to]
      })
      .then((response) => {
          const geojson = response.toGeoJson();
          if (map.getSource('route')) {
              map.getSource('route').setData(geojson);
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
          }

          // Zoom to fit the route on the map
          const coordinates = geojson.features[0].geometry.coordinates;
          const bounds = coordinates.reduce((bounds, coord) => {
              return bounds.extend(coord);
          }, new tt.LngLatBounds(coordinates[0], coordinates[0]));
          map.fitBounds(bounds, {
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
}

// //switch button hover or click action
// const switchButton = document.getElementById("switch-button");
// const switchButtonImage = switchButton.querySelector("img");

// switchButton.addEventListener("mouseover", () => {
//     switchButtonImage.src = "/ride-along/rider-details2.0/icon/Group 1509-blue.svg";
// });

// switchButton.addEventListener("mouseout", () => {
//     switchButtonImage.src = "/ride-along/rider-details2.0/icon/Group 1509-gray.svg";
// });

// switchButton.addEventListener("click", () => {
//     switchButtonImage.src = "/ride-along/rider-details2.0/icon/Group 1509-blue.svg";
//     const fromLocationInput = document.getElementById("fromlocation");
//     const toLocationInput = document.getElementById("tolocation");

//     // Swap the input values
//     const tempLocation = fromLocationInput.value;
//     fromLocationInput.value = toLocationInput.value;
//     toLocationInput.value = tempLocation;

//     const tempPosition = fromLocation;
//     fromLocation = toLocation;
//     toLocation = tempPosition;

//     // Redraw the route 
//     if (fromLocation && toLocation) {
//         drawRoute(fromLocation, toLocation);
//     }
// });
