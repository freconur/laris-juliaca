import { OrderByDirection, QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc, endAt, endBefore, getDoc, getDocs, getFirestore, increment, limit, onSnapshot, orderBy, query, setDoc, startAfter, updateDoc, where } from "firebase/firestore";
import { app } from "../firebase/firebase.config";
import { currentDate, currentMonth, currentYear } from "../dates/date";

const db = getFirestore(app)
const YEAR_MONTH = `${currentMonth()}-${currentYear()}/${currentMonth()}-${currentYear()}`
const yearMonth = `${currentMonth()}-${currentYear()}`

export const getUser = async(dispatch: (action: any) => void, id: string) => {
  console.log('id',id)

  const refUser = doc(db, 'users', id as string)
  const user = await getDoc(refUser)
  console.log('user',user.data())
  if(user.exists()) {
    dispatch({type:"getUser", payload:{
      lastname:user.data().lastname, 
      name:user.data().name, 
      rol:user.data().rol, 
      id:user.id,
      acc:user.data().acc,
      fechaNacimiento:user.data().fechaNacimiento,
      dni:user.data().dni,
      identifier:user.data().identifier
    }})
  }
}