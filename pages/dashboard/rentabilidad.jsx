import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { AuthAction, useUser, withUser } from 'next-firebase-auth'
import LayoutDashboard from '../../layout/LayoutDashboard'
import { useGlobalContext } from '../../context/GlobalContext'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { RiLoader4Line } from "react-icons/ri";
const Rentabilidad = () => {

  const { getAllProductToRoeContext, LibraryData } = useGlobalContext()
  const { allProductToRoe, loaderRoe } = LibraryData
  const dataUser = useUser()

  const handleGenerateTable = () => {
    getAllProductToRoeContext()
  }

  return (
    <LayoutDashboard>
      <Navbar dataUser={dataUser} />
      <div className='p-3'>
        <h2 className='text-2xl text-slate-600 uppercase my-5'>rentabilidad</h2>
        <div>
          <h3 className='text-red-500 uppercase font-semibold mb-3'>Adventencia:</h3>
          <ul className='mb-3'>
            <li className='text-lg text-slate-500'>
              1- Esta informacion esta disponible para descarga en formato excel.
            </li>
            <li className='text-lg text-slate-500'>
              2- Generar la tabla tiene un alto consumo de recursos con el servidor de su aplicacion, uselo solo cuando sea necesario.
            </li>
          </ul>

          {allProductToRoe?.length > 0 ?
            <div className="flex justify-start my-5">
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="p-3 bg-green-500 rounded-lg shadow-lg text-white text-xl cursor-pointer"
                table="roe"
                filename="margen_de_ganancias"
                sheet="margen_de_ganancias"
                buttonText="Descargar Tabla Excel" />
            </div>
            :
            <button onClick={handleGenerateTable} className='p-3 capitalize bg-yellow-500 shadow-lg text-white rounded-md cursor-pointer font-semibold'>generar tabla</button>
          }
          {
            loaderRoe ?
              <div className="flex w-full mt-5 items-center m-auto justify-center">
                <RiLoader4Line className="animate-spin text-3xl text-slate-500 " />
                <p className="text-slate-500">generando tabla...</p>
              </div>
              : null
          }
          <table id="roe" className="w-full hidden bg-white  rounded-md shadow-md relative">
            <thead className='bg-headerTable border-b-2 border-gray-200'>
              <tr className="text-slate-400 capitalize font-nunito ">
                <th className="pl-3 py-3 md:p-2  w-[20px] text-left">codigo</th>
                <th className="pl-3 py-3 md:p-2  w-[20px] text-left">descripcion de producto</th>
                <th className="pl-3 py-3 md:p-2  w-[20px] text-left">marca</th>
                <th className="pl-3 py-3 md:p-2  w-[20px] text-left">categoria</th>
                <th className="pl-3 py-3 md:p-2  w-[20px] text-left">costo de producto</th>
                <th className="pl-3 py-3 md:p-2  w-[20px] text-left">precio de producto</th>
                <th className="pl-3 py-3 md:p-2  w-[20px] text-left">ganancia unitaria</th>
                <th className="pl-3 py-3 md:p-2  w-[20px] text-left">ganancia unitaria %</th>
                <th className="pl-3 py-3 md:p-2  w-[20px] text-left">cantidad</th>
                <th className="pl-3 py-3 md:p-2  w-[20px] text-left">costo total</th>
                <th className="pl-3 py-3 md:p-2  w-[20px] text-left">venta total</th>
              </tr>
            </thead>
            <tbody>
              {allProductToRoe?.map((item) => {
                return (
                  <tr key={item.cod}>
                    <td>{item.cod}</td>
                    <td>{item.description}</td>
                    <td>{item.brand}</td>
                    <td>{item.category}</td>
                    <td>{item.costoUnitario}</td>
                    <td>{item.precioUnitario}</td>
                    <td>{item.gananciaUnitariaUtilidad}</td>
                    <td>{item.gananciaUnitariaPorcentual.toFixed(2)}</td>
                    <td>{item.cantidadDeProducto}</td>
                    <td>{item.costoTotalDeProducto}</td>
                    <td>{item.VentaTotalDeProducto}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

    </LayoutDashboard>
  )
}

// export default Rentabilidad
export default withUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(Rentabilidad)