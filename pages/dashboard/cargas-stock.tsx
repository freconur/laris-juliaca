import React, { useEffect, useRef, useState } from 'react'
import LayoutDashboard from '../../layout/LayoutDashboard'
import { useGlobalContext } from '../../context/GlobalContext'
import { RiLoader4Line } from "react-icons/ri";
import { AuthAction, useUser, withUser } from 'next-firebase-auth';
import TestNavbar from '../../components/Navbar/TestNavbar';
import Navbar from '../../components/Navbar/Navbar';

const CargasStock = () => {
  const dataUser = useUser()
  const focusRef = useRef<HTMLInputElement>(null)
  const focusRefStock = useRef<HTMLInputElement>(null)
  const { getDataUser, addStockToProductContext, LibraryData, stateLoaderFromChargerStock, addStockToProductUpdateContext, stateLoaderFromChargerStockAdd } = useGlobalContext()
  const { addStockProduct, loaderChargerStock, loaderChargerStockAdd } = LibraryData
  const initialValue = { code: "" }
  const initialValueStockCharger = { stock: 0 }
  const [codeProduct, setCodeProduct] = useState(initialValue)
  const [stockProductToCharger, setStockProductToCharger] = useState(initialValueStockCharger)
  const onChangeCodeProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeProduct({
      ...codeProduct,
      [e.target.name]: e.target.value
    })
  }
  // useEffect(() => {
  //   if(dataUser.id){
  //     getDataUser(dataUser.id)
  //   }
  // },[dataUser.id, dataUser.id,dataUser])
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
    if (codeProduct.code.length === 13) {
      setCodeProduct(codeProduct)
      stateLoaderFromChargerStock(true)
      addStockToProductContext(codeProduct.code)
      if (focusRefStock.current) {
        focusRefStock.current.focus();
      }
    }
    if (typeof addStockProduct === "string") {
      setCodeProduct(initialValue)
    }
    if (!codeProduct.code) {
      addStockToProductContext(codeProduct.code)
    }
  }, [codeProduct.code])

  const handleCargaStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStockProductToCharger({
      ...stockProductToCharger,
      [e.target.name]: e.target.value
    })
  }
  const testEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // console.log('key', e.key)
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }
  const handleAddStock = (addStockProduct: ProductToCart, stockProductToCharger: StockProductCharger) => {
    stateLoaderFromChargerStockAdd(true)
    addStockToProductUpdateContext(addStockProduct, stockProductToCharger)

    // addStockToProductUpdate(addStockProduct, stockProductToCharger)
    setCodeProduct(initialValue)
    setStockProductToCharger(initialValueStockCharger)
  }
  console.log('stockProductToCharger',stockProductToCharger)
  return (
    <LayoutDashboard>
      <Navbar dataUser={dataUser} />
      <div className='w-full p-3'>
        <h1 className='text-slate-500 text-2xl mb-4 font-dmMono capitalize'>cargas de stock</h1>
        <form className='-wfull'>
          <div className='w-full'>
            <label className='text-slate-400 font-dmMono capitalize'>codigo de producto</label>
            <input placeholder="escribe el codigo del producto" ref={focusRef} autoFocus value={codeProduct.code} onKeyDown={testEnter} name="code" onChange={onChangeCodeProduct} type="text" className='pl-2 border-pastel11 text-slate-500 w-full border-[1px] rounded-lg h-[40px] outline-none focus-visible:border-[1px] focus-visible:border-blue-500 font-dmMono' />
          </div>
        </form>
        <div>
          {loaderChargerStock
            &&
            <div className="flex w-full mt-5 items-center m-auto justify-center">
              <RiLoader4Line className="animate-spin text-3xl text-blue-500 " />
              <p className="text-gray-400">buscando producto...</p>
            </div>
          }

          {addStockProduct
            &&
            typeof addStockProduct === "object"
            &&
            <>
              {loaderChargerStockAdd
                &&
                <div className="flex w-full mt-5 items-center m-auto justify-center">
                  <RiLoader4Line className="animate-spin text-3xl text-blue-500 " />
                  <p className="text-gray-400">agregando carga...</p>
                </div>
              }
              <div className='hidden md:block rounded-sm shadow max-cs:mr-0 mt-5 overflow-auto'>
                <table className='w-full rounded-sm overflow-hidden  border-[1px] '>
                  <thead className='bg-pastel2 border-b-2 text-left border-gray-200 font-nunito capitalize'>
                    <tr className="p-5">
                      <th className="p-2 text-slate-500 text-left">codigo</th>
                      <th className="p-2 text-slate-500 text-left">descripcion</th>
                      <th className="p-2 text-slate-500 text-left">stock disponible</th>
                      <th className="p-2 text-slate-500 text-left">stock a cargar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y  divide-gray-100">
                    <tr className='h-[40px] font-dmMono'>
                      <td className='text-gray-500 px-1 text-left'>{addStockProduct.code}</td>
                      <td className='text-gray-500 px-1 text-left'>{addStockProduct.description}</td>
                      <td className='text-gray-500 px-1 text-left'>{addStockProduct.stock}</td>
                      <td>
                        <input ref={focusRefStock} autoFocus name="stock" onChange={handleCargaStock} type="number" className='w-[100px] border-[1px] border-pastel8 rounded-lg outline-none focus-visible:border-[1px] focus-visible:border-pastel11 pl-3' />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='md:hidden mt-5 w-full border-[1px] border-pastel10 p-2 rounded-sm shadow-md'>
                <div className='flex justify-between items-center font-dmMono text-slate-500'>
                  <span>codigo: {addStockProduct.code}</span>
                  <span className='text-green-600'>stock: {addStockProduct.stock}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='font-dmMono capitalize text-slate-600'>
                    {addStockProduct.description}
                  </span>
                  <span className='text-blue-400 font-dmMono'>
                    carga:
                    <input  ref={focusRefStock} autoFocus name="stock" onChange={handleCargaStock} type="number" className='w-[40px] border-[1px] border-pastel8 rounded-sm outline-none focus-visible:border-[1px] focus-visible:border-pastel11 pl-3 ml-2' />
                  </span>
                </div>
              </div>
              <button disabled={stockProductToCharger.stock <= 0 ? true : false} onClick={() => handleAddStock(addStockProduct, stockProductToCharger)} className={`${stockProductToCharger.stock <= 0 ? "bg-gray-300" : "bg-pastel11"} w-full capitalize text-slate-100 font-semibold h-[40px] rounded-lg mt-5`}>agregar nueva carga de stock</button>
            </>
          }

          {
            addStockProduct &&
            typeof addStockProduct === "string"
            &&
            <p>{addStockProduct}</p>
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
})(CargasStock)
