import React, { useEffect, useRef, useState } from 'react'
import styles from '../../styles/registtro-ventas.module.css'
import { useGlobalContext } from '../../context/GlobalContext'
import UpdateProductModal from '../../modals/updateProduct/UpdateProductModal';
import FormUpdate from '../../components/FormUPdate/FormUpdate';
import { AuthAction, useUser, withUser } from 'next-firebase-auth';
import LayoutDashboard from '../../layout/LayoutDashboard';
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
  const { productByCodeToUpdateContext, stateLoaderFromChargerStock, brands, category, LibraryData, getDataUserContext} = useGlobalContext()
  const { loaderChargerStock, productToUpdate } = LibraryData
  const focusRef = useRef<HTMLInputElement>(null)
  const initialValue: CodeProduct = { code: "" }
  const [codeProduct, setCodeProduct] = useState(initialValue)
  const [brandActive, setBrandActive] = useState<boolean>(true)
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
    setBrandActive(!brandActive)
    brands()
  }
  const handleActiveCategory = () => {
    setCategoryActive(!categoryActive)
    category()
  }
  useEffect(() => {
    if (dataUser.id) {
      getDataUserContext(`${dataUser.id}`)
    }
  }, [dataUser])
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
        <h2 className='text-slate-500 text-2xl font font-comfortaa mb-3'>Editar datos de productos</h2>
        <div className='bg-white rounded-lg drop-shadow-md p-3'>
          <label className='capitalize text-slate-600 font-comfortaa'>Codigo de producto</label>
          <input onChange={onChangeCodeValue} ref={focusRef} onKeyDown={testEnter} className={styles.inputCode} type="text" name="code" value={codeProduct.code} placeholder='codigo de barra' />
        </div>
        <FormUpdate brandActive={brandActive} categoryActive={categoryActive} handleActiveBrands={handleActiveBrands} handleActiveCategory={handleActiveCategory} loaderChargerStock={loaderChargerStock} codeProduct={codeProduct.code} item={item}  brands={LibraryData.brands} category={LibraryData.category} setShowUpdateProductModal={setShowUpdateProductModal} showUpdateProductModal={showUpdateProductModal} onChangeItem={onChangeItem} />
        <div>

        </div>
      </div>
    </LayoutDashboard>
  )
}
export default withUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(UpdateProduct)