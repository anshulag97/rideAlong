
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getStorage , ref , uploadBytes } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
import { getFirestore , collection ,setDoc,doc, addDoc} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"

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
const storage =  getStorage();

const urlSearchParams = new URLSearchParams(window.location.search);
const document_id = urlSearchParams.get('doc-id');
console.log(document_id);

const upload = document.getElementById('uploadPicture');
const imageInput = document.getElementById('imageInput');
const dataURL = "";
upload.addEventListener('click',(event)=>{
    event.preventDefault();
    const file = imageInput.files[0];  
    let name = document_id+'id.png';
    if (file && file.type.match('image.*')) {
      const imageRef = ref(storage , `id/${name}`);
      uploadBytes(imageRef , file ).then(async function(snapshot) {
        console.log('Uploaded image:', snapshot.metadata.fullPath);
          alert("Image uploaded successfully.");
          window.location.href = `./profile-completed.html?doc-id=${document_id}`;
      }).catch(function(error) {
        console.error('Error uploading image:', error);
      });
    } else {
      console.log('Invalid file selected');
    } 
  });