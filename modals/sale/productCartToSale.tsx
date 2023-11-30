import React, { useEffect, useRef, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalContext';
import TableToSell from '../../components/TableToSell/TableToSell';
import { useUser } from 'next-firebase-auth';
import { todayDate } from '../../dates/date';
import SaleModal from '../../modals/sale/SaleModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BOLETA_SUNAT } from '../../utils/sunat-data-json';
import styles from '../../styles/productCartToSaleModal.module.css'
// import SidebarToSale from '../SidebarToSale/SidebarToSale';
import { createPortal } from 'react-dom';
import SidebarToSale from '../../components/SidebarToSale/SidebarToSale';

interface Props {
  positiveBalance:number,
  findTicket:Ticket
}
const ProductCartToSale = ({positiveBalance, findTicket}:Props) => {
  let container;
  if (typeof window !== "undefined") {
    container = document.getElementById("portal-modal");
  }
  const sidebarSale = useRef<HTMLDivElement>(null)
  const dataUser = useUser()
  const focusRef = useRef<HTMLInputElement>(null)
  const initialValue = { code: "" }
  const { addProductRegisterToSell, LibraryData, showGenerateSale, stateLoader, resetValueToastify, getDataUser, getDataUserContext } = useGlobalContext()
  const [codeBar, setCodeBar] = useState(initialValue)
  const { productToCart, totalAmountToCart, loaderToSell, showSaleModal, productNotFound, tostifyNotificationSales, generateSold } = LibraryData
  const [showTableSales, setShowTableSales] = useState(false)

  const closeSidebarSale = () => {
    setShowTableSales(false)
  }

  const onChangeCodeProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeBar({
      ...codeBar,
      [e.target.name]: e.target.value
    })
  };
  const successToastify = () => {
    console.log('estamos entrando')
    toast.success('venta exitosa!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
  }
  useEffect(() => {
    if(dataUser.id) {
      getDataUserContext(`${dataUser.id}`)
    }
  },[dataUser])
  // console.log('data-registro',dataUser)
  useEffect(() => {

    resetValueToastify()
    if (focusRef.current) {
      focusRef.current.focus();
    }
    if (codeBar.code.length === 13) {
      resetValueToastify()
      setCodeBar(codeBar)
      stateLoader(true)
      addProductRegisterToSell(codeBar.code as string, productToCart)
      setCodeBar(initialValue);
    }
    if (tostifyNotificationSales === 1) {
      successToastify()
    }
  }, [codeBar.code, productToCart, loaderToSell, productNotFound,generateSold])
  const testEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
    new KeyboardEvent('keydown', {
      'key': 'Tab'
    })
  }
  console.log('positiveBalancepositiveBalance',positiveBalance)
  return container
  ? createPortal(
    <div className={styles.containerModal}>
      <div className={styles.containerSale}>
      <>
        <ToastContainer />
        {
          showSaleModal &&
          <SaleModal findTicket={findTicket} generateSold={generateSold} dataUser={dataUser} />
        }
        <div className='relative  w-full px-1'>
    
          <div onClick={() => setShowTableSales(!showTableSales)} className='fixed text-xl border-[2px] md:hidden border-white text-white cursor-pointer bottom-[30px] right-[30px] rounded-full h-[51px] w-[51px] bg-green-400 shadow-md flex z-[400] justify-center items-center'>
            <p onClick={() => setShowTableSales(!showTableSales)}>$</p>
          </div>
          <div className='flex items-center justify-end py-1 px-3 font-comfortaa text-xs'>
            <h3 className='text-lg  text-slate-500'>{todayDate()}</h3>
          </div>
          {productNotFound
            ?
            <div className='my-3 text-red-500'>*{productNotFound}</div>
            :
            null
          }
          {
            productToCart &&
            <>
              <div className='grid grid-cols-1 md:grid-cols-gridSale w-full p-3 md:p-5 h-heightSales'>
              {/* <div className='grid grid-cols-1 md:grid-cols-gridSale w-full p-3 md:p-5 '> */}
                <div className='w-full h-full grid grid-rows-gridRowsSales overflow-y-scroll'>
                  <form className='mb-2'>
                    <div>
                      <input placeholder="ingresa codigo de barra" onKeyDown={testEnter} ref={focusRef} autoFocus value={codeBar.code}
                        onChange={onChangeCodeProduct} name="code" type="text"
                        className='pl-2 border-blue-500 w-full border-[1px] rounded-lg h-[40px] outline-none focus-visible:border-[1px] focus-visible:border-blue-500'
                      />
                    </div>
                  </form>
                  <TableToSell productToCart={productToCart} totalAmountToCart={totalAmountToCart} loaderToSell={loaderToSell}/>
                  {/* <SidebarToSale productToCart={productToCart} totalAmountToCart={totalAmountToCart} loaderToSell={loaderToSell}/> */}
                </div>
                {/* <SideBarTableToSell closeSidebarSale={closeSidebarSale} showTableSales={showTableSales}  totalAmountToCart={totalAmountToCart} productToCart={productToCart} /> */}
                <SidebarToSale positiveBalance={positiveBalance} closeSidebarSale={closeSidebarSale} showTableSales={showTableSales}  totalAmountToCart={totalAmountToCart} productToCart={productToCart} />
              </div>
            </>
          }
        </div>
      </>
      </div>
    </div>,
    container
  )
  : null
}

export default ProductCartToSale