import {
   getAuth,
   signInWithEmailAndPassword,
   createUserWithEmailAndPassword,
   signOut,
   updatePassword,
   sendPasswordResetEmail,
} from "firebase/auth";

const auth = getAuth();

const AuthFireBase = {
   Login: async (email, password) => {
      const login = await signInWithEmailAndPassword(auth, email, password);
      return login;
   },
   SignIn: async (email, password) => {
      const signIn = await createUserWithEmailAndPassword(
         auth,
         email,
         password
      );
      return signIn;
   },
   SignOut: async () => {
      const signout = await signOut(auth);
      return signout;
   },
   updatePassword: (newPassword) => {
      const user = auth.currentUser;
      return updatePassword(user, newPassword);
   },
   reserPassword: (email) => {
      return sendPasswordResetEmail(auth, email);
   },
};

export default AuthFireBase;
