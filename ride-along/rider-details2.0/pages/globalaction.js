

// action on menu button
const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');

menuButton.addEventListener('click', function () {
    menu.classList.toggle('visible');
})


// action on back button
const backButton = document.getElementById('back-button');
if (backButton) {
  backButton.addEventListener('click', () => {
    history.go(-1);
  });
}


function displayNotification() {
  const notificationDot = document.createElement('span');
  notificationDot.style.position = 'absolute';
  notificationDot.style.top = '8px';
  notificationDot.style.right = '15px';
  notificationDot.style.width = '10px';
  notificationDot.style.height = '10px';
  notificationDot.style.borderRadius = '50%';
  notificationDot.style.backgroundColor = 'red';
  menuButton.appendChild(notificationDot);

  const requestMenuItem = document.getElementById('requestLi');
  if (requestMenuItem) {
    requestMenuItem.classList.add('red-background', 'blink');
  }
}

db.collection('driver-details').doc(document_id).onSnapshot((driverDoc) => {
  if (driverDoc.exists) {
      let driverData = driverDoc.data();
      if (driverData.trip_details) {
          driverData.trip_details.forEach((trip) => {
              if (trip.applications && trip.applications.length > 0) {
                  trip.applications.forEach((application) => {
                      if (application.application_status === 'pending') {
                          displayNotification();
                      }
                  });
              }
          });
      }
  } else {
      console.error("Driver document not found");
  }
});



