import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import TableStock from '../../components/tableStock/TableStock'
import { RiCheckLine } from 'react-icons/ri'
import { AuthAction, useUser, withUser } from 'next-firebase-auth'
import LayoutDashboard from '../../layout/LayoutDashboard'
import Navbar from '../../components/Navbar/Navbar'

const params: FilterProdyctBySTock = {
  marcaSocio: "",
  stock: 0,
  brand: ""
}
const Stock = () => {
  const dataUser = useUser()
  const { getDataUser,filterProductByStock, LibraryData, brands, marcaSocio } = useGlobalContext()
  const { productsFromFilterByStock } = LibraryData
  const [currentPage, setCurrentPage] = useState(0)
  const [activeButton, setActiveButton] = useState(false)
  const [paramsFilter, setParamsFilter] = useState<FilterProdyctBySTock>(params)
  const onChangeValueAmountStock = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParamsFilter({
      ...paramsFilter,
      [e.target.name]: e.target.value
    })
  }
  // useEffect(() => {
  //   if(dataUser.id){
  //     getDataUser(dataUser.id)
  //   }
  // },[dataUser.id,dataUser])
  useEffect(() => {

    marcaSocio()
  }, [])

  const paginationProducts = () => {

    return productsFromFilterByStock.slice(currentPage, currentPage + 5)
  }
  const getBrands = () => {
    brands()
    setActiveButton(!activeButton)
  }
  const filterProductHandle = () => {
    filterProductByStock(paramsFilter)
  }
  const nextPage = () => {
    setCurrentPage(currentPage + 5)
  }
  const previewPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 5)
    }
  }
  return (
    <LayoutDashboard>
      <Navbar dataUser={dataUser}/>
      <div className='w-full'>
        <h1 className='text-slate-700 font-dmMono capitalize text-2xl'>filtro de productos por stock</h1>
        <div className='p-1'>
          <div className="my-3">
            <h3 className='text-slate-600 font-dmMono'>Stock :</h3>
            <select className='w-full rounded-lg p-2 text-slate-500' onChange={onChangeValueAmountStock} value={paramsFilter.stock} name="stock">
              <option value="">filtrar por</option>
              <option value={0 as number}> igual a 0 </option>
              <option value={5 as number}>menores a 5 </option>
              {/* <option value={10 as number}>menores a 10 </option> */}
            </select>
          </div>
          <div className="my-3">
            <h3 className='text-slate-600 font-dmMono'>Marca socio :</h3>
            <select className='w-full rounded-lg p-2 text-slate-500' onChange={onChangeValueAmountStock} value={paramsFilter.marcaSocio} name="marcaSocio">
              <option value="">filtrar por</option>
              {
                LibraryData.marcaSocio?.map((marcasocio, index) => {
                  return (
                    <option key={index} value={marcasocio.name}>{marcasocio.name}</option>
                  )
                })
              }
            </select>
          </div>
          <div className="my-3">
            <div className='flex'>
              <h3 className='text-slate-600 font-dmMono'>Marca de producto : </h3>
              <div onClick={getBrands} className={`${activeButton ? "bg-green-400 text-slate-600" : "bg-slate-300"} cursor-pointer w-[20px] h-[20px] flex justify-center items-center rounded-sm  font-semibold ml-3`}><RiCheckLine /></div>
            </div>
            <select className='w-full rounded-lg p-2 text-slate-500' onChange={onChangeValueAmountStock} value={paramsFilter.brand} name="brand">
              {
                paramsFilter?.marcaSocio === "waliky"
                  ?
                  <>
                    <option value="">filtrar por</option>
                    <option value="waliky" >waliky</option>
                  </>
                  :
                  <>
                    <option value="">filtrar por</option>
                    {
                      LibraryData.brands?.map((brand, index) => {
                        return (
                          <option key={index} value={brand.name} >{brand.name} </option>
                        )
                      })
                    }
                  </>
              }
            </select>
          </div>
          <button disabled={paramsFilter.marcaSocio.length <= 0 && true} className={`h-[40px] w-[200px] p-2 rounded-lg text-slate-800 font-semibold text-l shadow-md capitalize  ${paramsFilter.marcaSocio.length <= 0 ? "bg-gradient-to-l from-gray-400 to-gray-300" : "bg-gradient-to-l from-blue-500 to-blue-400 duration-300 hover:opacity-95"}`} onClick={filterProductHandle}>filtrar</button>
        </div>
        <div className='w-full p-2'>
          <h3 className='font-semibold text-slate-800 '>* se encontro {productsFromFilterByStock.length} productos para la busqueda.</h3>
          <TableStock paginationProducts={paginationProducts} />
        </div>
        <div className='flex gap-5 mt-1 p-2'>
          {
            paginationProducts().length === 0
              ?
              null
              :
              <button onClick={previewPage} className='h-[40px] w-[160px] bg-red-300 text-slate-700 font-semibold rounded-lg shadow-md'>Anterior</button>
          }
          {
            paginationProducts().length < 5
              ?
              null
              :
              <button onClick={nextPage} className='h-[40px] w-[160px] bg-red-300 text-slate-700 font-semibold rounded-lg shadow-md'>Siguiente</button>
          }
        </div>
      </div>
    </LayoutDashboard>
  )
}
export default withUser({
  // whenAuthed: AuthAction.RENDER
  // whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(Stock)