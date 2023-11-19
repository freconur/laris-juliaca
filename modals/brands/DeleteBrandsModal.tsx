import React, { useRef, useState } from 'react'
import { createPortal } from 'react-dom';
import styles from '../../styles/AddNewCategoryModal.module.css'
import { deleteBrand } from '../../reducer/Product';
import { useGlobalContext } from '../../context/GlobalContext';


const DeleteBrandsModal
  = () => {
    const { LibraryData, showDeleteBrands } = useGlobalContext()
    const [deleteBrandValues, setDeleteBrandValues] = useState<Brands>({})
    let container;
    if (typeof window !== "undefined") {
      container = document.getElementById("portal-modal");
    }

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setDeleteBrandValues({
        ...deleteBrandValues,
        [e.target.name]: e.target.value
      })
    }
    const handleSubmit = () => {
      // const findBrand = Brand?.find((cat)=> cat.id === newBrandValue.id)
      // console.log('findBrand',findBrand)
      if (deleteBrandValues && deleteBrandValues) {
        deleteBrand({ id: deleteBrandValues.id, name: deleteBrandValues.name })
      }
    }
    return container
      ? createPortal(
        <div className={styles.containerModal}>
          {/* <div className="bg-modal  backdrop-blur-[0.5px] fixed inset-0 z-30 md:hidden"> */}
          <div className={styles.containerDelete}>
            <div>
              <div className='w-full'>
                <h3 className='mb-3'>selecciona la marca a eliminar </h3>
                <select className='w-full my-4 h-[40px] rounded-lg' name="id" onChange={handleChangeValue}>
                  <option value="">categoria</option>
                  {LibraryData.brands?.map(cat => {
                    return (
                      <option id={cat.id} key={cat.id} value={cat.id}>{cat.name}</option>
                    )
                  })}
                </select>
              </div>
              {/* <div>
              <label className={styles.title}>nombre de categoria</label>
              <input name="name" disabled={deleteCategoryValues.id ? false : true} placeholder={deleteCategoryValues.name} onChange={handleChangeValue} className={styles.newCategory} type="text" />
            </div> */}
            </div>
            <div className={styles.buttonContainer}>
              <button onClick={showDeleteBrands} className={styles.buttonCancel}>cancelar</button>
              <button onClick={() => { showDeleteBrands(); handleSubmit() }} className={styles.buttonDelete}>Eliminar</button>
            </div>
          </div>
        </div>,
        container
      )
      : null
  }

export default DeleteBrandsModal
