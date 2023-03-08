import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getStorage ,getMetadata, ref , getDownloadURL,  uploadBytes } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
import { getFirestore , collection , addDoc} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"

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
const link= "";

const storageRef = ref(storage , 'images/klJjwnJ9QBYPhm8lkQNTimage.png');
// console.log(storageRef);
const image = document.getElementById('image');
console.log("hell")
getDownloadURL(storageRef)
  .then((url) => {

    getMetadata(storageRef)
  .then((metadata) => {
    const data = JSON.parse(metadata.customMetadata.metadata);
       const link = data.link;
       image.setAttribute('src' , link);

    })
  .catch((error) => {
    // Uh-oh, an error occurred!
  });
     
  })
  .catch((error) => {
    console.error(error);
  });