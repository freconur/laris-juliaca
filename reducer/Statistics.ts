import { OrderByDirection, QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc, endAt, endBefore, getDoc, getDocs, getFirestore, limit, onSnapshot, orderBy, query, setDoc, startAfter, updateDoc, where } from "firebase/firestore";
import { app } from "../firebase/firebase.config";
import { currentDate, currentMonth, currentYear } from "../dates/date";

const db = getFirestore(app)
const YEAR_MONTH = `${currentMonth()}-${currentYear()}/${currentMonth()}-${currentYear()}`
const YEARMONTH = `${currentMonth()}-${currentYear()}`
const FECHA = `${currentDate()}`
const MES = `${currentMonth()}`
const PAYMENT_TYPE = "XXnuJEsytqLDBQ4PvSgc"

export const dataFromSalesProductosDeNavidad = async (dispatch: (action: any) => void) => {
  /////////////////////////FUNCIONALIDAD PERSONALIZADA DE PRODUCTOS NAVIDAD////////////////////
  //calculo de la ventas de productos navidenos//

  
  // console.log('arryaProducts0',arryaProducts[0])
  // console.log('arryaProducts1',arryaProducts[1])
  /////////////////////////FUNCIONALIDAD PERSONALIZADA DE PRODUCTOS NAVIDAD////////////////////
}

export const dataToStatistics = async (dispatch: (action: any) => void, dateData: DateData) => {

  const pathToCreateNewData = `/statistics/${YEAR_MONTH}`
  const createNewDataRef = doc(db, `/statistics/${YEAR_MONTH}/`, `${FECHA}`)
  const docSnap = await getDoc(createNewDataRef);
  const dataFromDay = doc(db, `statistics/${dateData.month}-${dateData.year}/${dateData.month}-${dateData.year}/`, `${dateData.date}`)
  const getTicketFromDay = await getDoc(dataFromDay)
  if (getTicketFromDay.exists()) {
    dispatch({ type: "dataOfTicketFromDay", payload: getTicketFromDay.data() })
  } else {
    await setDoc(doc(db, `statistics/${dateData.month}-${dateData.year}/${dateData.month}-${dateData.year}/`, `${dateData.date}`), { dailySales: 0, tickets: 0 })
      .then(r => {
        dispatch({ type: "dataOfTicketFromDay", payload: { dailySales: 0, tickets: 0 } })
      })
  }
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    await setDoc(doc(db, pathToCreateNewData, `${FECHA}`), { dailySales: 0, tickets: 0 });
  }
  const statisticsRef = collection(db, `/statistics/${dateData.month}-${dateData.year}/${dateData.month}-${dateData.year}`)
  const queryStatistics = await getDocs(statisticsRef)
  const dataFromStatistics: GeneralStatisticsPerDay[] = []
  const dataSalesLabel: string[] = []
  const dataSales: number[] = []
  let totalSalesPerMonth: number = 0
  if (queryStatistics.size === 0) {
    console.log(`no hay datos para el mes de ${MES}`)
  } else {
    queryStatistics.docs.forEach(dailyDayData => {
      dataFromStatistics.push({ ...dailyDayData.data(), date: Number(dailyDayData.id) })
      // console.log('dailyDayData.data()', dailyDayData.data())
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
      totalSalesPerMonth = totalSalesPerMonth + Number(dataPerday.dailySales)
      dataSalesLabel.push(`${dataPerday.date}`)
      // dataPerday.dailySales && dataSales.push(dataPerday.dailySales)
      dataSales.push(Number(dataPerday.dailySales))
      const tickets = Number(dataPerday.tickets)
      const sales = Number(dataPerday.dailySales)
      if (Number(dataPerday.tickets) === 0 && Number(dataPerday.dailySales) === 0) {
        console.log('estoy en otras')
        const averageTicket = 0
        dataPerday.averageTicket = averageTicket
      } else {
        const averageTicket: number = Number((sales / tickets).toFixed(2))
        console.log('sales',sales)
        console.log('tickets',tickets)
        console.log('averageTicket',averageTicket)
        dataPerday.averageTicket = averageTicket
      }
    })

    if (rta) {
      console.log('dataFromStatistics', dataFromStatistics)
      dataFromStatistics.map((dataPerday, index) => {
        if (index === 0) {
          console.log('esta data no tendra crecimiento')
        } else {

          if (dataPerday.dailySales === 0 && dataPerday.tickets === 0) {
            // dataPerday.growthTicket = 0
            dataPerday.growthSales = 0
            dataPerday.growthTicket = 0
            dataPerday.growthAverageTicket = 0
          } 
          if(Number(dataFromStatistics[index - 1].dailySales) === 0) {
            dataPerday.growthSales = 0
            dataPerday.growthTicket = 0
            dataPerday.growthAverageTicket = 0
          }else {
            const growthTicket = (((Number(dataPerday.tickets) / Number(dataFromStatistics[index - 1].tickets)) - 1) * 100).toFixed(2)
            const growthSales = (((Number(dataPerday.dailySales) / Number(dataFromStatistics[index - 1].dailySales)) - 1) * 100).toFixed(2)
            const growthAverageTicket = Number((((Number(dataPerday.averageTicket) / Number(dataFromStatistics[index - 1].averageTicket)) - 1) * 100).toFixed(2))
            dataPerday.growthSales = Number(growthSales)
            dataPerday.growthTicket = Number(growthTicket)
            dataPerday.growthAverageTicket = Number(growthAverageTicket)

          }
        }
      })
      dispatch({ type: "dataStatistics", payload: dataFromStatistics })
      dispatch({ type: "loader", payload: false })
      dispatch({ type: "dataSales", payload: dataSales })
      dispatch({ type: "dataSalesLabel", payload: dataSalesLabel })
      dispatch({ type: "dataTotalSalesPerMonth", payload: totalSalesPerMonth })


    }
  }
  /////////////////////////FUNCIONALIDAD PERSONALIZADA DE PRODUCTOS NAVIDAD////////////////////
  //calculo de la ventas de productos navidenos//

  let total = 0
  const getProductosDeNavidad = await getDocs(collection(db, `/productos-navidad/${dateData.month}-${dateData.year}/${dateData.date}`));
  const arryaProducts: ProductToCart[] = []
  getProductosDeNavidad.forEach((doc) => {
    arryaProducts.push(doc.data())
    total = total + Number(doc.data().amount) * Number(doc.data().price)
    dispatch({ type: "totalSalesFromProductsFromNavidad", payload: total })
  });
  
  /////////////////////////FUNCIONALIDAD PERSONALIZADA DE PRODUCTOS NAVIDAD////////////////////
}


export const getPaymentTypeDaily = async (dispatch: (action: any) => void, dateData: DateData) => {
  const paymentRef = doc(db, `/payment-type/${PAYMENT_TYPE}/${dateData.month}-${dateData.year}/`, `${dateData.date}`)
  onSnapshot(paymentRef, async (doc) => {
    dispatch({ type: "paymentDataToStadistics", payload: doc.data() })
  })
}