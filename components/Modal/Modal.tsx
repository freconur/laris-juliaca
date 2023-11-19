import React from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import AddNewCategoryModal from '../../modals/category/AddNewCategoryModal'
import UpdateCategoryModal from '../../modals/category/UpdateCategoryModal'
import DeleteCategoryModal from '../../modals/category/DeleteCategoryModal'
import AddNewBrandsModal from '../../modals/brands/AddNewBrandsModal'
import DeleteBrandsModal from '../../modals/brands/DeleteBrandsModal'
import UpdateBrandsModal from '../../modals/brands/UpdateBrandsModal'

const Modal = () => {
  const { showModalCategory, showModalUpdateCategory,showModalDeleteCategory,showModalBrands, showModalDeleteBrands, showModalUpdateBrands } = useGlobalContext()
  return (
    <div>
      {showModalCategory && <AddNewCategoryModal />}
      {showModalUpdateCategory && <UpdateCategoryModal />}
      {showModalDeleteCategory && <DeleteCategoryModal />}
      {showModalBrands && <AddNewBrandsModal/>}
      {showModalDeleteBrands && <DeleteBrandsModal/>}
      {showModalUpdateBrands && <UpdateBrandsModal/>}
      {/* {showModalUpdateCategory && <UpdateCategoryModal category={category} showModalUpdateCategory={showModalUpdateCategory} setShowModalUpdateCategory={setShowModalUpdateCategory}/>}
      {showModalDeleteCategory && <DeleteCategoryModal category={category} showModalDeleteCategory={showModalDeleteCategory} setShowModalDeleteCategory={setShowModalDeleteCategory}/>} */}
    </div>
  )
}

export default Modal