
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


//when date and time has been selected, the background color changes
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");

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

//everything must be checked before click the submit button
const fromLocationInput = document.getElementById('fromlocation');
const toLocationInput = document.getElementById('tolocation');
const riderPostRideSubmit = document.getElementById("rider-post-ride-submit");
const petChecked = document.getElementById("pets");

function updateSubmitButton() {
    if (
        fromLocationInput.value &&
        toLocationInput.value &&
        dateInput.value &&
        timeInput.value &&
        luggageNum.value &&
        passengerNum.value
    ) {
        riderPostRideSubmit.style.backgroundColor = "rgb(95, 105, 255)";
        riderPostRideSubmit.classList.add("enabled");
        riderPostRideSubmit.disabled = false;
    } else {
        riderPostRideSubmit.style.backgroundColor = "gray";
        riderPostRideSubmit.classList.remove("enabled");
        riderPostRideSubmit.disabled = true;
    }
}


fromLocationInput.addEventListener("input", updateSubmitButton);
toLocationInput.addEventListener("input", updateSubmitButton);
dateInput.addEventListener("change", updateSubmitButton);
timeInput.addEventListener("change", updateSubmitButton);
luggageNum.addEventListener("input", updateSubmitButton);
passengerNum.addEventListener("input", updateSubmitButton);

updateSubmitButton();



let arrTemp = [];

riderPostRideSubmit.addEventListener("click", function () {
    if (!riderPostRideSubmit.disabled) {
        const tempObj = {
            fromLocation: fromLocation.position,
            toLocation: toLocation.position,
            fromLocationAddress: fromLocation.displayText,
            toLocationAddress: toLocation.displayText,
            date: dateInput.value,
            time: timeInput.value,
            luggageNum: luggageNum.value,
            passengerNum: passengerNum.value,
            petChecked: petChecked.checked
        };

        arrTemp.push(tempObj);

        console.log(arrTemp);

        const docRef = firebase.firestore().doc(`rider-details/${document_id}`);

        docRef.update({
            trip_details: arrayUnion(tempObj)
        }).then(() => {
            console.log('Trip details updated');
            window.location.href = `../page3/page3.html?doc-id=${document_id}`;
        }).catch((error) => {
            console.error('Error', error);
        });

    }
});



//start and end point search
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
    });
});

let fromLocation = null;
let toLocation = null;
let fromLocationAddress = null;
let toLocationAddress = null;

function handleLocationInput(inputElement, suggestionsElement, setLocation, setAddress = () => {}) {
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
                        setLocation({ displayText: displayText, position: result.position });
                        setAddress(displayText); 
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
});