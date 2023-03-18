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

// Retrieve the tripsubmit array from the Firebase document
docRef.get().then((doc) => {
    if (doc.exists) {
        let data = doc.data();
        let tripArray = data.tripsubmit;
        
        // Iterate through the tripArray and create available-driver-cards elements
        tripArray.forEach((trip) => {
            // Create a new available-driver-cards element
            let card = document.createElement("div");
            card.className = "available-driver-cards";

            // Create ride-time element
            let rideTime = document.createElement("div");
            rideTime.id = "ride-time";
            rideTime.innerText = `${trip.date} ${trip.time}`; // Assuming trip object has date and time properties
            card.appendChild(rideTime);

            // Create from-to-search element
            let fromToSearch = document.createElement("div");
            fromToSearch.className = "from-to-search";
            
            let inputbox = document.createElement("div");
            inputbox.className = "inputbox";
            
            let fromLocation = document.createElement("input");
            fromLocation.type = "text";
            fromLocation.id = "fromlocation";
            fromLocation.value = trip.fromlocation; // Assuming trip object has fromlocation property
            
            let toLocation = document.createElement("input");
            toLocation.type = "text";
            toLocation.id = "tolocation";
            toLocation.value = trip.tolocation; // Assuming trip object has tolocation property
            
            inputbox.appendChild(fromLocation);
            inputbox.appendChild(toLocation);
            fromToSearch.appendChild(inputbox);
            card.appendChild(fromToSearch);

            // Create driver-info element
            let driverInfo = document.createElement("div");
            driverInfo.className = "driver-info";
            
            let driverPhoto = document.createElement("img");
            driverPhoto.id = "driver-photo";
            driverPhoto.src = trip.driver_photo; // Assuming trip object has driver_photo property
            
            let driverName = document.createElement("p");
            driverName.id = "driver-name";
            driverName.innerText = trip.driver_name; // Assuming trip object has driver_name property
            
            let driverProfile = document.createElement("div");
            driverProfile.className = "driver-profile";
            driverProfile.innerText = "Profile";
            
            driverInfo.appendChild(driverPhoto);
            driverInfo.appendChild(driverName);
            driverInfo.appendChild(driverProfile);
            card.appendChild(driverInfo);

            // Create startRide1 button element
            let startRide1 = document.createElement("button");
            startRide1.id = "startRide1";
            card.appendChild(startRide1);

            // Append the available-driver-cards element to the rider-page5 container
            document.getElementById("rider-page5").appendChild(card);
        });
    } else {
        console.error("Document not found");
    }
}).catch((error) => {
    console.error("Error getting document:", error);
});
