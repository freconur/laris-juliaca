import React, { ReactElement, useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'


interface Props {
  totalAmountToCart: number,
  productToCart: ProductToCart[] | undefined,
  showTableSales: boolean,
  closeSidebarSale: () => void
}
const initialValueComprobante = { typeProofPayment: "", }
const initialValueOperationId = { operationid: "" }
const initialValueAmountsPayment = { yape: "", cash:"" }
const SideBarTableToSell = ({ totalAmountToCart, productToCart, showTableSales, closeSidebarSale }: Props) => {
  const { LibraryData, showGenerateSale, paymentTypeContext } = useGlobalContext()
  const { showSaleModal } = LibraryData
  //boleta para sunat
  const [typeProofPayment, setTypeProofPayment] = useState(initialValueComprobante)
  const [operationIdYape, setOperationIdYape] = useState(initialValueOperationId)
  const [paymentYape, setPaymentYape] = useState(false)
  const [paymentCash, setPaymentCash] = useState(true)
  const [amountPayment, setAmountPayment] = useState(initialValueAmountsPayment)
  const handleChangeProofPayment = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeProofPayment({
      ...typeProofPayment,
      [e.target.name]: e.target.value
    })
    //tendria que mandar esta info por el GlobalContext
  }
  useEffect(() => {
    // paymentTypeContext()//esta fguncion ira agregando a la data de library en el context cada vezx que se agrege los datos de la operacion y tambien la montos de yape y cash
    setAmountPayment(initialValueAmountsPayment)
    setOperationIdYape(initialValueOperationId)
  },[ paymentYape, paymentCash])

  const handleChangeAmountPayment = (e:React.ChangeEvent<HTMLInputElement>) => {
    setAmountPayment({
      ...amountPayment,
      [e.target.name]:e.target.value
    })
  }
  console.log('amountPayment',amountPayment)
  const handleChangePaymentType = (value:string) => {
    if(value === "yape") {
      // if(paymentYape === false) {
      // }
      setPaymentYape(!paymentYape)
    }
    if(value === "cash") {
      setPaymentCash(!paymentCash)
    }
  }
  const handleChangeOperationId = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(operationIdYape.operationid.length <= 7) {
      setOperationIdYape({
        ...operationIdYape,
        [e.target.name]: e.target.value
      })
    }else{

      setOperationIdYape({
        ...operationIdYape,
        operationid: operationIdYape.operationid.slice(0,8)
      })
    }
  }

  const sendInfoPayment = () => {
    paymentTypeContext(paymentYape, paymentCash, amountPayment, operationIdYape, totalAmountToCart)
  }
  console.log('totalAmountToCart',totalAmountToCart)
  return (
    <div className={` grid grid-rows-gridRowsSalesPay rounded-md w-[350px] md:w-full shadow-md ml-2 p-3 z-[500] top-[60px] bottom-0 md:top-0 fixed md:relative md:right-0 duration-300 -right-[900px] bg-white  ${showTableSales && "right-[0px] duration-300"}`}>
      {/* <div className={`z-[900] fixed duration-300 drop-shadow-xl -left-[300px] h-full w-[250px] bg-white  ${showSidebar && "left-0 duration-300"}`}> */}
      <div className='text-lg'>
        <div className='flex justify-end px-1 text-slate-200 '>
          <p onClick={closeSidebarSale} className='flex md:hidden justify-center items-center cursor-pointer hover:rounded-full hover:bg-slate-100 h-[30px] w-[30px] duration-300'>X</p>
        </div>
        <div className='flex justify-between p-1 py-[15px] border-b-[1px] border-slate-300 text-slate-600 font-jp'>
          <span className='font-nunito'>Subtotal</span>
          <span>S/ {(totalAmountToCart * 0.82).toFixed(2)}</span>
        </div>
        <div className='flex justify-between p-1 py-[15px] border-b-[1px] border-slate-300 text-slate-600 font-jp'>
          <span className='font-nunito'>I.G.V. 18%</span>
          <span>S/ {(totalAmountToCart * 0.18).toFixed(2)}</span>
        </div>
        <div className='flex justify-between items-center p-1 py-[15px] border-b-[1px] border-slate-300 text-slate-600 font-jp'>
          <span className='text-red-500 font-bold font-nunito'>TOTAL</span>
          <span className='font-bold text-2xl'>S/{totalAmountToCart.toFixed(2)}</span>
        </div>
        {/* <div className='w-full mt-3 '>
          <select onChange={handleChangeProofPayment} name="typeProofPayment" className='w-full outline-none p-3  rounded-md shadow-md'>
            <option value="">Tipo de comprobante</option>
            <option value="03">Boleta</option>
            <option value="01">Factura</option>
          </select>
        </div> */}
        <div className='w-full mt-5  text-slate-500 font-comfortaa flex items-center'>
          <p className='mr-3 text-base'>Tipo de pago: </p>
          <div className='flex flex-wrap'>

          <div className='flex  items-center mr-2'>
            <input onChange={() => handleChangePaymentType("cash")} checked={paymentCash && true} name="paymentType" type="checkbox" className='w-[20px] h-[20px] rounded-full mr-2' />
            <div className=''>
              <p className='text-base'>efectivo</p>
            </div>
          </div>
          <div className='flex  items-center'>
            <input onChange={() => handleChangePaymentType("yape")} name="paymentType" type="checkbox" className='w-[20px] h-[20px] rounded-full mr-2' />
            <div className=''>
              <p className='text-base'>yape</p>
            </div>
          </div>
          </div>
          
        </div>
        {
          paymentCash && paymentYape &&
          <div className='w-full'>
            <div>
              <label className='text-slate-400 text-base capitalize'>efectivo</label>
              <input onChange={handleChangeAmountPayment} name="cash" className='w-full rounded-md outline-none border-[1px] pl-3 border-green-400' type="number" placeholder='monto efectivo'/>
            </div>
            <div>
              <label className='text-slate-400 text-base capitalize'>yape</label>
              <input onChange={handleChangeAmountPayment} name="yape" className='w-full rounded-md outline-none border-[1px] pl-3 border-blue-400' type="number" placeholder='monto yape'/>
            </div>
          </div>
        }
        {
          paymentYape
            ?
            <div className='mt-4'>
              <label className='text-slate-500  font-comfortaa text-base '> N. de operacion yape:</label>
              <input onChange={handleChangeOperationId} value={operationIdYape.operationid} type="number" name="operationid" className='w-full text-slate-400 mt-2 outline-none pl-3 border-orange-400 border-[1px] rounded-md bg-slate-50' />

            </div>

            :
            null
        }
      </div>
      <button disabled={productToCart && productToCart?.length > 0 ? false : true} onClick={() => {showGenerateSale(showSaleModal),sendInfoPayment()}} className={`${productToCart && productToCart.length === 0 ? 'bg-gray-300' : 'bg-blue-400 duration-300 text-md   hover:hover:bg-blue-500'} capitalize font-semibold  rounded-md text-white duration-300 font-nunito shadow-lg w-full p-3 m-auto`}>
        generar venta
      </button>
    </div>
  )
}

export default SideBarTableToSell