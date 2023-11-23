import { ConectorPluginV3 } from "../plugin-printer"


const productosDeVenta = [
  { name: "producto1", price: "30" }, { name: "producto2", price: "50" }
]
// const URLPlugin = "http://localhost:8000"

export const sendNewTicket = async (paymentData:PaymentInfo, products:ProductToCart[] | ProductsFromTicket[] | undefined, timestamp:Date, correlativoTicket:string,userData:User) => {

  // const newTicket = new ConectorPluginV3(URLPlugin)
  const newTicket = new ConectorPluginV3()
  // console.log('formUser', formUser)
  newTicket.EstablecerAlineacion(ConectorPluginV3.ALINEACION_CENTRO)
  newTicket.EscribirTexto("Larys S.A.C.")
  newTicket.Feed(1)
  newTicket.EscribirTexto("RUC: 2010020030142")
  newTicket.Feed(1)
  newTicket.EscribirTexto(`${correlativoTicket}`)
  newTicket.Feed(1)
  newTicket.Iniciar()
  products?.map(pro => {
    if(Number(pro.amount) > 1) {
      newTicket.EscribirTexto(`${pro.description?.slice(0,10)}`)
      newTicket.EscribirTexto(`${pro.amount} x  ${pro.price}          ${Number(pro.amount)*Number(pro.price)}`)
      newTicket.Feed(1)
    }else {
      newTicket.EscribirTexto(`${pro.description?.slice(0,10)}          ${pro.price}`)
      newTicket.Feed(1)
    }
  })
  newTicket.EscribirTexto(`I.G.V.:           ${Number(paymentData.totalAmountToCart * 0.18).toFixed(2)}`)
  newTicket.Feed(1)
  newTicket.EscribirTexto(`OP. GRAVADA:           ${Number(paymentData.totalAmountToCart * 0.82).toFixed(2)}`)
  newTicket.Feed(1)
  newTicket.EscribirTexto(`TOTAL A PAGAR:          ${Number(paymentData.totalAmountToCart * 0.82).toFixed(2)}`)
  newTicket.Feed(1)
  newTicket.EscribirTexto(`${timestamp}`)
  newTicket.Feed(1)
  newTicket.EscribirTexto(`Nombre cajero: ${userData.name} ${userData.lastname}`)
  newTicket.Feed(1)
  newTicket.EscribirTexto(`Cod. cajero: ${userData.identifier}`)
  newTicket.Feed(1)
  newTicket.EscribirTexto(`Tipo de pago: ${paymentData.cash.amount}`)
  newTicket.Feed(1)
  newTicket.EscribirTexto(`cash: ${paymentData.cash.amount}  yape:${paymentData.yape.amount} | ${paymentData.yape.operationId}`)
  newTicket.Feed(1)
  newTicket.Iniciar()
  newTicket.Feed(1)

  const respuesta = await newTicket.imprimirEn('KONICA MINOLTA C652SeriesPCL')
  // const respuesta = await newTicket.imprimirEnImpresoraRemota('KONICA MINOLTA C652SeriesPCL',"http://192.168.0.5:8000/imprimir")
  if (respuesta === true) {
    console.log('impresioin correcta')
  } else {
    console.log('Error:', respuesta)
  }
}
// console.log('printers',printers)
console.log(`${productosDeVenta[0].name.slice(0, 5)}             ${productosDeVenta[0].price}`)