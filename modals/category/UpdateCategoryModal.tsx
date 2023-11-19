import React, { useRef, useState } from 'react'
import { createPortal } from 'react-dom';
import styles from '../../styles/AddNewCategoryModal.module.css'
import { addNewCategory, updateCategory } from '../../reducer/Product';
import { useGlobalContext } from '../../context/GlobalContext';
interface Props {
  // showModalUpdateCategory: boolean,
  // setShowModalUpdateCategory: React.Dispatch<React.SetStateAction<boolean>>,
  // category: Category[] | undefined
}

const UpdateCategoryModal = ({  }: Props) => {
  const { showUpdateCategory, LibraryData } = useGlobalContext()
  const { category } = LibraryData
  const [updateCategoryValues, setUpdateCategoryValue] = useState<Category>({})
  let container;
  if (typeof window !== "undefined") {
    container = document.getElementById("portal-modal");
  }

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUpdateCategoryValue({
      ...updateCategoryValues,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = () => {
    // const findCategory = category?.find((cat)=> cat.id === newCategoryValue.id)
    // console.log('findCategory',findCategory)
    if(updateCategoryValues && updateCategoryValues) {
      updateCategory({id:updateCategoryValues.id, name:updateCategoryValues.name})
    }
  }
  console.log('LibraryData',LibraryData)
  return container
    ? createPortal(
      <div className={styles.containerModal}>
        {/* <div className="bg-modal  backdrop-blur-[0.5px] fixed inset-0 z-30 md:hidden"> */}
        <div className={styles.containerDelete}>
          <div>
            <div>
              <h3 className=''>selecciona la categoria a editar </h3>
              <select className='w-full h-[40px] rounded-lg' name="id" onChange={handleChangeValue}>
                <option value="">categoria</option>
                {category?.map(cat => {
                  return (
                    <option id={cat.id} key={cat.id}  value={cat.id}>{cat.name}</option>
                  )
                })}
              </select>
            </div>
            <div>
              <label className={styles.title}>nombre de categoria</label>
              <input name="name" disabled={updateCategoryValues.id ? false : true} placeholder={updateCategoryValues.name} onChange={handleChangeValue} className={styles.newCategory} type="text" />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={showUpdateCategory} className={styles.buttonCancel}>cancelar</button>
            <button onClick={() => { showUpdateCategory(); handleSubmit() }} className={styles.buttonDelete}>agregar</button>
          </div>
        </div>
      </div>,
      container
    )
    : null
}

export default UpdateCategoryModal