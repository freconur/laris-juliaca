import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { doc, getDoc, getFirestore } from "firebase/firestore";



const auth = getAuth(app);
const db = getFirestore(app)

export const User = async (dispatch: (action: any) => void, idUser: string) => {
  const userRef = doc(db, "users", idUser)
  const userQuery = await getDoc(userRef)

  if (userQuery.exists()) {
    dispatch({ type: "getDataUser", payload: userQuery.data() })
  }
}
export const loginWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider();
  const rta = signInWithPopup(auth, googleProvider)
    .then(r => {

    })
    .catch(r => console.log(r))
  if (rta) {
    console.log('rta', rta)
  }
}

export const signin = (userDate: UserData) => {
  if (userDate.user && userDate.password) {
    createUserWithEmailAndPassword(
      auth,
      userDate.user,
      userDate.password);
  }
};
export const loginWithEmail = (userDate: UserData) => {
  console.log("llegamos")
  const password = userDate.password
  if (userDate.user && userDate.password && password) {
    signInWithEmailAndPassword(
      auth,
      userDate.user,
      password
    )
  }

};