import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import { ConectorPluginV3 } from '../../plugin-printer'
const initialValueFormUser = { username: "", password: "" }
const productosDeVenta = [
  { name: "producto1", price: "30" }, { name: "producto2", price: "50" }
]
const Sunat = () => {
  const [formUser, setFormUser] = useState<UserApisPeru>(initialValueFormUser)
  const [printers, setPrinters] = useState<any>()
  const { loginApisPeruContext } = useGlobalContext()
  const formUserOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormUser({
      ...formUser,
      [e.target.name]: e.target.value
    })
  }
  const ESP_COD_13 = "             "
  const ESP_COD_12 = "            "
  const ESP_COD_11 = "           "
  const ESP_COD_10 = "          "
  const ESP_COD_9 = "chespirito"
  const loginApisPeru = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    loginApisPeruContext(formUser)
  }
  useEffect(() => {
    // getPrinterDevice()
  }, [])
  const getPrinterDevice = async () => {
    const printerList = await ConectorPluginV3.obtenerImpresoras()
    if (printerList) {
      setPrinters(printerList)
    }
  }
  // const URLPlugin = "http://laris-juliaca.vercel.app"
  const URLPlugin = "http://localhost:8000"
  const sendNewTicket = async () => {

    // const newTicket = new ConectorPluginV3(URLPlugin)
    const newTicket = new ConectorPluginV3()
    console.log('formUser', formUser)
    newTicket
    newTicket.Iniciar()
    newTicket.EstablecerAlineacion(ConectorPluginV3.ALINEACION_CENTRO)
    productosDeVenta.map(pro => {
      newTicket.EscribirTexto(`${pro.name}       ${pro.price}`)
      newTicket.Feed(1)
    })
    newTicket.EscribirTexto("test de prueba impresion boleta")
    newTicket.Feed(1)
    newTicket.EscribirTexto("2do mensaje de prueba")
    newTicket.Feed(1)
    newTicket.Iniciar()
    newTicket.Feed(1)

    const respuesta = await newTicket.imprimirEn('POS-80-Series')
    // const respuesta = await newTicket.imprimirEnImpresoraRemota('KONICA MINOLTA C652SeriesPCL',"http://192.168.0.5:8000/imprimir")
    if (respuesta === true) {
      console.log('impresioin correcta')
    } else {
      console.log('Error:', respuesta)
    }
  }
  const numerico = 25.12212
  console.log('printers', printers)
  console.log(`${productosDeVenta[0].name.slice(0, 5)}             ${productosDeVenta[0].price}`)
  console.log('ESP_COD_13',ESP_COD_13,ESP_COD_12,ESP_COD_11, "12")
  console.log('ESP_COD_12',ESP_COD_12)
  console.log('ESP_COD_11',ESP_COD_11)
  console.log('ESP_COD_10',ESP_COD_10)
  console.log('ESP_COD_9',ESP_COD_9.length)
  console.log('1',numerico.toFixed(2).toString)
  console.log('2',numerico.toFixed(2).toString())
  return (
    <div>
      <p>5</p>
      <h2 className='p-2 bg-blue-400 '>show printer</h2>
      <select>
        {
          printers?.map((printer: string[]) => {
            return (
              <option>{printer}</option>
            )
          })
        }
      </select>

      <button onClick={sendNewTicket}>imprimir</button>
      {/* <form onSubmit={loginApisPeru}>
        <div>
          <label>usuario</label>
          <input name="username"  onChange={formUserOnChange} type="text" />
        </div>
        <div>
          <label>contrasena</label>
          <input name="password" onChange={formUserOnChange} type="text" />
        </div>
        <button className='p-3 rounded-sm bg-blue-500 text-white font-semibold'>login</button>
      </form> */}
    </div>
  )
}

export default Sunat