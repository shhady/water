/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import MyNotification from './MyNotification'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//  web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFF_tzKs99-E2WvmZCSKjiP-NXrhpO9AA",
  authDomain: "i-jet-hydarant.firebaseapp.com",
  projectId: "i-jet-hydarant",
  storageBucket: "i-jet-hydarant.appspot.com",
  messagingSenderId: "973141484366",
  appId: "1:973141484366:web:1cc703b306f5601804741f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

/**
 * Uploads an image to firebase storage and returns the download url.           
 * @param {File} file - the file to upload           
 * @param {string} library - the name of the library to upload to           
 * @param {Function} Callback - the callback function to call when the upload is complete.           
 * @returns None           
 */
export const uploadImage = (file,library,Callback) => {
  if (file == null) return;
    if (file.size > 1048576)
      {
        MyNotification('darkblue',"שגיאה בהעלת קובץ","קובץ גדול מדיי ,\n ניתן להעלות עד 1MB")
        return
      }
    const imageRef = ref(storage, `${window.location.hostname}/images/${library}/${file.name +'_'+ v4()}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(url => {
        Callback(url);
      })
    }).catch((err)=>{
      MyNotification('red',"שגיאה בהעלת קובץ",`שגיאה: ${err}`)

    })
  }

