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
    tripData.driver_id = driverId;
    // tripData.driver_review = driverData.review

}

const requestRide2 = document.getElementById("requestRide2");

requestRide2.addEventListener("click", () => {
    docRef.get().then((doc) => {
        if (doc.exists) {
            let data = doc.data();
            if (!data.tripsubmit) {
                data.tripsubmit = [];
            }
            
            data.tripsubmit.push(tripData);

            docRef.update({ tripsubmit: data.tripsubmit })
                .then(() => {
                    console.log("Trip data submitted.");
                    // Fetch rider's name from rider_details collection
                    db.collection('rider-details').doc(document_id).get().then((riderDoc) => {
                        if (riderDoc.exists) {
                            const riderName = riderDoc.data().name;

                            // Update driver-details collection
                            const driverRef = db.collection('driver-details').doc(driverId);
                            driverRef.get().then((driverDoc) => {
                                if (driverDoc.exists) {
                                    let driverData = driverDoc.data();
                                    if (!driverData.trip_details) {
                                        console.error("No trip_details array found in driver-details collection.");
                                        return;
                                    }

                                    let tripUpdated = false;
                                    for (let index = 0; index < driverData.trip_details.length; index++) {
                                        const trip = driverData.trip_details[index];
                                        if (trip.fromLocationAddress === tripData.fromLocationAddress &&
                                            trip.toLocationAddress === tripData.toLocationAddress &&
                                            trip.time === tripData.time &&
                                            trip.date === tripData.date) {
                                            let application = {
                                                riderId: document_id,
                                                riderName: riderName,
                                                application_status: 'pending'
                                            };
                
                                            if (!driverData.trip_details[index].applications) {
                                                driverData.trip_details[index].applications = [];
                                            }
                
                                            driverData.trip_details[index].applications.push(application);
                                            tripUpdated = true;
                                        }
                                    }

                                    if (!tripUpdated) {
                                        console.error("No matching trip found.");
                                        return;
                                    }

                                    driverRef.update({ trip_details: driverData.trip_details })
                                        .then(() => {
                                            console.log("Trip application updated in driver-details collection.");
                                        })
                                        .catch((error) => {
                                            console.error("Error updating trip application in driver-details collection:", error);
                                        });
                                } else {
                                    console.error("Driver document not found");
                                }
                            }).catch((error) => {
                                console.error("Error getting driver document:", error);
                            });

                        } else {
                            console.error("Rider document not found");
                        }
                    }).catch((error) => {
                        console.error("Error getting rider document:", error);
                    });

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
