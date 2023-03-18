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

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const driverId = getParameterByName('driver-id');
const tripId = parseInt(getParameterByName('trip-index'));
console.log(tripId)

let driverData, tripData;

db.collection('driver-details').doc(driverId).get().then((driverDoc) => {
    if (driverDoc.exists) {
        driverData = driverDoc.data();
        console.log("Driver Data:", driverData);

        // Now, retrieve the trip data
        if (Array.isArray(driverData.trip_details) && driverData.trip_details[tripId]) {
            tripData = driverData.trip_details[tripId];
            carData = driverData.car_details
            console.log("Trip Data:", tripData);
            displayDriverAndTripInfo(carData, tripData);
        } else {
            console.error("Trip not found");
        }
    } else {
        console.error("Driver not found");
    }
}).catch((error) => {
    console.error("Error getting document:", error);
});

function displayDriverAndTripInfo(carData, tripData) {
    document.getElementById('fromlocation').value = tripData.fromLocationAddress;
    document.getElementById('tolocation').value = tripData.toLocationAddress;
    document.getElementById('date').value = tripData.date;
    document.getElementById('time').value = tripData.time;
    document.getElementById('passenger-number').value = tripData.passengerNum;
    document.getElementById('trip_description').textContent = tripData.tripDescription;
    document.getElementById('price').textContent = '$' + tripData.ridePrice;
    document.getElementById('car-name').textContent = carData.car_name;
    document.getElementById('car-number').textContent = carData.car_number;
    document.getElementById('car-color').textContent = carData.car_color;
    document.getElementById('pets').textContent = tripData.petChecked ? 'Allow' : 'Not Allow';
    document.getElementById('luggages').textContent = tripData.luggageAllow ? 'Allow' : 'Not Allow';
    tripData.car_name = carData.car_name;
    tripData.car_number = carData.car_number;
    // tripData.car_color = carData.car_color;
    tripData.driver_name = driverData.name;
    tripData.driver_uid = driverData.uid;
    // tripData.driver_review = driverData.review

}

const requestRide2 = document.getElementById("requestRide2");

requestRide2.addEventListener("click", () => {
    // Check if tripsubmit array exists in the document and create one if it doesn't
    docRef.get().then((doc) => {
        if (doc.exists) {
            let data = doc.data();
            if (!data.tripsubmit) {
                data.tripsubmit = [];
            }
            // Add tripData to the tripsubmit array
            data.tripsubmit.push(tripData);

            // Update the document with the new tripsubmit array
            docRef.update({ tripsubmit: data.tripsubmit })
                .then(() => {
                    console.log("Trip data submitted.");
                    window.location.href = `../page4/confirm.html?doc-id=${document_id}&driver-id=${driverData.driverId}&trip-index=${tripId}`;
                })
                .catch((error) => {
                    console.error("Error adding trip data to Firebase:", error);
                });
        } else {
            console.error("Document not found");
        }
    }).catch((error) => {
        console.error("Error getting document:", error);
    });
});
