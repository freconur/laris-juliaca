import React, { useRef, useState } from 'react'
import { createPortal } from 'react-dom';
import styles from '../../styles/AddNewCategoryModal.module.css'
import { addNewCategory, updateBrand, updateCategory } from '../../reducer/Product';
import { useGlobalContext } from '../../context/GlobalContext';
interface Props {
  // showModalUpdateCategory: boolean,
  // setShowModalUpdateCategory: React.Dispatch<React.SetStateAction<boolean>>,
  // category: Category[] | undefined
}

const UpdateBrandsModal = ({  }: Props) => {
  const { LibraryData, showUpdateBrands } = useGlobalContext()
  const { brands} = LibraryData
  const [updateBrandsValues, setUpdateBrandsValue] = useState<Brands>({})
  let container;
  if (typeof window !== "undefined") {
    container = document.getElementById("portal-modal");
  }

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUpdateBrandsValue({
      ...updateBrandsValues,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = () => {
    // const findBrands = Brands?.find((cat)=> cat.id === newBrandsValue.id)
    // console.log('findBrands',findBrands)
    if(updateBrandsValues && updateBrandsValues) {
      updateBrand({id:updateBrandsValues.id, name:updateBrandsValues.name})
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
              <h3 className=''>selecciona la marca a editar </h3>
              <select className='w-full h-[40px] rounded-lg' name="id" onChange={handleChangeValue}>
                <option value="">marcas</option>
                {brands?.map(cat => {
                  return (
                    <option id={cat.id} key={cat.id}  value={cat.id}>{cat.name}</option>
                  )
                })}
              </select>
            </div>
            <div>
              <label className={styles.title}>nombre de marca</label>
              <input name="name" disabled={updateBrandsValues.id ? false : true} placeholder={updateBrandsValues.name} onChange={handleChangeValue} className={styles.newCategory} type="text" />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={showUpdateBrands} className={styles.buttonCancel}>cancelar</button>
            <button onClick={() => { showUpdateBrands(); handleSubmit() }} className={styles.buttonDelete}>actualizar</button>
          </div>
        </div>
      </div>,
      container
    )
    : null
}

export default UpdateBrandsModal