import {
   collection,
   addDoc,
   getDocs,
   updateDoc,
   doc,
   query,
   where,
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
   updateData: async (collec, document, dataUpdate) => {
      const ref = doc(db, collec, document);
      try {
         await updateDoc(ref, dataUpdate);
         return true;
      } catch (error) {
         return error;
      }
   },
};
export default cloudFireStore;
