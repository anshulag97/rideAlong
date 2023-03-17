
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getStorage , ref , uploadBytes } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
import { getFirestore , collection ,setDoc,doc, getDoc} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"

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
const ename = document.getElementById('ename').value;
const ephone = document.getElementById('ephone').value;
const submit = document.getElementById('submit');
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
      }).catch(function(error) {
        console.error('Error uploading image:', error);
      });
    } else {
      console.log('Invalid file selected');
    } 
  });

submit.addEventListener('click', async (e)=>{

  e.preventDefault();
  const docRef = doc(db, "driver-details", document_id);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
  console.log("In driver");
  await setDoc(doc(db,"driver-details",document_id),{
    emergency_details: {
        name: ename,
        phone: ephone,
    }    
        },{
        merge: true
    })
}
else{
  console.log("In rider");
  await setDoc(doc(db,"rider-details",document_id),{
    emergency_details: {
      name: ename,
      phone: ephone,
  }    
        },{
        merge: true
    })
}

window.location.href = `./profile-completed.html?doc-id=${document_id}`;
})
  