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


const driverPage4 = document.getElementById('driver-page4');

db.collection('driver-details').doc(document_id).get().then((driverDoc) => {
    if (driverDoc.exists) {
        const driverData = driverDoc.data();
        if (driverData.trip_details) {
            driverData.trip_details.forEach((trip, tripIndex) => { 
                if (trip.applications && trip.applications.length > 0) {
                    trip.applications.forEach((application, applicationIndex) => { 
                        if (application.application_status === 'pending') {
                            const riderCard = createRiderCard(trip, application, tripIndex, applicationIndex);
                            driverPage4.appendChild(riderCard);
                        }
                    });
                }
            });
        }
    } else {
        console.error("Driver document not found");
    }
}).catch((error) => {
    console.error("Error getting document:", error);
});


function createRiderCard(trip, application, tripIndex, applicationIndex) {
    const riderCard = document.createElement('div');
    riderCard.classList.add('available-rider-cards');

    const rideTime = document.createElement('div');
    rideTime.id = 'ride-time';
    rideTime.textContent = trip.time;
    riderCard.appendChild(rideTime);

    const fromToSearch = document.createElement('div');
    fromToSearch.classList.add('from-to-search');
    const inputbox = document.createElement('div');
    inputbox.classList.add('inputbox');

    const fromLocation = document.createElement('input');
    fromLocation.type = 'text';
    fromLocation.id = 'fromlocation';
    fromLocation.value = trip.fromLocationAddress;
    inputbox.appendChild(fromLocation);

    const toLocation = document.createElement('input');
    toLocation.type = 'text';
    toLocation.id = 'tolocation';
    toLocation.value = trip.toLocationAddress;
    inputbox.appendChild(toLocation);

    fromToSearch.appendChild(inputbox);
    riderCard.appendChild(fromToSearch);

    const riderInfo = document.createElement('div');
    riderInfo.classList.add('rider-info');

    let riderPhoto = document.createElement("img");
    riderPhoto.id = "rider-photo";
    const riderId = application.riderId;
    loadRiderPhoto(riderId, riderPhoto);
    riderInfo.appendChild(riderPhoto);

    const riderName = document.createElement('p');
    riderName.id = 'rider-name';
    riderName.textContent = application.riderName;
    riderInfo.appendChild(riderName);

    const riderProfile = document.createElement('div');
    riderProfile.classList.add('rider-profile');
    riderProfile.textContent = 'Profile';
    riderInfo.appendChild(riderProfile);

    riderCard.appendChild(riderInfo);

    const declineButton = document.createElement('button');
    declineButton.id = 'decline';
    declineButton.textContent = 'Decline';
    riderCard.appendChild(declineButton);

    const acceptButton = document.createElement('button');
    acceptButton.id = 'accept';
    acceptButton.textContent = 'Accept';
    riderCard.appendChild(acceptButton);

    declineButton.addEventListener('click', () => {
        updateApplicationStatus('decline', tripIndex, applicationIndex);
    });

    acceptButton.addEventListener('click', () => {
        updateApplicationStatus('accept', tripIndex, applicationIndex);
    });

    return riderCard;
}


function loadRiderPhoto(riderId, riderPhoto) {
    const photoRef = storage.ref(`images/${riderId}image.png`);
    photoRef
        .getDownloadURL()
        .then((photoURL) => {
            riderPhoto.src = photoURL;
        })
        .catch((error) => {
            console.error("Error loading driver photo:", error);
        });
}

async function updateApplicationStatus(status, tripIndex, applicationIndex) {
    try {
      const driverDocRef = db.collection('driver-details').doc(document_id);
      const driverDocSnapshot = await driverDocRef.get();
      if (driverDocSnapshot.exists) {
        const tripDetails = driverDocSnapshot.data().trip_details;
        if (tripDetails[tripIndex] && tripDetails[tripIndex].applications) {
          tripDetails[tripIndex].applications[applicationIndex].application_status = status;
          await driverDocRef.update({
            trip_details: tripDetails
          });
          console.log(`Application status updated to "${status}"`);
        } else {
          console.error(`Error: tripDetails[${tripIndex}] or tripDetails[${tripIndex}].applications is undefined`);
        }
      } else {
        console.error('Driver document not found');
      }
    } catch (error) {
      console.error(`Error updating application status: ${error}`);
    }
}
