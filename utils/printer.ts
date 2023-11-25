import { functionDateConvert, functionDateToPrinter } from "../dates/date"
import { ConectorPluginV3 } from "../plugin-printer"

const ESP_COD_29 = "                             "
const ESP_COD_28 = "                            "
const ESP_COD_27 = "                           "
const ESP_COD_26 = "                          "
const ESP_COD_25 = "                         "
const ESP_COD_24 = "                        "
const ESP_COD_23 = "                       "
const ESP_COD_22 = "                      "
const ESP_COD_21 = "                     "
const ESP_COD_20 = "                    "
const ESP_COD_19 = "                   "
const ESP_COD_18 = "                  "
const ESP_COD_17 = "                 "
const ESP_COD_16 = "                "
const ESP_COD_15 = "               "
const ESP_COD_14 = "              "
const ESP_COD_13 = "             "
const ESP_COD_12 = "            "
const ESP_COD_11 = "           "
const ESP_COD_10 = "          "
const ESP_COD_8 = "        "
const ESP_COD_7 = "       "
const ESP_COD_6 = "      "
const ESP_COD_5 = "     "
export const sendNewTicket = async (paymentData: PaymentInfo, products: ProductToCart[] | ProductsFromTicket[] | undefined, timestamp: Date, correlativoTicket: string, userData: User) => {
  console.log('paymentData:', paymentData, 'products:', products, 'timestamp:', timestamp, 'correlativoTicket', correlativoTicket, 'userData', userData)
  // const newTicket = new ConectorPluginV3(URLPlugin)
  // console.log('timestamp',timestamp.getMonth())
  
  
  const newTicket = new ConectorPluginV3()
  // console.log('formUser', formUser)
  newTicket.EstablecerAlineacion(ConectorPluginV3.ALINEACION_CENTRO)
  newTicket.Corte(1)
  newTicket.EscribirTexto("LARYS IMPORTACIONES S.A.C.")
  newTicket.Feed(0)
  newTicket.EscribirTexto("RUC: 2010020030142")
  newTicket.Feed(0)
  newTicket.EscribirTexto(`NRO.:${correlativoTicket}`)
  newTicket.Feed(1)
  newTicket.Iniciar()
  products?.map(pro => {
    if (Number(pro.amount) > 1) {
      newTicket.EscribirTexto(`${pro.code}  ${(pro.description?.slice(0, 12).toUpperCase())}`)
      newTicket.Feed(0)
      newTicket.EscribirTexto(`${Number(pro.amount).toString().length === 1 ? ESP_COD_13 : ""}${Number(pro.amount).toString().length === 2 ? ESP_COD_12 : ""}${Number(pro.amount).toString().length === 3 ? ESP_COD_11 : ""}${Number(pro.amount).toString().length === 4 ? ESP_COD_10 : ""}${pro.amount} X${Number(pro.price).toFixed(2).toString().length === 4 ? ESP_COD_8 : ""}${Number(pro.price).toFixed(2).toString().length === 5 ? ESP_COD_7 : ""}${Number(pro.price).toFixed(2).toString().length === 6 ? ESP_COD_6 : ""}${Number(pro.price).toFixed(2).toString().length === 7 ? ESP_COD_5 : ""}${Number(pro.price).toFixed(2)}${(Number(pro.amount) * Number(pro.price)).toFixed(2).toString().length === 4 ? ESP_COD_13 : ""}${(Number(pro.amount) * Number(pro.price)).toFixed(2).toString().length === 5 ? ESP_COD_12 : ""}${(Number(pro.amount) * Number(pro.price)).toFixed(2).toString().length === 6 ? ESP_COD_11 : ""}${(Number(pro.amount) * Number(pro.price)).toFixed(2).toString().length === 7 ? ESP_COD_10 : ""}${(Number(pro.amount) * Number(pro.price)).toFixed(2)}`)
      // newTicket.EscribirTexto(`${Number(pro.amount).toString().length === 1 ? ESP_COD_13 : ""}${Number(pro.amount).toString().length === 2 ? ESP_COD_12 : ""}${Number(pro.amount).toString().length === 3 ? ESP_COD_11 : ""}${Number(pro.amount).toString().length === 4 ? ESP_COD_10 : ""}${pro.amount} X${Number(pro.price).toFixed(2).toString().length === 4 ? ESP_COD_8 : ""}${Number(pro.price).toFixed(2).toString().length === 5 ? ESP_COD_7 : ""}${Number(pro.price).toFixed(2).toString().length === 6 ? ESP_COD_6 : ""}${Number(pro.price).toFixed(2).toString().length === 7 ? ESP_COD_5 : ""}${Number(pro.price).toFixed(2)}${(Number(pro.amount) * Number(pro.price)).toFixed(2).toString().length === 4 ? ESP_COD_13 : ""}${(Number(pro.amount) * Number(pro.price)).toFixed(2).toString().length === 5 ? ESP_COD_12 : ""}${(Number(pro.amount) * Number(pro.price)).toFixed(2).toString().length === 6 ? ESP_COD_11 : ""}${(Number(pro.amount) * Number(pro.price)).toFixed(2).toString().length === 7 ? ESP_COD_10 : ""}${(Number(pro.amount) * Number(pro.price)).toFixed(2)}`)
      newTicket.Feed(0)
    } else {
      newTicket.EscribirTexto(`${pro.code}  ${(pro.description?.slice(0, 12).toUpperCase())}${Number(pro.price).toFixed(2).toString().length === 4 ? ESP_COD_16 : ""}${Number(pro.price).toFixed(2).toString().length === 5 ? ESP_COD_15 : ""}${Number(pro.price).toFixed(2).toString().length === 6 ? ESP_COD_14 : ""}${Number(pro.price).toFixed(2).toString().length === 7 ? ESP_COD_13 : ""}${Number(pro.price).toFixed(2)}`)
      newTicket.Feed(0)
    }
  })
  newTicket.EscribirTexto(`OP. GRAVADA:${Number(paymentData.totalAmountToCart * 0.82).toFixed(2).toString().length === 4 ? ESP_COD_29 : ""}${Number(paymentData.totalAmountToCart * 0.82).toFixed(2).toString().length === 5 ? ESP_COD_28 : ""}${Number(paymentData.totalAmountToCart * 0.82).toFixed(2).toString().length === 6 ? ESP_COD_27 : ""}${Number(paymentData.totalAmountToCart * 0.82).toFixed(2).toString().length === 7 ? ESP_COD_26 : ""}${Number(paymentData.totalAmountToCart * 0.82).toFixed(2)}`)//12//25 de espacio
  newTicket.Feed(0)
  newTicket.EscribirTexto(`I.G.V.:         S/${Number(paymentData.totalAmountToCart * 0.18).toFixed(2).toString().length === 4 ? ESP_COD_23 : ""}${Number(paymentData.totalAmountToCart * 0.18).toFixed(2).toString().length === 5 ? ESP_COD_22 : ""}${Number(paymentData.totalAmountToCart * 0.18).toFixed(2).toString().length === 6 ? ESP_COD_21 : ""}${Number(paymentData.totalAmountToCart * 0.18).toFixed(2).toString().length === 7 ? ESP_COD_20 : ""}${Number(paymentData.totalAmountToCart * 0.18).toFixed(2)}`)//19 de espacio
  newTicket.Feed(0)
  newTicket.EscribirTexto(`TOTAL A PAGAR:  S/${Number(paymentData.totalAmountToCart * 0.18).toFixed(2).toString().length === 4 ? ESP_COD_22 : ""}${Number(paymentData.totalAmountToCart * 0.18).toFixed(2).toString().length === 5 ? ESP_COD_21 : ""}${Number(paymentData.totalAmountToCart * 0.18).toFixed(2).toString().length === 6 ? ESP_COD_20 : ""}${Number(paymentData.totalAmountToCart * 0.18).toFixed(2).toString().length === 7 ? ESP_COD_19 : ""}${Number(paymentData.totalAmountToCart).toFixed(2)}`) //1
  newTicket.Feed(0)
  // newTicket.EscribirTexto(`${timestamp.getDate()} ${timestamp.getHours()}`)
  newTicket.Feed(1)
  newTicket.EscribirTexto(`----------------------------------------------`)
  newTicket.Feed(0)
  newTicket.EscribirTexto(functionDateToPrinter(timestamp))
  newTicket.Feed(0)
  newTicket.EscribirTexto(`Nombre cajero: ${(userData.name)?.toString().toUpperCase()} ${(userData.lastname)?.toString().toUpperCase()}`)
  newTicket.Feed(0.1)
  newTicket.EscribirTexto(`Cod. cajero: ${userData.identifier}`)
  newTicket.Feed(0)
  newTicket.EscribirTexto(`TIPO DE PAGO: ${paymentData.cash.amount > 0 ? "EFECTIVO" : ""}  ${paymentData.yape.amount > 0 ? "YAPE" : ""}`)
  newTicket.Feed(0)
  newTicket.EscribirTexto(`EFECTIVO: ${paymentData.cash.amount > 0 ? paymentData.cash.amount : 0}  YAPE: ${paymentData.yape.amount > 0 ? paymentData.yape.amount : 0} | N. OP.:${paymentData.yape.operationId}`)
  newTicket.Feed(1)
  newTicket.Corte(1)
  newTicket.Iniciar()

  // newTicket.Corte(1)
  // newTicket.Feed(1)


  const respuesta = await newTicket.imprimirEn('POS-80-Series')
  if (respuesta === true) {
    console.log('impresioin correcta')
  } else {
    console.log('Error:', respuesta)
  }
}