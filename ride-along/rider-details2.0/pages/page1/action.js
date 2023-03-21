
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


const urlSearchParams = new URLSearchParams(window.location.search);
const document_id = urlSearchParams.get('doc-id');

const offerRideButton = document.getElementById("offerRidebutton");
const findRideButton = document.getElementById("findRidebutton");

findRideButton.addEventListener("click", () => {
  window.location.href = `../page2/page2.html?doc-id=${document_id}`;
});

offerRideButton.addEventListener('click', (e) => {
  e.preventDefault();
  console.log("OFFER");

  const docRef = db.collection("driver-details").doc(document_id);
  docRef.get().then((documentData) => {
    if (documentData.exists) {
      const isDriver = documentData.get('is_Driver');
      console.log(`The driver for document ${document_id} is ${isDriver}`);
      window.location.href = `/ride-along/driver-details/pages/page2/page2.html?doc-id=${document_id}`
    } else {
      console.log(`No driver details found with ID ${document_id}`);
      alert("Please Login as Driver");
    }
  }).catch((error) => {
    console.error("Error getting document:", error);
  });
});