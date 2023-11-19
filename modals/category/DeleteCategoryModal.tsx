import React, { useRef, useState } from 'react'
import { createPortal } from 'react-dom';
import styles from '../../styles/AddNewCategoryModal.module.css'
import { addNewCategory, deleteCategory, updateCategory } from '../../reducer/Product';
import { useGlobalContext } from '../../context/GlobalContext';


const DeleteCategoryModal
  = () => {
    const { LibraryData, showDeleteCategory } = useGlobalContext()
    const [deleteCategoryValues, setDeleteCategoryValues] = useState<Category>({})
    let container;
    if (typeof window !== "undefined") {
      container = document.getElementById("portal-modal");
    }

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setDeleteCategoryValues({
        ...deleteCategoryValues,
        [e.target.name]: e.target.value
      })
    }
    const handleSubmit = () => {
      // const findCategory = category?.find((cat)=> cat.id === newCategoryValue.id)
      // console.log('findCategory',findCategory)
      if (deleteCategoryValues && deleteCategoryValues) {
        deleteCategory({ id: deleteCategoryValues.id, name: deleteCategoryValues.name })
      }
    }
    return container
      ? createPortal(
        <div className={styles.containerModal}>
          {/* <div className="bg-modal  backdrop-blur-[0.5px] fixed inset-0 z-30 md:hidden"> */}
          <div className={styles.containerDelete}>
            <div>
              <div className='w-full'>
                <h3 className='mb-3'>selecciona la categoria a eliminar </h3>
                <select className='w-full my-4 h-[40px] rounded-lg' name="id" onChange={handleChangeValue}>
                  <option value="">categoria</option>
                  {LibraryData.category?.map(cat => {
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
              <button onClick={showDeleteCategory} className={styles.buttonCancel}>cancelar</button>
              <button onClick={() => { showDeleteCategory(); handleSubmit() }} className={styles.buttonDelete}>Eliminar</button>
            </div>
          </div>
        </div>,
        container
      )
      : null
  }

export default DeleteCategoryModal
