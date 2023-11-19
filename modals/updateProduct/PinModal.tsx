import { createPortal } from 'react-dom';
import styles from '../../styles/UpdatePin.module.css'

const PinModal = () => {
  let container
  if (typeof window !== "undefined") {
    container = document.getElementById("pin-modal");
  }
  return container
    ? createPortal(
      <div className={styles.containerModal}>
        <div className={styles.containerDelete}>
          holis
        </div>
      </div>,
      container
    )
    :
    null
}

export default PinModal