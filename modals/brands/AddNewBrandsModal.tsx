import React, { useState } from 'react'
import { createPortal } from 'react-dom';
import styles from '../../styles/AddNewCategoryModal.module.css'
import { addNewBrand, addNewCategory } from '../../reducer/Product';
import { useGlobalContext } from '../../context/GlobalContext';
interface Props {
  // showModalCategory: boolean,
  // setShowModalCategory: React.Dispatch<React.SetStateAction<boolean>>
}

const AddNewBrandsModal = () => {
  const { showBrands } = useGlobalContext()
const [newCategoryValue, setNewCategoryValue] = useState<Category>({})
  let container;
  if (typeof window !== "undefined") {
    container = document.getElementById("portal-modal");
  }

  const handleChangeValue = (e:React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryValue({
      ...newCategoryValue,
      [e.target.name]:e.target.value
    })
  }
  const handleSubmit = () => {
    console.log('holis')
    addNewBrand(newCategoryValue)
  }
  console.log('newCategoryValue',newCategoryValue)
  return container
    ? createPortal(
      <div className={styles.containerModal}>
        {/* <div className="bg-modal  backdrop-blur-[0.5px] fixed inset-0 z-30 md:hidden"> */}
        <div className={styles.containerDelete}>
          <div>
            <label className={styles.title}>nombre de marca</label>
            <input autoFocus name="name" onChange={handleChangeValue} className={styles.newCategory} type="text" />
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={showBrands} className={styles.buttonCancel}>cancelar</button>
            <button onClick={() => {showBrands(); handleSubmit()}} className={styles.buttonDelete}>agregar</button>
          </div>
        </div>
      </div>,
      container
    )
    : null
}

export default AddNewBrandsModal