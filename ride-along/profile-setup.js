import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getStorage , ref , uploadBytes } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
import { getFirestore ,getDocs, setDoc, collection ,doc, addDoc} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
var storage =  getStorage(app);

//  console.log(storage);

const urlSearchParams = new URLSearchParams(window.location.search);
const user_id = urlSearchParams.get('id');
console.log(user_id);
let document_id="";
let querySnapshot = await getDocs(collection(db, 'driver-details'));
console.log(user_id);
querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
  if(doc.data().uid === user_id){
    document_id = doc.id.toString();
  }
});

if(document_id == ""){
  querySnapshot = await getDocs(collection(db, 'rider-details'));
console.log(user_id);
querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
  if(doc.data().uid === user_id){
    document_id = doc.id.toString();
  }
});
}
console.log(document_id);

    const capturedImg = document.getElementById("captured-img");
    const cameraFeed = document.getElementById('cameraFeed');
    const context = capturedImg.getContext('2d');
    context.scale(0.5, 0.5);
    document.getElementById("capture-btn").addEventListener("click", function () {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
        .then( (stream) => {
          cameraFeed.srcObject = stream;
        }).catch( (error) => {
            console.log("failed to get media stream", error);
        });
    
      } else {
        console.log("media devices not available in this browser");
      }
    });
    
    // Trigger photo take
    document.getElementById("snap-btn").addEventListener("click",  () => {
      context.drawImage(cameraFeed, 0, 0);
      document.getElementById("putImage").value = capturedImg.toDataURL();
    });
    

// UPLOAD IMAGE USING EXISTING IMAGE
const imageInput = document.getElementById('imageInput');
const upload = document.getElementById('uploadPicture');
upload.addEventListener('click',()=>{
    var file = imageInput.files[0];
    const dataURL = capturedImg.toDataURL();
    const mimeType = dataURL.split(';')[0].split(':')[1];
    const blob = new Blob([dataURL], { type: mimeType });
    blob.name = document_id+"image.png";
    console.log(blob.name);
    blob.id = user_id;

    const metadata = {
    link: dataURL,
    description: 'This is a description of my image'
};
const metadataStr = JSON.stringify(metadata);
    
    if(file == undefined){  
      file = blob;
    }

    if (file && file.type.match('image.*')) {
     console.log(file.name);
     let name = document_id+'image.png';
      const imageRef = ref(storage , `images/${name}`);
      uploadBytes(imageRef , file, { customMetadata: { metadata: metadataStr } }).then(async function(snapshot) {
        console.log('Uploaded image:', snapshot.metadata.fullPath);
        console.log("url ", dataURL);
        console.log(document_id);
          alert("Image uploaded successfully.");
          window.location.href = `./profile-setup-id.html?doc-id=${document_id}`;
        })
    } else {
      console.log('Invalid file selected');
    }
  });