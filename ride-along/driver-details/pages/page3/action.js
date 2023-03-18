
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

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const arrayUnion = firebase.firestore.FieldValue.arrayUnion;


const urlSearchParams = new URLSearchParams(window.location.search);
const document_id = urlSearchParams.get('doc-id');

const docRef = firebase.firestore().doc(`driver-details/${document_id}`);

//loading the map with route
let map = tt.map({
    key: 'ZUPTa4pAyMBVSiucNojSQx84q9u7PIw4',
    container: 'map',
    center: [-122.9046, 49.1949],
    zoom: 9
});

docRef.get().then((doc) => {
    if (doc.exists) {

        const tripDetails = doc.data().trip_details;
        const driverName = doc.data().name;
        const lastTrip = tripDetails[tripDetails.length - 1];
        const fromLocationObj = lastTrip.fromLocation;
        const toLocationObj = lastTrip.toLocation;
        

        const ridePrice= document.getElementById('price');
        ridePrice.setAttribute('type', 'text');
        
        // Set the input values
        document.getElementById('fromlocation').value = lastTrip.fromLocationAddress;
        document.getElementById('tolocation').value = lastTrip.toLocationAddress;
        document.getElementById('date').value = lastTrip.date; 
        document.getElementById('time').value = lastTrip.time; 
        document.getElementById('seats').value = lastTrip.passengerNum + ' seats';
        document.getElementById('price').value = '$' + lastTrip.ridePrice + ' per seat';        
        document.getElementById('trip_description').value = lastTrip.tripDescription;
        document.getElementById('drivername').textContent = driverName;


        drawRoute(fromLocationObj, toLocationObj);

        function drawRoute(fromLocationObj, toLocationObj) {
            tt.services.calculateRoute({
                    key: 'ZUPTa4pAyMBVSiucNojSQx84q9u7PIw4',
                    traffic: false,
                    locations: [
                        [fromLocationObj.lng, fromLocationObj.lat],
                        [toLocationObj.lng, toLocationObj.lat]
                    ]
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
                    addMarker(fromLocationObj, 'start-icon');
                    addMarker(toLocationObj, 'end-icon');
                })
                .catch((error) => {
                    console.error('Error calculating the route:', error);
                });
        }
    }
})


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


//loading self photo from firebase
const driverPhoto = document.getElementById("driverphoto");

function loadDriverPhoto(photoId) {
    const photoRef = storage.ref(`images/${document_id}image.png`);
    photoRef
      .getDownloadURL()
      .then((photoURL) => {
        driverPhoto.src = photoURL;
      })
      .catch((error) => {
        console.error("Error loading driver photo:", error);
      });
  }


  loadDriverPhoto(document_id);



