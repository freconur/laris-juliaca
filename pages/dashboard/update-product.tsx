import React, { useEffect, useRef, useState } from 'react'
import styles from '../../styles/registtro-ventas.module.css'
import { useGlobalContext } from '../../context/GlobalContext'
import { RiLoader4Line } from "react-icons/ri";
import UpdateProductModal from '../../modals/updateProduct/UpdateProductModal';
import FormUpdate from '../../components/FormUPdate/FormUpdate';
import { AuthAction, useUser, withUser } from 'next-firebase-auth';
import LayoutDashboard from '../../layout/LayoutDashboard';
import PinModal from '../../modals/updateProduct/PinModal';
import Navbar from '../../components/Navbar/Navbar';
const initialValueItem = {
  description: "",
  stock: "",
  price: "",
  brand: "",
  category: "",
}

const UpdateProduct = () => {
  const dataUser = useUser()

  const userId = useUser().id
  const { getDataUser,productByCodeToUpdateContext, stateLoaderFromChargerStock, brands, category, LibraryData } = useGlobalContext()
  const { loaderChargerStock, productToUpdate } = LibraryData
  const focusRef = useRef<HTMLInputElement>(null)
  const initialValue: CodeProduct = { code: "" }
  const [codeProduct, setCodeProduct] = useState(initialValue)
  const [brandActive, setBrandActive] = useState<boolean>(true)
  const [pinModal, setPinModal] = useState<boolean>(true)
  const [categoryActive, setCategoryActive] = useState<boolean>(true)
  const [showUpdateProductModal, setShowUpdateProductModal] = useState<boolean>(false)
  const [item, setItem] = useState<ProductToCart>(initialValueItem)

  const onChangeCodeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeProduct({
      ...codeProduct,
      [e.target.name]: e.target.value
    })
  }
  const onChangeItem = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    })
  }
  const handleActiveBrands = () => {
    setBrandActive(!categoryActive)
    brands()
  }
  const handleActiveCategory = () => {
    setCategoryActive(!categoryActive)
    category()
  }
  // useEffect(() => {
  //   if(dataUser.id){
  //     getDataUser(dataUser.id)
  //   }
  // },[dataUser.id])
  useEffect(() => {
    if (codeProduct.code.length === 13) {
      productByCodeToUpdateContext(codeProduct.code)
      stateLoaderFromChargerStock(true)
    }
    if (productToUpdate) {
      setItem(productToUpdate)
    }
  }, [codeProduct.code, productToUpdate.code, dataUser.id,dataUser])

  const testEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
    new KeyboardEvent('keydown', {
      'key': 'Tab'
    })
  }
  console.log('item', item)
  return (
    <LayoutDashboard>
      <Navbar dataUser={dataUser}/>
      <div className='w-full p-2'>
        {
          showUpdateProductModal
            ?
            <UpdateProductModal
              userId={userId}
              initialValueItem={initialValueItem}
              item={item}
              setItem={setItem}
              setShowUpdateProductModal={setShowUpdateProductModal}
              showUpdateProductModal={showUpdateProductModal}
              initialValue={initialValue}
              setCodeProduct={setCodeProduct}
            />
            :
            null
        }
        <div className='bg-white rounded-lg drop-shadow-md p-2'>
          <label className='capitalize text-slate-600 font-dmMono'>ingresa codigo de producto</label>
          <input onChange={onChangeCodeValue} ref={focusRef} onKeyDown={testEnter} className={styles.inputCode} type="text" name="code" value={codeProduct.code} placeholder='ingresa un codigo' />
        </div>
        <FormUpdate handleActiveBrands={handleActiveBrands} handleActiveCategory={handleActiveCategory} loaderChargerStock={loaderChargerStock} codeProduct={codeProduct.code} item={item} brandActive={brandActive} brands={LibraryData.brands} category={LibraryData.category} setShowUpdateProductModal={setShowUpdateProductModal} showUpdateProductModal={showUpdateProductModal} onChangeItem={onChangeItem} categoryActive={categoryActive} />
        <div>

        </div>
      </div>
    </LayoutDashboard>
  )
}
export default withUser({
  // whenAuthed: AuthAction.RENDER
  // whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(UpdateProduct)