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

const fromLocationInput = document.getElementById('fromlocation');
const toLocationInput = document.getElementById('tolocation');
const submit = document.getElementById('submit');
submit.addEventListener('click',async(e)=>{
e.preventDefault();
const date = document.getElementById('date').value;
const time = document.getElementById('time').value;
const luggage = luggageNum.value;
const passengers = passengerNum.value;
const pet = document.getElementById('pets').checked;
const price = document.getElementById('price').value;
const description = document.getElementById('description').value;

console.log(document_id);

try {
  await setDoc(doc(db, "driver-details", document_id), {
    
      trip_details: {
        origin_detail: fromLocationInput.value,
        destination_detail: toLocationInput.value,
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
  alert("Ride Posted Successfully !");
    console.log("Document successfully updated!");
   } 
   catch (error) {
    console.error("Error updating document: ", error);
  }
});






document.addEventListener('DOMContentLoaded', () => {
  // console.log(origin);
  const fromLocationSuggestions = document.getElementById('fromlocation-suggestions');
  console.log(fromLocationSuggestions);
  console.log(fromLocationInput);
  handleLocationInput(fromLocationInput, fromLocationSuggestions, (position) => {
    console.log(position);  
    fromLocation = position;
      if (fromLocation && toLocation) {
          drawRoute(fromLocation, toLocation);
      }
  });

  const toLocationSuggestions = document.getElementById('tolocation-suggestions');
  handleLocationInput(toLocationInput, toLocationSuggestions, (position) => {
    console.log(position);  
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
console.log("executing");
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


//switch button hover or click action
const switchButton = document.getElementById("switch-button");

switchButton.addEventListener("click", (e) => {
  e.preventDefault();
  
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
