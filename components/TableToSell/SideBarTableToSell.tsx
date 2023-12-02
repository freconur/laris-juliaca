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
const initialValueAmountsPayment = { yape: "0", cash: "0" }
const initialWarningPayment = { yape: "", opartionId: "", amount: "" }
const SideBarTableToSell = ({ totalAmountToCart, productToCart, showTableSales, closeSidebarSale }: Props) => {
  const { LibraryData, showGenerateSale, paymentTypeContext } = useGlobalContext()
  const { showSaleModal } = LibraryData
  //boleta para sunat
  const [typeProofPayment, setTypeProofPayment] = useState(initialValueComprobante)
  const [operationIdYape, setOperationIdYape] = useState(initialValueOperationId)
  const [warningPayment, setWarningPayment] = useState(initialWarningPayment)
  const [paymentYape, setPaymentYape] = useState(false)
  const [paymentCash, setPaymentCash] = useState(true)
  const [amountPayment, setAmountPayment] = useState(initialValueAmountsPayment)

  const handleChangeProofPayment = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeProofPayment({
      ...typeProofPayment,
      [e.target.name]: e.target.value
    })
  }
  useEffect(() => {
    setAmountPayment(initialValueAmountsPayment)
    setOperationIdYape(initialValueOperationId)
  }, [paymentYape, paymentCash])

  useEffect(() => {
    if (Number(amountPayment.yape) < totalAmountToCart) {
      setWarningPayment({ ...warningPayment, amount: "" })
      if (paymentYape && paymentCash) {
        setAmountPayment({ ...amountPayment, cash: `${totalAmountToCart.toFixed(2)}`, yape: "0" })
      }
      if (paymentYape && paymentCash === false) {
        // console.log('entrando a solo pago con yape')
        setAmountPayment({ yape: `${totalAmountToCart.toFixed(2)}`, cash: "0" })
        // setAmountPayment({ ...amountPayment, yape: `${totalAmountToCart.toFixed()}`, cash: "0" })
      }
      if (paymentYape === false && paymentCash) {
        setAmountPayment({ ...amountPayment, cash: `${totalAmountToCart.toFixed(2)}`, yape: "0" })
      }
    } else {
      setWarningPayment({
        ...warningPayment,
        amount: "monto de yape no puede ser igual o mayor que el total de la venta"
      })
    }
  }, [totalAmountToCart, paymentYape, paymentCash, amountPayment.yape])

  useEffect(() => {
    setAmountPayment({ ...amountPayment, yape: amountPayment.yape, cash: `${(totalAmountToCart - Number(amountPayment.yape)).toFixed(2)}` })
  }, [amountPayment.yape, amountPayment.cash])

  const handleChangeAmountPayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountPayment({
      ...amountPayment,
      [e.target.name]: e.target.value
    })
  }
  const handleChangePaymentType = (value: string) => {
    if (value === "yape") setPaymentYape(!paymentYape)
    if (value === "cash") setPaymentCash(!paymentCash)
  }
  const handleChangeOperationId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOperationIdYape({
      ...operationIdYape,
      [e.target.name]: e.target.value.slice(0, 8)
    })
  }
  const validateDataToActiveModalSold = () => {
    if (paymentYape && amountPayment.yape === "0" && operationIdYape.operationid.length < 7) {
      setWarningPayment({
        ...warningPayment,
        yape: "monto yape es requerido",
        opartionId: "numero de operacion es requerido",
      })
    } else if (paymentYape && amountPayment.yape === "0") {
      setWarningPayment({
        ...warningPayment,
        yape: "monto yape es requerido",
        opartionId: "",

      })
    } else if (paymentYape && operationIdYape.operationid.length < 7) {
      setWarningPayment({
        ...warningPayment,
        opartionId: "numero de operacion es requerido",
        yape: "",
      })
    } else {
      showGenerateSale(showSaleModal)
      paymentTypeContext(paymentYape, paymentCash, amountPayment, operationIdYape, totalAmountToCart)
      setOperationIdYape(initialValueOperationId)
      setWarningPayment(initialWarningPayment)
      setAmountPayment(initialValueAmountsPayment)
      setPaymentYape(false)
      setPaymentCash(true)
    }
  }
  return (
    <div className={` grid grid-rows-gridRowsSalesPay rounded-md w-[350px] md:w-full shadow-md ml-2 p-3 z-[500] top-[60px] bottom-0 md:top-0 fixed md:relative md:right-0 duration-300 -right-[900px] bg-white  ${showTableSales && "right-[0px] duration-300"}`}>
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
              <input onChange={() => handleChangePaymentType("yape")} checked={paymentYape && true} name="paymentType" type="checkbox" className='w-[20px] h-[20px] rounded-full mr-2' />
              <div className=''>
                <p className='text-base'>yape</p>
              </div>
            </div>
          </div>

        </div>
        {
          paymentCash && paymentYape ?
            <div className='w-full'>
              <div>
                <label className='text-slate-400 text-base capitalize'>efectivo</label>
                <input onChange={handleChangeAmountPayment} value={amountPayment.cash} name="cash" className={`${warningPayment.amount && 'text-red-500'} w-full rounded-md outline-none border-[1px] pl-3 border-green-400`} type="number" placeholder='monto efectivo' />
              </div>
              <div>
                <label className='text-slate-400 text-base capitalize'>yape</label>
                <input onChange={handleChangeAmountPayment} value={amountPayment.yape} name="yape" className={` w-full rounded-md outline-none border-[1px] pl-3 border-blue-400`} type="number" placeholder='monto yape' />
                {
                  warningPayment.amount && <p className='text-sm font-montserrat mt-2 text-red-600'>*{warningPayment.amount}.</p>
                }
              </div>
              <div className='mt-1'>
                <label className='text-slate-500  font-comfortaa text-base '> N. de operacion yape:</label>
                <input onChange={handleChangeOperationId} value={operationIdYape.operationid} type="number" name="operationid" className='w-full text-slate-400 mt-2 outline-none pl-3 border-orange-400 border-[1px] rounded-md bg-slate-50' />
              </div>
              {warningPayment.yape ? <p className='text-sm font-montserrat mt-2 text-red-600'>*{warningPayment.yape}.</p> : null}
              {warningPayment.opartionId && <p className='text-sm font-montserrat mt-2 text-red-600'>*{warningPayment.opartionId}.</p>}
            </div>
            :
            paymentYape
              ?
              <>
                <div className='mt-4'>
                  <label className='text-slate-500  font-comfortaa text-base '> N. de operacion yape:</label>
                  <input onChange={handleChangeOperationId} value={operationIdYape.operationid} type="number" name="operationid" className='w-full text-slate-400 mt-2 outline-none pl-3 border-orange-400 border-[1px] rounded-md bg-slate-50' />
                </div>
              </>
              :
              null
        }
        {
          paymentYape && !paymentCash &&
            warningPayment.opartionId ?
            <span className='text-sm text-red-500'>*{warningPayment.opartionId}</span>
            : null
        }
      </div>
      <button disabled={productToCart && productToCart?.length === 0 || paymentCash === false && paymentYape === false ? true : false} onClick={validateDataToActiveModalSold} className={`${productToCart && productToCart.length === 0 || paymentCash === false && paymentYape === false ? 'bg-gray-300' : 'bg-blue-400 duration-300 text-md   hover:hover:bg-blue-500'} capitalize font-semibold  rounded-md text-white duration-300 font-nunito shadow-lg w-full p-3 m-auto`}>
        generar venta
      </button>
    </div>
  )
}

export default SideBarTableToSell