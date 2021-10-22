import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../Firebase";

const fileImg = {
   uploadFile: (file, nameFolder) => {
      return new Promise((resolve, reject) => {
         const storageRef = ref(storage, nameFolder + "/" + file.name);
         const uploadTask = uploadBytesResumable(storageRef, file);

         uploadTask.on(
            "state_changed",
            (snapshot) => {
               const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               console.log("Upload is " + progress + "% done");
               switch (snapshot.state) {
                  case "paused": {
                     console.log("Upload is paused");
                     break;
                  }
                  case "running":
                     console.log("Upload is running");
                     break;

                  default:
                     break;
               }
            },
            (error) => {
               reject(error);
            },
            () => {
               getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  resolve(downloadURL);
               });
            }
         );
      });
   },
   onGetURLFile: (path) => {
      return new Promise((resolve, reject) => {
         getDownloadURL(ref(storage, path))
            .then((url) => {
               resolve(url);
            })
            .catch((error) => {
               reject(error);
            });
      });
   },
};

export default fileImg;
