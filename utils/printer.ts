import { ConectorPluginV3 } from "../plugin-printer"


const productosDeVenta = [
  { name: "producto1", price: "30" }, { name: "producto2", price: "50" }
]
// const URLPlugin = "http://localhost:8000"

export const sendNewTicket = async (paymentData: PaymentInfo, products: ProductToCart[] | ProductsFromTicket[] | undefined, timestamp: Date, correlativoTicket: string, userData: User) => {
  console.log('paymentData:', paymentData, 'products:', products, 'timestamp:', timestamp, 'correlativoTicket', correlativoTicket, 'userData', userData)
  // const newTicket = new ConectorPluginV3(URLPlugin)
  const newTicket = new ConectorPluginV3()
  // console.log('formUser', formUser)
  newTicket.EstablecerAlineacion(ConectorPluginV3.ALINEACION_CENTRO)
  newTicket.EscribirTexto("LARYS IMPORTACIONES S.A.C.")
  newTicket.Feed(0)
  newTicket.EscribirTexto("RUC: 2010020030142")
  newTicket.Feed(0)
  newTicket.EscribirTexto(`NRO.:${correlativoTicket}`)
  newTicket.Feed(0)
  newTicket.Iniciar()
  products?.map(pro => {
    if (Number(pro.amount) > 1) {
      newTicket.EscribirTexto(`${pro.code}  ${(pro.description?.slice(0, 12).toUpperCase())}`)
      newTicket.Feed(1)
      newTicket.EscribirTexto(`             ${pro.amount} X        ${Number(pro.price).toFixed(2)}              ${(Number(pro.amount) * Number(pro.price)).toFixed(2)}`)
      newTicket.Feed(1)
    } else {
      newTicket.EscribirTexto(`${pro.code}  ${(pro.description?.slice(0, 12).toUpperCase())}                ${pro.price}`)
      newTicket.Feed(1)
    }
  })
  newTicket.EscribirTexto(`OP. GRAVADA:    S/                         ${Number(paymentData.totalAmountToCart * 0.82).toFixed(2)}`)//12//22
  newTicket.Feed(0)
  newTicket.EscribirTexto(`I.G.V.:         S/                         ${Number(paymentData.totalAmountToCart * 0.18).toFixed(2)}`)//
  newTicket.Feed(0)
  newTicket.EscribirTexto(`TOTAL A PAGAR:  S/                         ${Number(paymentData.totalAmountToCart).toFixed(2)}`) //14
  newTicket.Feed(0)
  newTicket.EscribirTexto(`${timestamp.getDate()} ${timestamp.getHours()}`)
  newTicket.Feed(1)
  newTicket.Feed(1)
  newTicket.EscribirTexto(`----------------------------------------------`)

  newTicket.EscribirTexto(`Nombre cajero: ${(userData.name)?.toString().toUpperCase()} ${(userData.lastname)?.toString().toUpperCase()}`)
  newTicket.Feed(0.1)
  newTicket.EscribirTexto(`Cod. cajero: ${userData.identifier}`)
  newTicket.Feed(1)
  newTicket.EscribirTexto(`TIPO DE PAGO: ${paymentData.cash.amount > 0 ? "EFECTIVO" : ""}  ${paymentData.yape.amount > 0 ? "YAPE" : ""}`)
  newTicket.Feed(1)
  newTicket.EscribirTexto(`EFECTIVO: ${paymentData.cash.amount > 0 ? paymentData.cash.amount : 0}  YAPE: ${paymentData.yape.amount > 0 ? paymentData.yape.amount : 0} | N. OP.:${paymentData.yape.operationId}`)
  newTicket.Feed(1)
  newTicket.Corte()
  newTicket.Iniciar()
  // newTicket.Feed(1)

  const respuesta = await newTicket.imprimirEn('POS-80-Series')
  // const respuesta = await newTicket.imprimirEnImpresoraRemota('KONICA MINOLTA C652SeriesPCL',"http://192.168.0.5:8000/imprimir")
  if (respuesta === true) {
    console.log('impresioin correcta')
  } else {
    console.log('Error:', respuesta)
  }
}
// console.log('printers',printers)
console.log(`${productosDeVenta[0].name.slice(0, 5)}             ${productosDeVenta[0].price}`)