import { OrderByDirection, QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc, endAt, endBefore, getDoc, getDocs, getFirestore, limit, onSnapshot, orderBy, query, setDoc, startAfter, updateDoc, where } from "firebase/firestore";
import { app } from "../firebase/firebase.config";
import { currentDate, currentMonth, currentYear } from "../dates/date";

const db = getFirestore(app)
const YEAR_MONTH = `${currentMonth()}-${currentYear()}/${currentMonth()}-${currentYear()}`
const YEARMONTH = `${currentMonth()}-${currentYear()}`
const FECHA = `${currentDate()}`
const MES = `${currentMonth()}`

export const dataToStatistics = async (dispatch:(action:any)=>void) => {
  const pathToCreateNewData = `/statistics/${YEAR_MONTH}`
  const createNewDataRef = doc(db, `/statistics/${YEAR_MONTH}/`,`${FECHA}`)
  const docSnap = await getDoc(createNewDataRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    await setDoc(doc(db, pathToCreateNewData, `${FECHA}`), {dailySales: 0, tickets:0});
  }
  const statisticsRef = collection(db, `/statistics/${YEAR_MONTH}`)
  const queryStatistics = await getDocs(statisticsRef)
  const dataFromStatistics: GeneralStatisticsPerDay[] = []
  if (queryStatistics.size === 0) {
    console.log(`no hay datos para el mes de ${MES}`)
  } else {
    // onSnapshot(statisticsRef,(querySnapshot) => {
    //   querySnapshot.docs.forEach((doc) => {
    //     dataFromStatistics.push({ ...doc.data(), date: Number(doc.id) })

    //   })

    // })
    // console.log('dataFromStatistics',dataFromStatistics)
    queryStatistics.docs.forEach(monthData => {
      dataFromStatistics.push({ ...monthData.data(), date: Number(monthData.id) })
    })
    dataFromStatistics.sort((a, b) => {
      const fe = Number(a.date)
      const se = Number(b.date)
      if (fe > se) {
        return 1;
      }
      if (fe < se) {
        return -1;
      }
      return 0;
    })
    const rta = dataFromStatistics.map(dataPerday => {
      const tickets = Number(dataPerday.tickets)
      const sales = Number(dataPerday.dailySales)
      if(Number(dataPerday.tickets) === 0 && Number(dataPerday.dailySales) === 0){
        const averageTicket = 0
        dataPerday.averageTicket = averageTicket
      } else {
        const averageTicket: number = Number((sales / tickets).toFixed(2))
        dataPerday.averageTicket = averageTicket
      }
    })
    if (rta) {
      // let growthAverageTicket:number
      dataFromStatistics.map((dataPerday, index) => {
        if (index === 0) {
          console.log('esta data no tendra crecimiento')
        } else {
          const growthTicket = (((Number(dataPerday.tickets) / Number(dataFromStatistics[index - 1].tickets)) - 1) * 100).toFixed(2)
          const growthSales = (((Number(dataPerday.dailySales) / Number(dataFromStatistics[index - 1].dailySales)) - 1) * 100).toFixed(2)
          const growthAverageTicket = Number((((Number(dataPerday.averageTicket) / Number(dataFromStatistics[index - 1].averageTicket)) - 1) * 100).toFixed(2))

          // if(Number(dataPerday.dailySales === 0) && Number(dataPerday.tickets)){
          //   growthAverageTicket = 0
          // }else {
          // }
          // dataPerday = { ...dataPerday, growthTicket: growthTicket, growthSales: growthSales, growthAverageTicket: growthAverageTicket }
          dataPerday.growthTicket = Number(growthTicket)
          dataPerday.growthSales = Number(growthSales)
          dataPerday.growthAverageTicket = Number(growthAverageTicket)
        }
      })
      dispatch({type:"dataStatistics", payload:dataFromStatistics})
      dispatch({type:"loader", payload:false})
    }
  }

}