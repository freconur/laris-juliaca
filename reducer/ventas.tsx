import { OrderByDirection, QuerySnapshot, Timestamp, addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, endAt, endBefore, getDoc, getDocs, getFirestore, increment, limit, onSnapshot, orderBy, query, setDoc, startAfter, updateDoc, where } from "firebase/firestore";
import { app } from "../firebase/firebase.config";
import { currentDate, currentMonth, currentYear, dateConvertObject, functionDateConvert } from "../dates/date";

const db = getFirestore(app)
const YEAR_MONTH = `${currentMonth()}-${currentYear()}/${currentMonth()}-${currentYear()}`
const yearMonth = `${currentMonth()}-${currentYear()}`
const DB_VENTAS = "vFDctYBKOwrWhddXGHMR"
const DAILY_SALE = "Msk9t9G2wl2xrboysYUh"
const PAYMENT_TYPE = "XXnuJEsytqLDBQ4PvSgc"

export const getTickets = async (dispatch: (action: any) => void, dateData: DateData) => {
  const pathTicket = `${dateData.month}-${dateData.year}/${dateData.month}-${dateData.year}/${dateData.date}`
  const ticketPath = `/db-ventas/${DB_VENTAS}/${pathTicket}/`
  const ticketsRef = collection(db, ticketPath)
  const querySanpshot = await getDocs(ticketsRef)
  const tickets: any = []
  if (querySanpshot.size === 0) {
    console.log('no hay tickets')
  } else {
    querySanpshot.docs.forEach((item) => {
      tickets.push({ ...item.data(), id: item.id, date: functionDateConvert(item.data().timestamp.toDate()) })
    })
    console.log('tickets', tickets)
    dispatch({ type: "getTickets", payload: tickets })

  }
}

export const cancelTicket = async (ticket: Ticket) => {
  const dateData = dateConvertObject(ticket.timestamp.toDate())
  const pathTicket = `/db-ventas/${DB_VENTAS}/${dateData.month}-${dateData.year}/${dateData.month}-${dateData.year}/${dateData.date}`
  const ticketRef = doc(db, pathTicket, ticket.id as string)
  const querySnapTicket = await getDoc(ticketRef)

  if (querySnapTicket.exists()) {
    if (Number(currentDate()) === dateData.date && currentMonth() === dateData.month) {// se esta verificando si el ticket es del mismo dia o de una fecha pasada
      // pasaria a descontar los montos de en tiempo real y las cantidadaes de stock del ticket
      console.log('iticket', ticket)

      ticket.product?.map(async (item, index) => {
        console.log('item.cancelAmoun', item.cancelAmount)
        if (item.cancelAmount !== undefined && item.cancelAmount > 0) {
          //-----DAILYSALES-------//
          console.log('entrando a la condicion undefined')

          const pathDailySales = `/dailysale/${DAILY_SALE}/${yearMonth}/`
          const currentDailySales = doc(db, pathDailySales, currentDate())//path de venta dlel dia
          const queryDailySales = await getDoc(currentDailySales)//esto solo sirve para validar que la data existe//
          //-----DAILYSALES-------//
          //-----DAILYSALESTATICTICS-------//
          const pathDailySalesStatistics = `/statistics/${YEAR_MONTH}/`
          const currentDailySalesStatistics = doc(db, pathDailySalesStatistics, currentDate()) //path venta del dia en estadisticas
          const queryDailySalesStatistics = await getDoc(currentDailySalesStatistics)//esto solo sirve para validar que la data existe//
          //-----DAILYSALESTATICTICS-------//
          //-----TIPO DE PAGO EFECTIVO YAPE----------//
          //MI CODIGO AQUI
          //-----TIPO DE PAGO EFECTIVO YAPE----------//
          //-----PRODUCTS-------//
          const productRef = doc(db, 'products', item.code as string)
          const productData = await getDoc(productRef)//esto solo sirve para validar que la data existe//
          //-----PRODUCTS-------//
          const productsSalesRef = doc(db, `/products-sales/${currentYear()}/${currentMonth()}/${currentMonth()}/${currentDate()}`, item.code as string)

          if (productData.exists()) {
            await updateDoc(ticketRef, {
              product: arrayRemove({
                amount: item.amount,
                brand: item.brand,
                category: item.category,
                code: item.code,
                description: item.description,
                // marcaSocio: item.marcaSocio,
                price: item.price,
                stock: item.stock,
                // warning: item.warning,
              })
            })

            // const updateStockFromProduct = productData.data()?.stock + item.cancelAmount
            const updateAmountFromProduct = Number(item.amount) - item.cancelAmount
            const totalAmountofCashToCancel = Number(item.price) * item.cancelAmount
            item.amount = updateAmountFromProduct
            item.dateLastModified = Timestamp.fromDate(new Date())
            await updateDoc(productRef, { stock: increment(item.cancelAmount) })
            await updateDoc(ticketRef, {
              product: arrayUnion({
                amount: item.amount,
                brand: item.brand,
                category: item.category,
                code: item.code,
                description: item.description,
                // marcaSocio: item.marcaSocio,
                price: item.price,
                stock: item.stock,
                // warning: item.warning,
              })
            })
            if (ticket.cash?.cash) {
              console.log('entrando')
              const pathPaymentType = `/payment-type/${PAYMENT_TYPE}/${currentMonth()}-${currentYear()}/`
              const paymentRef = doc(db, pathPaymentType, currentDate())
              console.log('-Number(totalAmountofCashToCancel', Number(totalAmountofCashToCancel))
              await updateDoc(paymentRef, { cash: increment(-Number(totalAmountofCashToCancel.toFixed(2))) })
            } else {
              console.log('casi entrando')

              const pathPaymentType = `/payment-type/${PAYMENT_TYPE}/${currentMonth()}-${currentYear()}/`
              const paymentRef = doc(db, pathPaymentType, currentDate())
              await updateDoc(paymentRef, { yape: increment(-Number(totalAmountofCashToCancel.toFixed(2))) })
            }
            if (queryDailySales.exists() && queryDailySalesStatistics.exists()) {
              // const updateCash = queryDailySales.data().amount - totalAmountofCashToCancel
              console.log('entrando a queryDailySales.exists() && queryDailySalesStatistics.exists()')
              const updateCash = -Number(totalAmountofCashToCancel.toFixed(2))
              await updateDoc(currentDailySalesStatistics, { dailySales: increment(updateCash) })
              await updateDoc(currentDailySales, { amount: increment(updateCash) })

              const getItemFromProductsSales = await getDoc(productsSalesRef)
              if (getItemFromProductsSales.exists()) {
                if (getItemFromProductsSales.data().totalAmountSale > 1) {
                  updateDoc(productsSalesRef, { totalAmountSale: increment(-Number(item.cancelAmount.toFixed(2))) })
                } else if (getItemFromProductsSales.data().totalAmountSale === 1) {
                  await deleteDoc(productsSalesRef)
                }
              }
            }
          }
        }
      })
      await updateDoc(ticketRef, { dateLastModified: Timestamp.fromDate(new Date()) })

    } else {
      // pasaria a actualizar las cantidad de stock del stick
      //se esta viendo si quitar esta opcion o dejarala, dependiendo del cliente. 09/12/23
      ticket.product?.map(async (item, index) => {

        if (item.cancelAmount !== undefined && item.cancelAmount > 0) {
          const productRef = doc(db, 'products', item.code as string)
          const productData = await getDoc(productRef)//esto solo sirve para validar que la data existe//
          if (productData.exists()) {
            await updateDoc(ticketRef, {
              product: arrayRemove({
                amount: item.amount,
                brand: item.brand,
                category: item.category,
                code: item.code,
                description: item.description,
                // marcaSocio: item.marcaSocio,
                price: item.price,
                stock: item.stock,
                // warning: item.warning,
              })
            })
            const updateStockFromProduct = productData.data()?.stock + item.cancelAmount
            const updateAmountFromProduct = Number(item.amount) - item.cancelAmount
            item.amount = updateAmountFromProduct
            item.dateLastModified = Timestamp.fromDate(new Date())
            item.cancelAmount = item.cancelAmount
            await updateDoc(ticketRef, {
              product: arrayUnion({
                amount: item.amount,
                brand: item.brand,
                category: item.category,
                code: item.code,
                description: item.description,
                // marcaSocio: item.marcaSocio,
                price: item.price,
                stock: item.stock,
                // warning: item.warning,
              })
            })

            await updateDoc(productRef, { stock: updateStockFromProduct })
          }
        }
      })
      await updateDoc(ticketRef, { dateLastModified: Timestamp.fromDate(new Date()) })
    }
  }
}

export const cancelTicketofSale = async (ticket: Ticket) => {
  //buscamos el ticket dentro la base de datos
  console.log('entrando al cancelTicketofSale logica')
  const dateData = dateConvertObject(ticket.timestamp.toDate())
  const pathTicket = `/db-ventas/${DB_VENTAS}/${dateData.month}-${dateData.year}/${dateData.month}-${dateData.year}/${dateData.date}`
  const ticketRef = doc(db, pathTicket, ticket.id as string)
  const querySnapTicket = await getDoc(ticketRef)

  // VERIFICAM,OS SI EXISTE EL TICKET EN LA BASE DE DATOS
  if (querySnapTicket.exists()) {
    console.log('entrando al al ticket')

    if (dateData.date === Number(currentDate()) && currentMonth() === dateData.month) {//VERIFICAMOS QUE LA ANULACION SEA DEL MISMO DIA
      console.log('yape', ticket.yape?.yape)
      console.log('cash', ticket.cash?.cash)
      if (ticket.cash?.cash && ticket.yape?.yape === undefined) {//VERIFICO QUE EL PAGO SEA SOLO CON EFECTIVO
        //-----DAILYSALES-------//
        const pathDailySales = `/dailysale/${DAILY_SALE}/${yearMonth}/`
        const currentDailySales = doc(db, pathDailySales, currentDate())//path de venta dlel dia
        // const queryDailySales = await getDoc(currentDailySales)//esto solo sirve para validar que la data existe//
        //-----DAILYSALES-------//
        //------PAYMENT TYPE YAPE - CASH --------//
        const pathPaymentType = `/payment-type/${PAYMENT_TYPE}/${currentMonth()}-${currentYear()}`
        const paymentTypeRef = doc(db, pathPaymentType, currentDate())
        // const queryPaymentType = await getDoc(paymentTypeRef)
        // `/payment-type/XXnuJEsytqLDBQ4PvSgc/noviembre-2023/26`
        //------PAYMENT TYPE YAPE - CASH --------//
        const pathDailySalesStatistics = `/statistics/${YEAR_MONTH}/`
        const currentDailySalesStatistics = doc(db, pathDailySalesStatistics, currentDate()) //path venta del dia en estadisticas
        // const queryDailySalesStatistics = await getDoc(currentDailySalesStatistics)//esto solo sirve para validar que la data existe//
        //-----DAILYSALESTATICTICS-------//
        //-----PRODUCTOS VENDIDOS--------//
        //-----PRODUCTOS VENDIDOS--------//
        //BUSCAMOS EL PRODUCTO DEL TICKET EN LA BASE DE DATOS DE PRODUCTOS
        ticket.product?.map(async (item) => {
          const productsSalesRef = doc(db, `/products-sales/${currentYear()}/${currentMonth()}/${currentMonth()}/${currentDate()}`, item.code as string)
          const productRef = doc(db, 'products', item.code as string)
          const productData = await getDoc(productRef)

          //BORRANDO LOS DATOS ANTERIORES  
          if (productData.exists()) {
            await updateDoc(ticketRef, {
              product: arrayRemove({
                amount: item.amount,
                brand: item.brand,
                category: item.category,
                code: item.code,
                description: item.description,
                price: item.price,
                stock: item.stock,
              })
            })
            //ACTUALIZANDO LOS NUEVOS DATOS DEL ITEM 
            // const updateAmountFromProduct = Number(item.amount) - item.cancelAmount
            // const totalAmountofCashToCancel = Number(item.price) * item.cancelAmount
            await updateDoc(productRef, { stock: increment(Number(item.amount)) })
            await updateDoc(ticketRef, {
              product: arrayUnion({
                amount: 0,
                brand: item.brand,
                category: item.category,
                code: item.code,
                description: item.description,
                price: item.price,
                stock: item.stock,
              })
            })
            const getItemFromProductsSales = await getDoc(productsSalesRef)
            if (getItemFromProductsSales.exists()) {
              updateDoc(productsSalesRef, { totalAmountSale: increment(-Number(item.amount)) })
            }
          }
        })
        await updateDoc(paymentTypeRef, { cash: increment(-Number(ticket.totalAmountCart)) })
        await updateDoc(ticketRef, { timestampModified: new Date(), cancel: true })//AGREGAMOS LA FECHA DE MODIFICACION
        await updateDoc(currentDailySalesStatistics, { dailySales: increment(-Number(ticket.totalAmountCart)), tickets: increment(-1) })
        await updateDoc(currentDailySales, { amount: increment(-Number(ticket.totalAmountCart)) })
      }
      console.log('ticket.cash?.cash', ticket.cash?.cash, ' ', ticket.yape?.yape)
      if (ticket.cash?.cash === undefined && ticket.yape?.yape) {//VERIFICO QUE EL PAGO SEA SOLO CON EFECTIVO
        //-----DAILYSALES-------//
        console.log('entrando a cash indefinido y yape disponible')
        const pathDailySales = `/dailysale/${DAILY_SALE}/${yearMonth}/`
        const currentDailySales = doc(db, pathDailySales, currentDate())//path de venta dlel dia
        // const queryDailySales = await getDoc(currentDailySales)//esto solo sirve para validar que la data existe//
        //-----DAILYSALES-------//
        //------PAYMENT TYPE YAPE - CASH --------//
        const pathPaymentType = `/payment-type/${PAYMENT_TYPE}/${currentMonth()}-${currentYear()}`
        const paymentTypeRef = doc(db, pathPaymentType, currentDate())
        // const queryPaymentType = await getDoc(paymentTypeRef)
        // `/payment-type/XXnuJEsytqLDBQ4PvSgc/noviembre-2023/26`
        //------PAYMENT TYPE YAPE - CASH --------//
        const pathDailySalesStatistics = `/statistics/${YEAR_MONTH}/`
        const currentDailySalesStatistics = doc(db, pathDailySalesStatistics, currentDate()) //path venta del dia en estadisticas
        // const queryDailySalesStatistics = await getDoc(currentDailySalesStatistics)//esto solo sirve para validar que la data existe//
        //-----DAILYSALESTATICTICS-------//
        //-----PRODUCTOS VENDIDOS--------//
        //-----PRODUCTOS VENDIDOS--------//
        //BUSCAMOS EL PRODUCTO DEL TICKET EN LA BASE DE DATOS DE PRODUCTOS
        ticket.product?.map(async (item) => {
          const productsSalesRef = doc(db, `/products-sales/${currentYear()}/${currentMonth()}/${currentMonth()}/${currentDate()}`, item.code as string)
          const productRef = doc(db, 'products', item.code as string)
          const productData = await getDoc(productRef)

          //BORRANDO LOS DATOS ANTERIORES  
          if (productData.exists()) {
            await updateDoc(ticketRef, {
              product: arrayRemove({
                amount: item.amount,
                brand: item.brand,
                category: item.category,
                code: item.code,
                description: item.description,
                price: item.price,
                stock: item.stock,
              })
            })
            //ACTUALIZANDO LOS NUEVOS DATOS DEL ITEM 
            // const updateAmountFromProduct = Number(item.amount) - item.cancelAmount
            // const totalAmountofCashToCancel = Number(item.price) * item.cancelAmount
            await updateDoc(productRef, { stock: increment(Number(item.amount)) })
            await updateDoc(ticketRef, {
              product: arrayUnion({
                amount: 0,
                brand: item.brand,
                category: item.category,
                code: item.code,
                description: item.description,
                price: item.price,
                stock: item.stock,
              })
            })
            const getItemFromProductsSales = await getDoc(productsSalesRef)
            if (getItemFromProductsSales.exists()) {
              updateDoc(productsSalesRef, { totalAmountSale: increment(-Number(item.amount)) })
            }
          }
        })
        await updateDoc(paymentTypeRef, { yape: increment(-Number(ticket.totalAmountCart)) })
        await updateDoc(ticketRef, { timestampModified: new Date(), cancel: true })//AGREGAMOS LA FECHA DE MODIFICACION
        await updateDoc(currentDailySalesStatistics, { dailySales: increment(-Number(ticket.totalAmountCart)), tickets: increment(-1) })
        await updateDoc(currentDailySales, { amount: increment(-Number(ticket.totalAmountCart)) })
      }
    }else {
      console.log('no se puede anular ticket de fechas anteriores')
    }
  }
}

export const returnProductFromTicket = async (ticket: Ticket) => {
  console.log('ticket.timestamp.toDate()', ticket.timestamp.toDate())
  const dateData = dateConvertObject(ticket.timestamp.toDate())
  const pathTicket = `/db-ventas/${DB_VENTAS}/${dateData.month}-${dateData.year}/${dateData.month}-${dateData.year}/${dateData.date}`
  const ticketRef = doc(db, pathTicket, ticket.id as string)

  ticket.product?.map(async item => {
    console.log('item.cancelAmount', item.cancelAmount)
    if (Number(item.cancelAmount) > 0) {
      const productRef = doc(db, 'products', item.code as string)
      await updateDoc(ticketRef, {
        product: arrayRemove({
          amount: item.amount,
          brand: item.brand,
          category: item.category,
          code: item.code,
          description: item.description,
          price: item.price,
          stock: item.stock,
        })
      })
      await updateDoc(productRef, { stock: increment(Number(item.cancelAmount)) })
      const updateAmountFromProduct = Number(item.amount) - Number(item.cancelAmount)
      await updateDoc(ticketRef, {
        product: arrayUnion({
          amount: updateAmountFromProduct,
          brand: item.brand,
          category: item.category,
          code: item.code,
          description: item.description,
          price: item.price,
          stock: item.stock,
        })
      })
    }
  })
  await updateDoc(ticketRef, { timestampModified: new Date(), cancel: true })//AGREGAMOS LA FECHA DE MODIFICACION

}
