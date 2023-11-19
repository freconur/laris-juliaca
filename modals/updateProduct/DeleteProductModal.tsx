
import { createPortal } from 'react-dom';
import styles from '../../styles/AddNewCategoryModal.module.css'
import { deleteProduct } from '../../reducer/UpdateProducts';

interface Props {
  showDeleteProductModal:boolean,
  setShowDeleteProductModal: React.Dispatch<React.SetStateAction<boolean>>,
  code: string
}
const DeleteProductModal = ({code, showDeleteProductModal,setShowDeleteProductModal}:Props) => {
  let container
  if (typeof window !== "undefined") {
    container = document.getElementById("portal-modal");
  }
  
  const deleteItem = () => {
    deleteProduct(code as string)
  }
  console.log('codeitem', code)
  return container
  ? createPortal(
    <div className={styles.containerModal}>
      {/* <div className="bg-modal  backdrop-blur-[0.5px] fixed inset-0 z-30 md:hidden"> */}
      <div className={styles.containerDelete}>
        <h3 className={styles.title}>Estas seguro que quieres eliminar este producto?, esto no se puede deshacer, si estas seguro dale a eliminar.</h3>
        <div className={styles.buttonContainer}>
          {/* <button onClick={() => setShowModalDeleteFlashcard(!showModalDeleteFlashcard)} className={styles.buttonCancel}>cancelar</button> */}
          <button onClick={() => setShowDeleteProductModal(!showDeleteProductModal)}  className={styles.buttonCancel}>cancelar</button>
          {/* <button onClick={handleDeleteFlashcard} className={styles.buttonDelete}>OK</button> */}
          <button onClick={deleteItem} className={styles.buttonDelete}>eliminar</button>
        </div>
      </div>
    </div>,
    container
  )
  : null;
}

export default DeleteProductModal