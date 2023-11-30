import React, { useState } from 'react'
import { createPortal } from 'react-dom';
import styles from '../../styles/SaleModal.module.css'
import { useGlobalContext } from '../../context/GlobalContext';
import { RiLoader4Line } from "react-icons/ri";
import { returnProductFromTicket } from '../../reducer/ventas';

interface Props {
  generateSold: boolean
  dataUser:any,
  findTicket?:Ticket
}

const SaleModal = ({ generateSold, dataUser,findTicket }: Props) => {
  const { soldProducts, LibraryData, showGenerateSale } = useGlobalContext()
  const { productToCart, showSaleModal, warningAmount, paymentData, getUser } = LibraryData
  let container;
  if (typeof window !== "undefined") {
    container = document.getElementById("portal-modal");
  }
  const handleSubmit = () => {
    // soldProducts(productToCart, paymentData,`${getUser.identifier}`)
    console.log('findTicketfindTicket',findTicket)
    soldProducts(productToCart, paymentData, getUser)
    if(Number(paymentData.balanceFromCustomer) > 0){
      if(findTicket) {
        returnProductFromTicket(findTicket)
      }
    }
  }
  return container
    ? createPortal(
      <div className={styles.containerModal}>
        <div className={styles.containerSale}>
          {
            warningAmount.length > 0 
            ?
            <div className={styles.warningAmount}>
            <p className={styles.title}>{warningAmount}</p>
            <div className={styles.optionButtonCancel} onClick={() => showGenerateSale(showSaleModal)}>cancelar</div>
            </div>
            :
            generateSold
              ?
              <div className="flex w-full mt-5 items-center m-auto justify-center">
                <RiLoader4Line className="animate-spin text-3xl text-slate-500 " />
                <p className="text-slate-500">generando venta...</p>
              </div>
                :
                <>
                  <h3 className={styles.title}>Genial estas a un click de generar una venta, dale a <span className='font-semibold'>SI</span> para continuar.</h3>
                  <div className={styles.options}>
                    <div className={styles.optionButtonCancel} onClick={() => showGenerateSale(showSaleModal)}>cancelar</div>
                    <div onClick={handleSubmit} className={styles.optionButtonAgree} >
                      si
                    </div>
                  </div>
                </>
          }
          {/* {
            warningAmount.length > 0 
            &&
            <p>{warningAmount}</p>
          } */}
        </div>
      </div>,
      container
    )
    : null
}

export default SaleModal