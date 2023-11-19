import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom';
import styles from '../../styles/AnulacionVentaModal.module.css'
import { useGlobalContext } from '../../context/GlobalContext';
import { RiDeleteBack2Line, RiMarkPenFill } from 'react-icons/ri';

interface Props {
  findTicket: Ticket
}
const Tickets = ({ findTicket }: Props) => {
  const { cancelTicketContext } = useGlobalContext()
  const initialValueAmount = { amount: 0 }
  const { setModalCancellationOfSale, LibraryData } = useGlobalContext()
  const { showCancellationOfsaleModal } = LibraryData
  const [valueAmount, setValueAmount] = useState(initialValueAmount)
  const [catchCode, setCatchCode] = useState<string>("")
  const [count, setCount] = useState<number>(0)

  const onChangeValueAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueAmount({
      ...valueAmount,
      [e.target.name]: e.target.value
    })
  }
  const findAndUpdateAmount = () => {
    findTicket.product?.forEach((item) => {
      if (item.code === catchCode) {
        item.warningAmount = false

        if (Number(item.amount) >= Number(valueAmount.amount)) {
          item.cancelAmount = Number(valueAmount.amount)
          item.warningAmount = false
          setValueAmount(initialValueAmount)

        } else {
          item.warningAmount = true
        }
      }
    })
  }
  const handleCancelTicket = () => {
    cancelTicketContext(findTicket)
    setModalCancellationOfSale(showCancellationOfsaleModal)
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
  return container
    ? createPortal(
      <div className={styles.containerModal}>
        <div className={styles.containerSale}>
          <div className='w-full flex justify-between font-dmMono capitalize text-slate-700 mb-5'>
            <span>fecha: {`${findTicket.date}`}</span>
            <span>#{findTicket.id}</span>

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
                      null:
                    <div className='flex w-full justify-between'>
                      <span>devolucion: </span>
                      <div className='flex justify-center items-center'>

                        <>
                          <input  onClick={() => setCatchCode(`${item.code}`)} onChange={onChangeValueAmount} className='w-[30px] border-[1px] rounded-sm border-pastel10 pl-1 ml-2 outline-none h-[20px]' type="number" name="amount" />
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
          <div onClick={handleCancelTicket} className='p-2 bg-pastel10 rounded-sm mt-3 text-center text-white font-nunito capitalize font-semibold hover:opacity-90 cursor-pointer duration-300'> anular</div>
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