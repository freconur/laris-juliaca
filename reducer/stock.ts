import { OrderByDirection, QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc, endAt, endBefore, getDoc, getDocs, getFirestore, increment, limit, onSnapshot, orderBy, query, setDoc, startAfter, updateDoc, where } from "firebase/firestore";
import { app } from "../firebase/firebase.config";
import { currentDate, currentMonth, currentYear } from "../dates/date";
import { sendNewTicket } from "../utils/printer";

const db = getFirestore(app)
const YEAR_MONTH = `${currentMonth()}-${currentYear()}/${currentMonth()}-${currentYear()}`
const yearMonth = `${currentMonth()}-${currentYear()}`

const DAILY_SALE = "Msk9t9G2wl2xrboysYUh"
const DB_VENTAS = "vFDctYBKOwrWhddXGHMR"
const PRODUCT_SALES = "product-sales"
const SALES_PER_MONTH = "RgKX6ZLEyYxsnhTHkfhi"
const TICKET = "A7UI2E1sHQiDRiCP1mQP"
const PAYMENT_TYPE = "XXnuJEsytqLDBQ4PvSgc"

export const getProductsFilterByStock = async (dispatch: (action: any) => void, paramsFilter: FilterProdyctBySTock, lastDocument: any) => {
  const productRef = collection(db, '/products')
  const productsFilterByStock: ProductToCart[] = []

  if (Number(paramsFilter.stock) === 0) {
    const q = query(productRef, where("stock", "==", 0), orderBy('stock'), limit(5))
    const data = await getDocs(q)
    const lastDocumentProductsByStock = data.docs[data.docs.length - 1]
    const previousDocumentProductsByStock = data.docs[0] || null

    if (data.size) {
      data.docs.forEach(item => productsFilterByStock.push(item.data()))
    }
    dispatch({ type: "lastDocumentProductsByStock", payload: lastDocumentProductsByStock })
    dispatch({ type: "previousDocumentProductsByStock", payload: previousDocumentProductsByStock })
    dispatch({ type: "productsFromFilterByStock", payload: productsFilterByStock })
  }
  if (Number(paramsFilter.stock) === 10) {
    let document
    if (lastDocument) {
      document = lastDocument
    } else { document = null }
    const q = query(productRef, where("stock", "<", 10), orderBy('stock'), limit(5))
    const data = await getDocs(q)
    const lastDocumentProductsByStock = data.docs[data.docs.length - 1]
    const previousDocumentProductsByStock = data.docs[0] || null

    if (data.size) {
      data.docs.forEach(item => productsFilterByStock.push(item.data()))
    }
    dispatch({ type: "lastDocumentProductsByStock", payload: lastDocumentProductsByStock })
    dispatch({ type: "previousDocumentProductsByStock", payload: previousDocumentProductsByStock })
    dispatch({ type: "productsFromFilterByStock", payload: productsFilterByStock })
  }
}
export const nextProductsFilterByStock = async (dispatch: (action: any) => void,paramsFilter: FilterProdyctBySTock, lastDocument: any) => {
  const productRef = collection(db, '/products')
  const productsFilterByStock: ProductToCart[] = []

  let document
  if (lastDocument) document = lastDocument
  else { document = null }
  if(Number(paramsFilter.stock) === 10) {
    const q = query(productRef, where("stock", "<",  10), orderBy('stock'), startAfter(document), limit(5))
    const data = await getDocs(q)
    
    const previousDocumentProductsByStock = data.docs[0] || null
    const lastDocumentProductsByStock = data.docs[data.docs.length - 1] || null
    data.docs.forEach(item => productsFilterByStock.push(item.data()))
    dispatch({ type: "productsFromFilterByStock", payload: productsFilterByStock })
    dispatch({ type: "lastDocumentProductsByStock", payload: lastDocumentProductsByStock })
    dispatch({ type: "previousDocumentProductsByStock", payload: previousDocumentProductsByStock })
  }else {
    const q = query(productRef, where("stock", "==",  0), orderBy('stock'), startAfter(document), limit(5))
    const data = await getDocs(q)
    
    const previousDocumentProductsByStock = data.docs[0] || null
    const lastDocumentProductsByStock = data.docs[data.docs.length - 1] || null
    data.docs.forEach(item => productsFilterByStock.push(item.data()))
    dispatch({ type: "productsFromFilterByStock", payload: productsFilterByStock })
    dispatch({ type: "lastDocumentProductsByStock", payload: lastDocumentProductsByStock })
    dispatch({ type: "previousDocumentProductsByStock", payload: previousDocumentProductsByStock })
  }
  
}

export const previousProductsFilterByStock = async (dispatch: (action: any) => void,paramsFilter: FilterProdyctBySTock, firstDocument: any) => {
  const productRef = collection(db, '/products')
  const productsFilterByStock: ProductToCart[] = []
  let document
  if (firstDocument) {
    document = firstDocument
  } else { document = null }
  if(Number(paramsFilter.stock) === 10 ) {
    const q = query(productRef, where("stock", "<", 10), orderBy('stock'), endBefore(firstDocument), limit(5))
    const data = await getDocs(q)
    const previousDocumentProductsByStock = data.docs[0] || null
    const lastDocumentProductsByStock = data.docs[data.docs.length - 1] || null
    // if (data.size) {
    // }
    data.docs.forEach(item => productsFilterByStock.push(item.data()))
    dispatch({ type: "productsFromFilterByStock", payload: productsFilterByStock })
    dispatch({ type: "lastDocumentProductsByStock", payload: lastDocumentProductsByStock })
    dispatch({ type: "previousDocumentProductsByStock", payload: previousDocumentProductsByStock })
  }else {
    const q = query(productRef, where("stock", "==", 0), orderBy('stock'), endBefore(firstDocument), limit(5))
    const data = await getDocs(q)
    const previousDocumentProductsByStock = data.docs[0] || null
    const lastDocumentProductsByStock = data.docs[data.docs.length - 1] || null
    // if (data.size) {
    // }
    data.docs.forEach(item => productsFilterByStock.push(item.data()))
    dispatch({ type: "productsFromFilterByStock", payload: productsFilterByStock })
    dispatch({ type: "lastDocumentProductsByStock", payload: lastDocumentProductsByStock })
    dispatch({ type: "previousDocumentProductsByStock", payload: previousDocumentProductsByStock })
  }
  
}
export const getFilterProductByStock = async (dispatch: (action: any) => void, paramsFilter: FilterProdyctBySTock) => {
  console.log('paramsFilter', paramsFilter)
  // const order = paramsFilter.orderBy as OrderByDirection
  const productRef = collection(db, '/products')
  const productsFilterByStock: ProductToCart[] = []
  if (paramsFilter.brand.length === 0) {
    console.log('busqueda sin brand')
    if (paramsFilter.stock === 0) {
      console.log('sin brand y en 0')
      const q = query(productRef, where("stock", "==", Number(paramsFilter.stock)), where("marcaSocio", "==", `${paramsFilter.marcaSocio}`), orderBy("stock"));
      const data = await getDocs(q)
      console.log('datasize', data.size)

      data.docs.forEach(item => {
        productsFilterByStock.push(item.data())
      })
      dispatch({ type: "productsFromFilterByStock", payload: productsFilterByStock })
    } else {
      const q = query(productRef, where("stock", "<=", Number(paramsFilter.stock)), where("stock", ">=", 1), where("marcaSocio", "==", `${paramsFilter.marcaSocio}`), orderBy("stock"));
      const data = await getDocs(q)
      console.log('datasize', data.size)

      data.docs.forEach(item => {
        productsFilterByStock.push(item.data())
      })
      dispatch({ type: "productsFromFilterByStock", payload: productsFilterByStock })
    }
  } else {
    console.log('entramos con marca')
    if (paramsFilter.stock === 0) {
      const q = query(productRef, where("stock", "==", Number(paramsFilter.stock)), where("brand", "==", `${paramsFilter.brand}`), where("marcaSocio", "==", `${paramsFilter.marcaSocio}`), orderBy("stock"));
      const data = await getDocs(q)
      console.log('datasize', data.size)
      data.docs.forEach(item => {
        productsFilterByStock.push(item.data())
      })
      dispatch({ type: "productsFromFilterByStock", payload: productsFilterByStock })
    } else {
      const q = query(productRef, where("stock", "<=", Number(paramsFilter.stock)), where("brand", "==", `${paramsFilter.brand}`), where("stock", ">=", 1), where("marcaSocio", "==", `${paramsFilter.marcaSocio}`), orderBy("stock"));
      const data = await getDocs(q)
      console.log('datasize', data.size)
      data.docs.forEach(item => {
        productsFilterByStock.push(item.data())
      })
      dispatch({ type: "productsFromFilterByStock", payload: productsFilterByStock })
    }
  }

} 