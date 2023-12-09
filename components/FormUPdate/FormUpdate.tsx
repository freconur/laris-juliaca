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
        <DeleteProductModal showDeleteProductModal={showDeleteProductModal} setShowDeleteProductModal={setShowDeleteProductModal} code={item.code as string} />
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
                <div className="mt-3">
                  <label className='text-slate-500 font-comfortaa capitalize '>
                    codigo :
                  </label>
                  <div className='flex gap-4'>
                    <input disabled={true} className={styles.inputCode} type="text" placeholder={item?.code} />
                    <button onClick={() => setShowDeleteProductModal(!showDeleteProductModal)} className='p-1 border-[1px] border-red-400 text-red-400 hover:text-white hover:duration-300 hover:bg-red-400 duration-300 capitalize rounded-md shadow-sm font-semibold cursor-pointer'>eliminar</button>
                  </div>
                </div>
                <div className="mt-3">
                  <label className='text-slate-500 font-comfortaa capitalize '>
                    descripcion :
                  </label>
                  <input onChange={onChangeItem} name="description" className={styles.inputCode} type="text" value={item?.description} />
                </div>
                <div className="mt-3">
                  <label className='text-slate-500 font-comfortaa capitalize '>
                    precio :
                  </label>
                  <input onChange={onChangeItem} name="price" className={styles.inputCode} type="text" value={item?.price} />
                </div>
                <div className="mt-3">
                  <label className='text-slate-500 font-comfortaa capitalize '>
                    stock :
                  </label>
                  <input onChange={onChangeItem} name="stock" className={styles.inputCode} value={item?.stock} type="text" placeholder={item?.stock} />
                </div>
                <div className="mt-3">
                  <label className='text-slate-500 font-comfortaa capitalize '>
                    marca :
                  </label>
                  <div className='w-full flex gap-4 justify-center items-center'>
                    <select onChange={onChangeItem} name="brand" disabled={brandActive} className='outline-none w-full rounded-lg text-slate-500 capitalize h-[35px]'>
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
                    <button onClick={handleActiveBrands} className={`${!brandActive ? "bg-amber-400 text-white" : "bg-inherit text-amber-400"} w-[30px] h-[30px] border-[1px] border-amber-400  hover:text-white hover:duration-300 hover:bg-amber-400 duration-300 capitalize rounded-md shadow-sm font-semibold cursor-pointer`}>E</button>
                  </div>
                </div>
                <div className="mt-3">
                  <label className='text-slate-500 font-comfortaa capitalize '>
                    categoria :
                  </label>
                  <div className='w-full flex gap-4 justify-center items-center'>
                    <select className="w-full rounded-lg  h-[35px] outline-none  text-slate-500 capitalize" disabled={categoryActive} onChange={onChangeItem}>
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
                    <button onClick={handleActiveCategory} className={`${!categoryActive ? "bg-amber-400 text-white" : "bg-inherit text-amber-400"} w-[30px] h-[30px] border-[1px] border-amber-400  hover:text-white hover:duration-300 hover:bg-amber-400 duration-300 capitalize rounded-md shadow-sm font-semibold cursor-pointer`}>E</button>

                  </div>
                </div>
                <button onClick={() => { setShowUpdateProductModal(!showUpdateProductModal); resetPin() }} className='mt-3 p-3 border-[1px] border-gb-3 text-gb-3 hover:text-white hover:duration-300 hover:bg-gb-3 duration-300 capitalize rounded-md shadow-sm font-semibold cursor-pointer w-full'>actualizar producto</button>
              </>
            }
          </div>
      }
    </div>
  )
}

export default FormUpdate