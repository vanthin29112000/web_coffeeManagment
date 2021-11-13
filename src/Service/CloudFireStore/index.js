import {
   collection,
   addDoc,
   getDocs,
   updateDoc,
   doc,
   query,
   where,
   setDoc,
   arrayUnion,
   getDoc,
} from "firebase/firestore";
import { db } from "../Firebase";

const cloudFireStore = {
   addData: async (data, doc) => {
      try {
         const docRef = await addDoc(collection(db, doc), data);
         return docRef.id;
      } catch (error) {
         return error;
      }
   },
   addDataId: async (id, data, document) => {
      console.log(id, data, document);
      const temp = await setDoc(doc(db, document, id), data);
      console.log("thìn");
      return temp;
   },
   getAllData: async (doc) => {
      try {
         const querySnapshot = await getDocs(collection(db, doc));
         return querySnapshot;
      } catch (error) {
         return error;
      }
   },
   getDataWithCondition: async (collec, objectKey, objectValue) => {
      const q = query(
         collection(db, collec),
         where(objectKey, "==", objectValue)
      );

      try {
         const querySnapshot = await getDocs(q);
         return querySnapshot;
      } catch (error) {
         return error;
      }
   },
   getDataId: async (document, id) => {
      const docRef = doc(db, document, id);
      try {
         const docSnap = await getDoc(docRef);

         if (docSnap.exists()) {
            return docSnap.data();
         } else {
            return false;
         }
      } catch (error) {
         return error;
      }
   },
   updateData: async (collec, document, dataUpdate) => {
      console.log(collec, document, dataUpdate);
      const ref = doc(db, collec, document);
      try {
         await updateDoc(ref, dataUpdate);
         return true;
      } catch (error) {
         return error;
      }
   },
   addDataArray: async (collect, document, dataUpdate, object) => {
      const ref = doc(db, collect, document);
      await updateDoc(ref, {
         [object]: arrayUnion(dataUpdate),
      });
   },
};
export default cloudFireStore;
