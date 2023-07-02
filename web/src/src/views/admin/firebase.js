import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDPJvf2ig8Wb13PKr65X4CUp9j9g_tX1w",
  authDomain: "bsc-project-b263a.firebaseapp.com",
  projectId: "bsc-project-b263a",
  storageBucket: "bsc-project-b263a.appspot.com",
  messagingSenderId: "340980736830",
  appId: "1:340980736830:web:292c42b0ff187eb7df826f",
  measurementId: "G-GC957JH5FB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export async function uploadImageToFirebase(file) {
  const storage = getStorage(app);
  const uniqueName = uuidv4();
  const storageRef = ref(storage, uniqueName);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed',
      (snapshot) => {
        var progress = (snapshoot.bytesTransferred / snapshoot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done.')
      },
      (error) => {
        // Handle unsuccessful uploads
        reject(error);
      }, 
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
}
