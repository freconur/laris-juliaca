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
  const { getDataUser,filterProductByStock, LibraryData, brands, nextProductsFilterByStockContext, previousProductsFilterByStockContext } = useGlobalContext()
  const { productsFromFilterByStock, lastDocumentProductsByStock, previousDocumentProductsByStock } = LibraryData
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
  }, [paramsFilter.stock])

  const paginationProducts = () => {

    return productsFromFilterByStock.slice(currentPage, currentPage + 5)
  }
  const getBrands = () => {
    brands()
    setActiveButton(!activeButton)
  }
  const filterProductHandle = () => {
    filterProductByStock(paramsFilter, lastDocumentProductsByStock)
  }
  const handleNextProductsList = () => {
    nextProductsFilterByStockContext(lastDocumentProductsByStock,paramsFilter)
  }
  const handlePreviousProductsList = () => {
    previousProductsFilterByStockContext(previousDocumentProductsByStock,paramsFilter)
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
              <option value={0}> igual a 0 </option>
              <option value={10}>menores a 10 </option>
              {/* <option value={10 as number}>menores a 10 </option> */}
            </select>
          </div>
          
          {/* <button disabled={paramsFilter.marcaSocio.length <= 0 && true} className={`h-[40px] w-[200px] p-2 rounded-lg text-slate-800 font-semibold text-l shadow-md capitalize  ${paramsFilter.marcaSocio.length <= 0 ? "bg-gradient-to-l from-gray-400 to-gray-300" : "bg-gradient-to-l from-blue-500 to-blue-400 duration-300 hover:opacity-95"}`} onClick={filterProductHandle}>filtrar</button> */}
          <button onClick={filterProductHandle} className='p-3 bg-blue-500 text-white font-semibold'>filtrar</button>
        </div>
        <div className='w-full p-2'>
          <h3 className='font-semibold text-slate-800 '>* se encontro {productsFromFilterByStock.length} productos para la busqueda.</h3>
          <TableStock paginationProducts={paginationProducts} />
        </div>
        <div className='w-full flex gap-3 justify-center'>
          <div onClick={handlePreviousProductsList} className=' p-3 bg-yellow-400 text-white rounded-md shadow-sm font-semibold cursor-pointer'>anterior</div>
          <div onClick={handleNextProductsList} className=' p-3 bg-yellow-400 text-white rounded-md shadow-sm font-semibold cursor-pointer'>siguiente</div>
        </div>
      </div>
    </LayoutDashboard>
  )
}
export default withUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(Stock)