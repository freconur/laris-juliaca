import { OrderByDirection, QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc, endAt, endBefore, getDoc, getDocs, getFirestore, increment, limit, onSnapshot, orderBy, query, setDoc, startAfter, updateDoc, where } from "firebase/firestore";
import { app } from "../firebase/firebase.config";
import { currentDate, currentMonth, currentYear } from "../dates/date";
import { sendNewTicket } from "../utils/printer";

const db = getFirestore(app)
const YEAR_MONTH = `${currentMonth()}-${currentYear()}/${currentMonth()}-${currentYear()}`
const yearMonth = `${currentMonth()}-${currentYear()}`


export const getAllProductsToRoe = async (dispatch: (action: any) => void) => {
  dispatch({ type: "loaderRoe", payload: true })

  const refProducts = collection(db, "products")
  const products = await getDocs(refProducts)
  const arrayProducts: TablaInventarios[] = []
  products.forEach((doc) => {
    const item: ProductToCart = doc.data()
    const cod = item.code as string
    const description = item.description as string
    const costoUnitario = Number(item.cost)
    const precioUnitario = Number(item.price)
    const gananciaUnitariaUtilidad = Number(item.price) - Number(item.cost)
    const gananciaUnitariaPorcentual = gananciaUnitariaUtilidad / precioUnitario
    const cantidadDeProducto = Number(item.stock)
    const costoTotalDeProducto = Number(item.cost) * Number(item.stock)
    const VentaTotalDeProducto = Number(item.price) * Number(item.stock)
    // const gananciaUnitaria:number = Number(item.price) - Number(item.cost)
    arrayProducts.push({
      cod: cod,
      description: description,
      brand: doc.data().brand,
      category: doc.data().category,
      costoUnitario: costoUnitario,
      precioUnitario: precioUnitario,
      gananciaUnitariaUtilidad: gananciaUnitariaUtilidad,
      gananciaUnitariaPorcentual: gananciaUnitariaPorcentual,
      cantidadDeProducto: cantidadDeProducto,
      costoTotalDeProducto: costoTotalDeProducto,
      VentaTotalDeProducto: VentaTotalDeProducto,
    })
  })

  // arrayProducts.map()
  if(arrayProducts){

    dispatch({ type: "allProductToRoe", payload: arrayProducts })
    dispatch({ type: "loaderRoe", payload: false })
  }
}