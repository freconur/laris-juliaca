import React, { HtmlHTMLAttributes, useRef, useState } from 'react'
import { createPortal } from 'react-dom';
import styles from '../../styles/ModalProductsSearch.module.css'
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface Props {
  results: ProductToCart[]
}
interface iii {
  _html:string | TrustedHTML
}
const ModalProducts = ({results}: Props) => {
    let container;
    if (typeof window !== "undefined") {
      container = document.getElementById("portal-modal");
    }
    const testData = (item:string) => {
      return { __html: item}
    }
   
    
    return container
      ? createPortal(
        <div className={styles.containerModalProducts}>
          {/* <div className="bg-modal  backdrop-blur-[0.5px] fixed inset-0 z-30 md:hidden"> */}
          <div className={styles.modalProducts}>
            {
              results &&
              results.map(item => {
                return (
                  <h3 dangerouslySetInnerHTML={testData(`${item.description}`)} />
                  
                )
              })
            }
          </div>
        </div>,
        container
      )
      : null
  }

export default ModalProducts
