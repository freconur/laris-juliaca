import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom';
import styles from '../../styles/UpdateProduct.module.css'
import { updateProduct } from '../../reducer/UpdateProducts';
import { validateUserPin } from '../../reducer/Product';
import { useGlobalContext } from '../../context/GlobalContext';

interface Props {
  userId: string | null
  setItem: React.Dispatch<React.SetStateAction<ProductToCart>>
  initialValueItem: ProductToCart
  item: ProductToCart
  setShowUpdateProductModal: React.Dispatch<React.SetStateAction<boolean>>
  showUpdateProductModal: boolean
  initialValue: CodeProduct
  setCodeProduct: React.Dispatch<React.SetStateAction<CodeProduct>>
}
const UpdateProductModal = ({ userId, initialValue, setCodeProduct, initialValueItem, setItem, item, setShowUpdateProductModal, showUpdateProductModal }: Props) => {
  const { validateUserPinContext, LibraryData, resetPin,updateProductContext } = useGlobalContext()
  const { validatePin } = LibraryData
  const [activePin, setActivePin] = useState(true)
  const [valuePin, setValuePin] = useState({ pin: "" })
  let container
  if (typeof window !== "undefined") {
    container = document.getElementById("portal-modal");
  }

  const validatePins = async () => {
    userId && validateUserPinContext(userId, valuePin.pin)
  }
  useEffect(() => {
    validatePins()
  }, [valuePin.pin])
  const handleChangePin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValuePin({
      ...valuePin,
      [e.target.name]: e.target.value
    })
  }
  const update = () => {
    updateProductContext(item)
    // updateProduct(item);
    setItem(initialValueItem);
    setShowUpdateProductModal(!showUpdateProductModal)
    setCodeProduct(initialValue)
    resetPin()
  }
  return container
    ? createPortal(
      <div className={styles.containerModal}>
        <div className={styles.containerDelete}>
          {
            validatePin === false
              ?
              <div className='w-full grid '>
                <div className='flex justify-end items-center font-nunito '>
                  <span onClick={() => setShowUpdateProductModal(!showUpdateProductModal)} className='text-2xl capitalize text-blue-400 cursor-pointer'>x</span>
                </div>
                <span className=' font-dmMono m-auto text-white capitalize mb-3 '>pin de usuario</span>
                <input name="pin" type="password" className='rounded-md h-[40px] outline-none pl-3' onChange={handleChangePin} />
              </div>
              :
              <>
                <h3 className={styles.title}>Estas seguro que quieres actualizar los datos de este producto?, si es asi, dale en actualizar.</h3>
                <div className={styles.buttonContainer}>
                  {/* <button onClick={() => setShowModalDeleteFlashcard(!showModalDeleteFlashcard)} className={styles.buttonCancel}>cancelar</button> */}
                  <button onClick={() => setShowUpdateProductModal(!showUpdateProductModal)} className={styles.buttonCancel}>cancelar</button>
                  {/* <button onClick={handleDeleteFlashcard} className={styles.buttonDelete}>OK</button> */}
                  <button onClick={update} className={styles.buttonDelete}>actualizar</button>
                </div>
              </>
          }
        </div>
      </div>,
      container
    )
    : null;
}

export default UpdateProductModal