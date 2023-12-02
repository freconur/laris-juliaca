import React from 'react'
import { createPortal } from 'react-dom';
import styles from '../../styles/ConfirmProductToReturnModal.module.css'

interface Props {
  handleShowCancelProduct: () => void,
  handleCancelTickeOfSale: () => void,
}
const ConfirmCancelProduct = ({handleShowCancelProduct,handleCancelTickeOfSale}: Props) => {

  const submitCancelTicket = () => {
    handleCancelTickeOfSale()
    handleShowCancelProduct()
  }
  let container;
  if (typeof window !== "undefined") {
    container = document.getElementById("confirm-modal")
  }
  return container ?
    createPortal(
      <div className={styles.containerModal}>
        <div className={styles.containerSale}>
          <h1 className='text-slate-700 '>Estas seguro que quieres anular productos?, esto no se puede revertir, si estas seguro?, dale a CONTINUAR.</h1>
          <div className='flex gap-5 items-center justify-center mt-5'>
              <div onClick={handleShowCancelProduct} className='text-red-500 cursor-pointer'>cancelar</div>
              <div onClick={submitCancelTicket} className='bg-green-400 p-3 cursor-pointer text-white font-semibold font-montserrat rounded-sm  shadow-sm '>CONTINUAR</div>
          </div>
        </div>
    </div>,
      container
    )
    :
    null
}

export default ConfirmCancelProduct