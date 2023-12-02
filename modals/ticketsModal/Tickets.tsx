import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom';
import styles from '../../styles/AnulacionVentaModal.module.css'
import { useGlobalContext } from '../../context/GlobalContext';
import { RiDeleteBack2Line, RiMarkPenFill } from 'react-icons/ri';
import { functionBirthdayDate, hoursUnixDate } from '../../dates/date';
import { findProduct } from '../../reducer/Product';
import AddProductToSale from '../../components/AddProductToSale/AddProductToSale';
import ProductCartToSale from '../sale/productCartToSale';
import CofirmProductToReturn from '../sale/CofirmProductToReturn';
import ConfirmCancelTicket from '../sale/ConfirmCancelTicket';
import ConfirmCancelProduct from '../sale/ConfirmCancelProduct';
interface Props {
  findTicket: Ticket
}
const Tickets = ({ findTicket }: Props) => {
  const { cancelTicketContext, canelTickerOfSaleContext } = useGlobalContext()
  const initialValueAmount = { amount: 0 }
  const { setModalCancellationOfSale, LibraryData } = useGlobalContext()
  const { showCancellationOfsaleModal } = LibraryData
  const [valueAmount, setValueAmount] = useState(initialValueAmount)
  const [catchCode, setCatchCode] = useState<string>("")
  const [count, setCount] = useState<number>(0)
  const [positiveBalance, setPositiveBalance] = useState<number>(0)
  const [showProducToCartModal, setShowProducToCartModal] = useState(false)
  const [confirmDevolucion, setConfirmDevolucion] = useState(false)
  const [confirmCancelTicket, setConfirmCancelTicket] = useState(false)
  const [showConfirmCancelProduct, setShowConfirmCancelProduct] = useState(false)
  const onChangeValueAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueAmount({
      ...valueAmount,
      [e.target.name]: e.target.value
    })
  }
  const findAndUpdateAmount = () => {
    let balance: number
    findTicket.product?.forEach((item) => {
      if (item.code === catchCode) {
        item.warningAmount = false
        if (Number(item.amount) >= Number(valueAmount.amount) && Number(valueAmount.amount) >= 0) {
          item.cancelAmount = Number(valueAmount.amount)
          item.warningAmount = false
          setValueAmount(initialValueAmount)
        } else {
          item.warningAmount = true
        }
      }
    })
  }

  const calculatedBalance = () => {
    let balance: number = 0
    findTicket.product?.map(item => {
      if (item.cancelAmount) {
        balance = balance + Number(item.cancelAmount) * Number(item.price)
      }
    })
    balance && setPositiveBalance(balance)
  }
  const handleConfirmDevolucion = () => {
    setConfirmDevolucion(!confirmDevolucion)
  }
  const showConfirmCancelTicket = () => {
    setConfirmCancelTicket(!confirmCancelTicket)
  }
  const handleShowProductToCartModal = () => {
    setShowProducToCartModal(!showProducToCartModal)
  }
  const handleShowCancelProduct = () => {
    setShowConfirmCancelProduct(!showConfirmCancelProduct)
  }
  const handleCancelTicket = () => {
    cancelTicketContext(findTicket)
    setModalCancellationOfSale(showCancellationOfsaleModal)
  }
  const handleCancelTickeOfSale = () => {
    canelTickerOfSaleContext(findTicket)
  }
  useEffect(() => {
    if (valueAmount.amount !== 0) {
      findAndUpdateAmount()
    }
    setCount(count + 1)
  }, [valueAmount.amount, findTicket.product, catchCode])
  let container;
  if (typeof window !== "undefined") {
    container = document.getElementById("portal-modal");
  }
  console.log('positiveBalance', positiveBalance)
  return container
    ? createPortal(
      <div className={styles.containerModal}>
        <div className={styles.containerSale}>
          {
            confirmDevolucion &&
            <CofirmProductToReturn handleShowProductToCartModal={handleShowProductToCartModal} handleConfirmDevolucion={handleConfirmDevolucion} />
          }
          {
            showConfirmCancelProduct &&
            <ConfirmCancelProduct handleShowCancelProduct={handleShowCancelProduct} handleCancelTickeOfSale={handleCancelTickeOfSale} />
          }
          {
            confirmCancelTicket &&
            <ConfirmCancelTicket handleCancelTicket={handleCancelTicket} showConfirmCancelTicket={showConfirmCancelTicket} />
          }
          <>
            {showProducToCartModal &&
              <ProductCartToSale findTicket={findTicket} positiveBalance={positiveBalance} />
            }
          </>
          <div className='w-full flex justify-between font-dmMono capitalize text-slate-700 mb-5'>
            <div className='flex gap-5'>
              <span>fecha: {`${findTicket.date}`}</span>
              <span>Nro. Ticket: {findTicket.id}</span>
            </div>
            <div>
              <span>hora: {hoursUnixDate(findTicket.timestamp)}</span>
            </div>
          </div>
          <div className='flex justify-between font-dmMono text-slate-700 '>
            <span>Total de ticket: S/ {findTicket.totalAmountCart?.toFixed(2)}</span>
            <div className='flex gap-5 justify-between'>
              <span>efectivo: S/ {findTicket.cash?.amount ? findTicket.cash?.amount.toFixed(2) : 0}</span>
              <span>yape:  S/ {findTicket.yape?.amount ? findTicket.yape?.amount.toFixed(2) : 0}</span>
            </div>
          </div>
          <div className='flex gap-5 font-dmMono capitalize text-slate-700 justify-between items-center mb-2'>
            <div className='flex gap-3'>
              <div>efectivo: {findTicket.cash?.cash === true ? "si" : "no"}</div>
              <div>yape: {findTicket.yape?.yape === true ? "si" : "no"}</div>
            </div>
            <div>Estado: { findTicket.cancel ? "cancelado" : "vigente"}</div>
            {
              positiveBalance ?
                <div onClick={handleConfirmDevolucion} className='p-1 px-3 bg-blue-500 text-white rounded-sm shadow-sm cursor-pointer'>Cambio de producto</div>
                : null
            }
          </div>
          <ul className={styles.list}>
            {
              findTicket.product?.map(item => {
                return (

                  <li className='border-[1px] border-pastel2  text-slate-600 font-nunito p-2' key={item.code}>
                    <div className='flex capitalize justify-between'>
                      <h3>cod: {item.code}</h3>
                      <h3>cantidad: {item.amount}</h3>
                    </div>
                    <div className='flex justify-between'>
                      <h3>{item.description}</h3>
                      <h3>precio: s/ {item.price}</h3>
                    </div>
                    {
                      item.amount === 0 ?
                        null :
                        <div className='flex w-full justify-between'>
                          <span>devolucion: </span>
                          <div className='flex justify-center items-center'>

                            <>
                              <input onClick={() => setCatchCode(`${item.code}`)} onChange={onChangeValueAmount} className='w-[30px] border-[1px] rounded-sm border-pastel10 pl-1 ml-2 outline-none h-[20px]' type="number" name="amount" value={item.cancelAmount} />
                              <RiDeleteBack2Line className='text-red-500 text-xl ml-3 cursor-pointer' />
                            </>
                          </div>
                        </div>

                    }
                    <div>
                      {
                        item.warningAmount === true ?
                          <span className='text-red-500'>* no puedes anular una cantidad mayor a la cantidad vendida</span>
                          : null
                      }
                    </div>
                  </li>
                )
              })
            }
          </ul>
          {
            findTicket.cancel === false ?
              <>
                <p onClick={calculatedBalance} className={`font-dmMono mt-2 cursor-pointer duration-300 hover:text-blue-500 underline text-slate-700 font-semibold`}>Calculo de saldo</p>
                <div className='flex justify-between w-full'>
                  {
                    positiveBalance ?
                      <div className='flex gap-3 items-center justify-between mt-3 w-full'>
                        <div className='flex items-center gap-3'>
                          <span className='capitalize text-slate-500 font-semibold'>saldo disponible:</span>
                          <p className='text-blue-600 font-semibold'>S/ {positiveBalance.toFixed(2)}</p>
                        </div>
                      </div>
                      :
                      null
                  }
                </div>
                {
                  findTicket.cash?.cash && findTicket.yape?.yape
                    ?
                    null
                    :
                    <div onClick={showConfirmCancelTicket} className='p-2 bg-pastel10 rounded-sm mt-3 text-center text-white font-nunito capitalize font-semibold hover:opacity-90 cursor-pointer duration-300'>anular ticket</div>
                }
                {
                  findTicket.cash?.cash && findTicket.yape?.yape || findTicket.yape?.yape && !findTicket.cash?.cash
                    ?
                    null
                    :
                    <div onClick={handleShowCancelProduct} className='p-2 bg-green-400 rounded-sm mt-3 text-center text-white font-nunito capitalize font-semibold hover:opacity-90 cursor-pointer duration-300'>anular producto</div>
                }
              </>
              :
              null
          }



          <div>
            <p className='cursor-pointer text-slate-500 text-center mt-3 underline decoration-solid' onClick={() => setModalCancellationOfSale(showCancellationOfsaleModal)}>cerrar</p>
          </div>
        </div>
      </div>,
      container
    )
    : null
}

export default Tickets