import { useState } from 'react';
import { deleteProduct } from '../../reducer/UpdateProducts';
import styles from '../../styles/registtro-ventas.module.css'
import { RiLoader4Line } from "react-icons/ri";
import DeleteProductModal from '../../modals/updateProduct/DeleteProductModal';
import { useGlobalContext } from '../../context/GlobalContext';

interface Props {
  loaderChargerStock: boolean,
  codeProduct: string,
  item: ProductToCart,
  brandActive: boolean,
  brands: Brands[] | undefined,
  category: Brands[] | undefined,
  setShowUpdateProductModal: React.Dispatch<React.SetStateAction<boolean>>,
  showUpdateProductModal: boolean,
  onChangeItem: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void,
  handleActiveBrands: () => void,
  handleActiveCategory: () => void,
  categoryActive: boolean
}
const FormUpdate = ({ categoryActive, handleActiveBrands, handleActiveCategory, onChangeItem, showUpdateProductModal, setShowUpdateProductModal, loaderChargerStock, codeProduct, item, brandActive, brands, category }: Props) => {
  const { resetPin } = useGlobalContext()
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false)
  return (
    <div>
      {
        showDeleteProductModal &&
        <DeleteProductModal showDeleteProductModal={showDeleteProductModal} setShowDeleteProductModal={setShowDeleteProductModal} code={item.code as string}/>
      }
      {loaderChargerStock
        ?
        <div className="flex w-full mt-5 items-center m-auto justify-center">
          <RiLoader4Line className="animate-spin text-3xl text-blue-500 " />
          <p className="text-gray-400">buscando producto...</p>
        </div>
        :
        codeProduct.length === 0
          ?
          <div className='grid place-content-center mt-5 text-slate-500 bg-white rounded-lg drop-shadow-lg  h-[200px] w-full'> Ingresa un codigo de barra para buscar producto </div>
          :
          <div className='bg-white drop-shadow-lg my-4 p-2 rounded-lg'>
            {item?.description
              &&
              <>
                <label className='text-slate-500 font-dmMono capitalize '>
                  codigo :
                </label>
                <div className='flex gap-4'>
                <input disabled={true} className={styles.inputCode} type="text" placeholder={item?.code} />
                <button onClick={() => setShowDeleteProductModal(!showDeleteProductModal)} className='p-1 rounded-md text-white capitalize shadow-md font-semibold bg-pastel10 hover:bg-pastel8 duration-300 '>eliminar</button>
                </div>
                <label className='text-slate-500 font-dmMono capitalize '>
                  descripcion :
                </label>
                <input onChange={onChangeItem} name="description" className={styles.inputCode} type="text" value={item?.description} />
                <label className='text-slate-500 font-dmMono capitalize '>
                  precio :
                </label>
                <input onChange={onChangeItem} name="price" className={styles.inputCode} type="text" value={item?.price} />
                <label className='text-slate-500 font-dmMono capitalize '>
                  stock :
                </label>
                <input onChange={onChangeItem} name="stock" className={styles.inputCode} value={item?.stock} type="text" placeholder={item?.stock} />
                {/* <div className='block'>
                  <label className='text-slate-500 font-dmMono capitalize '>
                    marca de socio :
                  </label>
                  <div className='w-full'>
                    <select name="marcaSocio" onChange={onChangeItem} className='w-full rounded-lg text-slate-500  h-[40px]'>
                      <option value={item?.marcaSocio}>{item?.marcaSocio}</option>
                      <option value="waliky">waliky</option>
                      <option value="waliky-sublimados">waliky-sublimados</option>
                      <option value="libreria18">libreria18</option>
                    </select>
                  </div>
                </div> */}
                <label className='text-slate-500 font-dmMono capitalize '>
                  marca :
                </label>
                <div className='w-full flex gap-4 justify-center items-center'>
                  <select onChange={onChangeItem} name="brand" disabled={brandActive} className='w-full rounded-lg  h-[35px]'>
                    <option value={item?.brand}>{item?.brand}</option>
                    {
                      brands
                      &&
                      brands?.map(brand => {
                        return (
                          <option key={brand.id} value={brand.name}>{brand.name}</option>
                        )
                      })
                    }
                  </select>
                  <button onClick={handleActiveBrands} className='w-[30px] h-[30px] bg-yellow-500 rounded-sm shadow-sm'>E</button>
                </div>
                <label className='text-slate-500 font-dmMono capitalize '>
                  categoria :
                </label>
                <div className='w-full flex gap-4 justify-center items-center'>
                  <select className="w-full rounded-lg  h-[35px]" disabled={categoryActive} onChange={onChangeItem}>
                    <option value={item?.category}>{item?.category}</option>
                    {
                      category
                      &&
                      category?.map(category => {
                        return (
                          <option key={category.id} value={category.name}>{category.name}</option>
                        )
                      })
                    }
                  </select>
                  <button onClick={handleActiveCategory} className='w-[30px] h-[30px] bg-yellow-500 rounded-sm shadow-sm'>E</button>

                </div>
                <button onClick={() => {setShowUpdateProductModal(!showUpdateProductModal); resetPin()}} className='bg-pastel11 hover:bg-pastel12 w-full h-[40px] rounded-lg shadow-lg mt-3 text-slate-700 font-semibold capitalize'>actualizar producto</button>
              </>
            }
          </div>
      }
    </div>
  )
}

export default FormUpdate