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

const docRef = firebase.firestore().doc(`rider-details/${document_id}`);

let map = tt.map({
    key: 'ZUPTa4pAyMBVSiucNojSQx84q9u7PIw4',
    container: 'map',
    center: [-122.9046, 49.1949],
    zoom: 9
});

docRef.get().then((doc) => {
    if (doc.exists) {

        const tripDetails = doc.data().trip_details;
        const lastTrip = tripDetails[tripDetails.length - 1];
        const fromLocationObj = lastTrip.fromLocation;
        const toLocationObj = lastTrip.toLocation;

        // Set the input values
        document.getElementById('fromlocation').value = lastTrip.fromLocationAddress;
        document.getElementById('tolocation').value = lastTrip.toLocationAddress;
        document.getElementById('date').value = lastTrip.date;
        document.getElementById('time').value = lastTrip.time;


        // draw the map
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


        db.collection('driver-details').get().then((querySnapshot) => {
            const matchingTrips = [];

            if (querySnapshot.empty) {
                console.log('No driver details found.');
            } else {
                querySnapshot.forEach((driverDoc) => {
                    const driverTripDetails = driverDoc.data().trip_details;
                
                    if (Array.isArray(driverTripDetails)) {
                        driverTripDetails.forEach((driverTrip, originalIndex) => { 
                
                            if (driverTrip.time === lastTrip.time &&
                                driverTrip.fromLocationAddress === lastTrip.fromLocationAddress &&
                                driverTrip.toLocationAddress === lastTrip.toLocationAddress) {
                                matchingTrips.push({
                                    trip: driverTrip,
                                    driverId: driverDoc.id,
                                    originalIndex: originalIndex 
                                });
                            }
                        });
                    }
                });
                

                console.log("Matching trips:", );
                
                matchingTrips.forEach((matchedTrip, originalIndex) => {
                    console.log("Original index in driver's trip details array:", matchedTrip.originalIndex);
                    const trip = matchedTrip.trip;
                    const driverId = matchedTrip.driverId;
                    const indexTrip = matchedTrip.originalIndex;
                    

                    if (driverId) {
                        db.collection('driver-details').doc(driverId).get().then((driverDoc) => {
                            if (driverDoc.exists) {
                                const driverData = driverDoc.data();
                                driverData.driverId = driverId;
                                console.log("Driver Data:", driverData);
                                const driverPhotoElement = createAvailableDriverCard(driverData, trip, indexTrip);
                                loadDriverPhoto(driverId, driverPhotoElement);
                            } else {}
                        }).catch((error) => {
                            console.error("Error getting document:", error);
                        });
                    } else {
                        console.log("No driver ID found in the trip");
                    }
                });
            }
        });


    }
})

function loadDriverPhoto(driverId, driverPhotoElement) {
    const photoRef = storage.ref(`images/${driverId}image.png`);
    photoRef
        .getDownloadURL()
        .then((photoURL) => {
            driverPhotoElement.src = photoURL;
        })
        .catch((error) => {
            console.error("Error loading driver photo:", error);
        });
}

//creating driver info card
function createAvailableDriverCard(driverData, trip, indexTrip) {
    console.log("Creating card for index:", indexTrip);
    const availableDriversContainer = document.getElementById('available-drivers-container');

    const card = document.createElement('div');
    card.className = 'available-driver-cards';

    const driverInfo = document.createElement('div');
    driverInfo.className = 'driver-info';
    card.appendChild(driverInfo)

    const driverPhotoElement = document.createElement('img');
    driverPhotoElement.className = 'driver-photo';
    driverInfo.appendChild(driverPhotoElement);

    const driverName = document.createElement('span');
    driverName.className = 'driver-name';
    driverName.textContent = driverData.name;
    driverInfo.appendChild(driverName);

    const rating = document.createElement('div');
    rating.className = 'rating';
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('span');
        star.className = 'fa fa-star';
        if (i < driverData.rating) {
            star.classList.add('checked');
        }
        rating.appendChild(star);
    }
    driverInfo.appendChild(rating);

    const driverPreference = document.createElement('div');
    driverPreference.className = 'driver-preference';
    if (trip.petChecked === true) {
        const petIcon = document.createElement('i');
        petIcon.className = 'fa-solid fa-dog';
        driverPreference.appendChild(petIcon);
    }
    if (trip.luggageAllow === true) {
        const luggageIcon = document.createElement('i');
        luggageIcon.className = 'fa-solid fa-suitcase';
        driverPreference.appendChild(luggageIcon);
    }
    if (trip.passengerNum > 1) {
        const groupIcon = document.createElement('i');
        groupIcon.className = 'fa-solid fa-user-group';
        driverPreference.appendChild(groupIcon);
    }
    card.appendChild(driverPreference);

    const riderFee = document.createElement('span');
    riderFee.className = 'rider-fee';
    riderFee.textContent = `$${trip.ridePrice}`;
    driverPreference.appendChild(riderFee);

    const selectButton = document.createElement('button');
    selectButton.className = 'select-driver-button';
    selectButton.textContent = 'Select';
    selectButton.addEventListener('click', () => {
        window.location.href = `../page4/page4.html?doc-id=${document_id}&driver-id=${driverData.driverId}&trip-index=${indexTrip}`;
    });
    card.appendChild(selectButton);

    availableDriversContainer.appendChild(card);
    return driverPhotoElement;
}




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