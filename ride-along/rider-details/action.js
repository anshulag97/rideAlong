// action on menu button
const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');

menuButton.addEventListener('click', function () {
    menu.classList.toggle('visible');
})


// get the buttons and pages
const findRide = document.getElementById("findRidebutton");
const offerRideButton = document.getElementById("offerRidebutton");
const findrideButton = document.getElementById("rider-post-ride-submit");
const requestRide = document.querySelector(".requestRide");
const requestRide2 = document.getElementById("requestRide2");
const startRide1 = document.getElementById("startRide1");
const startRide2 = document.getElementById("startRide2");
const endRide = document.getElementById("endRide");
const endrideSubmit = document.getElementById("endrideSubmit");
const backButton1 = document.getElementById("back-button1");
const backButton2 = document.getElementById("back-button2");
const backButton3 = document.getElementById("back-button3");
const backButton4 = document.getElementById("back-button4");
const backButton5 = document.getElementById("back-button5");
const backButton6 = document.getElementById("back-button6");
const backButton7 = document.getElementById("back-button7");
const riderPage1 = document.getElementById("rider-page1");
const riderPage2 = document.getElementById("rider-page2");
const riderPage3 = document.getElementById("rider-page3");
const riderPage4 = document.getElementById("rider-page4");
const riderPage5 = document.getElementById("rider-page5");
const riderPage6 = document.getElementById("rider-page6");
const riderPage7 = document.getElementById("rider-page7");
const riderPage8 = document.getElementById("rider-page8");

// add click event listeners to the buttons
findRide.addEventListener("click", function () {
    riderPage1.classList.add("nonvisible");
    riderPage2.classList.remove("nonvisible");
    backButton1.classList.remove("visually-hidden");
});
findrideButton.addEventListener("click", function () {
    backButton1.classList.add("visually-hidden");
    backButton2.classList.remove("visually-hidden");
    riderPage2.classList.add("nonvisible");
    riderPage3.classList.remove("nonvisible");
    submitRideRequest();
});
requestRide.addEventListener("click", function () {
    riderPage3.classList.add("nonvisible");
    riderPage4.classList.remove("nonvisible");
    backButton2.classList.add("visually-hidden");
    backButton3.classList.remove("visually-hidden");
});
requestRide2.addEventListener("click", function () {
    riderPage4.classList.add("nonvisible");
    riderPage5.classList.remove("nonvisible");
    backButton3.classList.add("visually-hidden");
    backButton4.classList.remove("visually-hidden");
});
startRide1.addEventListener("click", function () {
    riderPage5.classList.add("nonvisible");
    riderPage6.classList.remove("nonvisible");
    backButton4.classList.add("visually-hidden");
    backButton5.classList.remove("visually-hidden");
});
startRide2.addEventListener("click", function () {
    riderPage6.classList.add("nonvisible");
    riderPage7.classList.remove("nonvisible");
    backButton5.classList.add("visually-hidden");
    backButton6.classList.remove("visually-hidden");
    initMap();
});
endRide.addEventListener("click", function () {
    riderPage7.classList.add("nonvisible");
    riderPage8.classList.remove("nonvisible");
    backButton6.classList.add("visually-hidden");
    backButton7.classList.remove("visually-hidden");
});
endrideSubmit.addEventListener("click", function () {
    riderPage8.classList.add("nonvisible");
    riderPage1.classList.remove("nonvisible");
    backButton7.classList.add("visually-hidden");
});

backButton1.addEventListener("click", function () {
    riderPage1.classList.remove("nonvisible");
    riderPage2.classList.add("nonvisible");
    backButton1.classList.add("visually-hidden");
});
backButton2.addEventListener("click", function () {
    riderPage3.classList.add("nonvisible");
    riderPage2.classList.remove("nonvisible");
    backButton2.classList.add("visually-hidden");
    backButton1.classList.remove("visually-hidden");
});
backButton3.addEventListener("click", function () {
    riderPage4.classList.add("nonvisible");
    riderPage3.classList.remove("nonvisible");
    backButton3.classList.add("visually-hidden");
    backButton2.classList.remove("visually-hidden");
});
backButton4.addEventListener("click", function () {
    riderPage5.classList.add("nonvisible");
    riderPage4.classList.remove("nonvisible");
    backButton4.classList.add("visually-hidden");
    backButton3.classList.remove("visually-hidden");
});
backButton5.addEventListener("click", function () {
    riderPage6.classList.add("nonvisible");
    riderPage5.classList.remove("nonvisible");
    backButton5.classList.add("visually-hidden");
    backButton4.classList.remove("visually-hidden");
});
backButton6.addEventListener("click", function () {
    riderPage7.classList.add("nonvisible");
    riderPage6.classList.remove("nonvisible");
    backButton6.classList.add("visually-hidden");
    backButton5.classList.remove("visually-hidden");
});
backButton7.addEventListener("click", function () {
    riderPage8.classList.add("nonvisible");
    riderPage7.classList.remove("nonvisible");
    backButton7.classList.add("visually-hidden");
    backButton6.classList.remove("visually-hidden");
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


//show the map
window.addEventListener('load', () => {
    initMap();
});

function initMap() {
    let center = [4, 44.4]
    const map = tt.map({
        key: "ZUPTa4pAyMBVSiucNojSQx84q9u7PIw4",
        container: "map",
        center: center,
        zoom: 15
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(pos);

            const marker = new tt.Marker({
                position: pos,
                draggable: false,
                element: document.createElement('div.mapmarker')
            });

            marker.addTo(map);

        }, (error) => {
            console.log(error);
            if (error.code == error.PERMISSION_DENIED) {
                window.alert("geolocation permission denied");
            }
        });
    } else {
        window.alert = "This browser does not support geolocation";
    }
}


// get the find a ride requirements
let fromLocation = document.getElementById("fromlocation");
let toLocation = document.getElementById("tolocation");
let rideDate = document.getElementById("date");
let rideTime = document.getElementById("time");
let petChecked = document.getElementById("pets");
let requestrideArray = [];


// create city class
class Ride {
    constructor(fromLocation, toLocation, rideDate, rideTime, luggageNum, passengerNum, petChecked) {
        this.fromLocation = fromLocation;
        this.toLocation = toLocation;
        this.rideDate = rideDate;
        this.rideTime = rideTime;
        this.luggageNum = luggageNum;
        this.passengerNum = passengerNum;
        this.petChecked = petChecked
    }
}

function submitRideRequest() {
    const ride = new Ride(fromLocation.value, toLocation.value, rideDate.value, rideTime.value, luggageNum.value, passengerNum.value, petChecked.checked ? true : false);
    requestrideArray.push(ride);
    console.log(requestrideArray);
}