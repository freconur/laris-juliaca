import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import {ConectorPluginV3} from '../../plugin-printer'
const initialValueFormUser = { username: "", password: "" }
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
  const loginApisPeru = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    loginApisPeruContext(formUser)
  }
  useEffect(() => {
    getPrinterDevice()
  },[])
  const getPrinterDevice = async() => {
    const printerList = await ConectorPluginV3.obtenerImpresoras()
    if(printerList) {
      setPrinters(printerList)
    }
  }
  const sendNewTicket = async () => {
    const newTicket = new ConectorPluginV3()
    console.log('formUser', formUser)
    newTicket
    .Iniciar()
    .EstablecerAlineacion(ConectorPluginV3.ALINEACION_CENTRO)
    .EscribirTexto("test de prueba impresion boleta")
    .Feed(1)
    .EscribirTexto("2do mensaje de prueba")
    .Feed(1)
    .Iniciar()
    .Feed(1)
  
    const respuesta = await newTicket.imprimirEn('KONICA MINOLTA C652SeriesPCL')
    if(respuesta === true) {
      console.log('impresioin correcta')
    }else {
      console.log('Error:', respuesta)
    }
  }
  console.log('printers',printers)
  return (
    <div>

    <h2 className='p-2 bg-blue-400 '>show printer</h2>
    <select>
    {
      printers?.map((printer:string[]) => {
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