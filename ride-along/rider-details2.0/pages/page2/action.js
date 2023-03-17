
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
        riderPostRideSubmit.disabled = false;
    } else {
        riderPostRideSubmit.style.backgroundColor = "gray";
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
            fromLocation: fromLocationInput.value,
            toLocation: toLocationInput.value,
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
            console.log('Trip details updated successfully');
        }).catch((error) => {
            console.error('Error updating trip details:', error);
        });

        // window.location.href = `../page3/page3.html?doc-id=${document_id}`;
    }
});



//start and end point search and map routing 
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

    // Redraw the route 
    if (fromLocation && toLocation) {
        drawRoute(fromLocation, toLocation);
    }
});