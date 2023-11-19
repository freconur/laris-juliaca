import React, { useEffect, useRef, useState } from 'react'
import { AuthAction, useUser, withUser } from 'next-firebase-auth'
import { useGlobalContext } from '../../context/GlobalContext'
import { RiAddCircleFill, RiEditBoxFill, RiDeleteBin5Fill } from "react-icons/ri";
import Modal from '../../components/Modal/Modal'
import useFormRegisterProduct from '../../hooks/useFormRegisterProduct';
import { onValidate } from '../../utils/validateForm';
import styles from '../../styles/registtro-ventas.module.css'
import { RiLoader4Line } from "react-icons/ri";
import LayoutDashboard from '../../layout/LayoutDashboard';
import Navbar from '../../components/Navbar/Navbar';

const initialStateValues: FormProductValues = {
  code: "",
  description: "",
  price: "",
  category: "",
  brand: "",
  stock: 0,
  // marcaSocio: ""
}
const RegistroDeProductos = () => {
  const focusRef = useRef<HTMLInputElement>(null)
  const dataUser = useUser()
  const {getDataUser, LibraryData, showCategory, showUpdateCategory, marcaSocio, category, brands, showDeleteCategory, showBrands, showUpdateBrands, showDeleteBrands } = useGlobalContext()
  const { loaderRegisterProduct } = LibraryData
  const { form, handleProductValues, handleSubmit, loading, error, equalsOne, setEqualsOne } = useFormRegisterProduct(initialStateValues, onValidate);
  // useEffect(() => {
  //   if(dataUser.id){
  //     getDataUser(dataUser.id)
  //   }
  // },[dataUser.id,dataUser])
  useEffect(() => {
    if (equalsOne === 1) {
      if (focusRef.current) {
        focusRef.current.focus();
      }
      setEqualsOne(equalsOne + 1)
    }

    // if (form.code && form.description && form.price && form.marcaSocio) {
      if (form.code && form.description && form.price) {
      brands()
    }
    // if (form.code && form.description && form.price && form.marcaSocio && form.brand) {
      if (form.code && form.description && form.price && form.brand) {
      category()
    }
    marcaSocio()
  }, [error, loaderRegisterProduct, form])

  const testEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
    new KeyboardEvent('keydown', {
      'key': 'Tab'
    })
  }
  console.log('form', form)
  return (
    <LayoutDashboard>

      <>
      <Navbar dataUser={dataUser}/>
        <Modal />
        <div className='p-3 w-full'>
          <h1 className='text-2xl text-slate-700 font-dmMono capitalize mb-3'>
            Registro de productos
          </h1>
          <form className='grid gap-3 font-nunito w-full' onSubmit={handleSubmit}>
            <div className='w-full'>
              <label className={styles.labelForm}>Codigo de barra de producto</label>
              <input ref={focusRef} onKeyDown={testEnter} onChange={handleProductValues} value={form.code} name="code" className={styles.inputCode} type="text" />
              {error?.code &&
                <div className='text-red-500'>
                  *{error?.code}
                </div>
              }
            </div>
            <div className='w-full'>
              <label className={styles.labelForm}>Descripcion de producto</label>
              <input onChange={handleProductValues} value={form.description} name="description" className={styles.inputCode} type="text" />
              {error?.description &&
                <div className='text-red-500'>
                  *{error?.description}
                </div>
              }
            </div>
            <div>
              <label className={styles.labelForm}>Precio de producto</label>
              <input onChange={handleProductValues} value={form.price} name="price" className={styles.inputCode} type="text" />
              {error?.price &&
                <div className='text-red-500'>
                  *{error?.price}
                </div>
              }
            </div>
            {/* <div className=''>
              <div>
                <label className={styles.labelForm}>Marca de socio</label>
                <div className='flex'>
                  <select onChange={handleProductValues} value={form.marcaSocio} name='marcaSocio' className='w-full rounded-lg p-2 text-slate-500'>
                    <option value="">marca de socio</option>
                    {
                      LibraryData.marcaSocio?.map((marcasocio) => {
                        return (
                          <option key={marcasocio.id} value={marcasocio.name}>{marcasocio.name}</option>
                        )
                      })}
                  </select>
                  <div className='text-slate-600 flex '>
                    <div onClick={showBrands} className='p-1 cursor-pointer hover:opacity-90 duration-300'><RiAddCircleFill className='h-[25px] w-[25px]' /></div>
                    <div onClick={showUpdateBrands} className='p-1 cursor-pointer hover:opacity-90 duration-300'><RiEditBoxFill className='h-[25px] w-[25px]' /></div>
                    <div onClick={showDeleteBrands} className='p-1 cursor-pointer hover:opacity-90 duration-300'><RiDeleteBin5Fill className='h-[25px] w-[25px]' /></div>
                  </div>

                </div>
                <div>

                  {error?.marcaSocio &&
                    <div className='text-red-500'>
                      *{error?.marcaSocio}
                    </div>
                  }
                </div>
              </div>
            </div> */}
            <div className=''>
              <div>
                <label className={styles.labelForm}>Marca de producto</label>
                <div className='flex'>
                  <select onChange={handleProductValues} value={form.brand} name='brand' className='w-full rounded-lg p-2 text-slate-500'>
                    <option value="">marca</option>
                    {
                      form.code && form.description && form.price ?

                        LibraryData.brands?.map((brand) => {
                          return (
                            <option key={brand.id} value={brand.name}>{brand.name}</option>
                          )
                        })
                        :
                        null
                    }

                  </select>
                  <div className='text-slate-600 flex '>
                    <div onClick={showBrands} className='p-1 cursor-pointer hover:opacity-90 duration-300'><RiAddCircleFill className='h-[25px] w-[25px]' /></div>
                    <div onClick={showUpdateBrands} className='p-1 cursor-pointer hover:opacity-90 duration-300'><RiEditBoxFill className='h-[25px] w-[25px]' /></div>
                    <div onClick={showDeleteBrands} className='p-1 cursor-pointer hover:opacity-90 duration-300'><RiDeleteBin5Fill className='h-[25px] w-[25px]' /></div>

                  </div>

                </div>
                <div>

                  {error?.brand &&
                    <div className='text-red-500'>
                      *{error?.brand}
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className=''>
              <div>
                <label className={styles.labelForm}>Categoria de producto</label>
                <div className='flex'>
                  <select onChange={handleProductValues} value={form.category} name='category' className='w-full rounded-lg p-2 text-slate-500'>
                    <option value="">categoria</option>
                    {
                      form.code && form.description && form.price && form.brand ?
                        LibraryData.category?.map((cat) => {
                          return (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                          )
                        })
                        :
                        null
                    }
                  </select>
                  <div className='text-slate-600 flex'>
                    <div className='p-1 cursor-pointer hover:opacity-90 duration-300' onClick={showCategory}><RiAddCircleFill className='h-[25px] w-[25px]' /></div>
                    <div className='p-1 cursor-pointer hover:opacity-90 duration-300' onClick={showUpdateCategory}><RiEditBoxFill className='h-[25px] w-[25px]' /></div>
                    <div className='p-1 cursor-pointer hover:opacity-90 duration-300' onClick={showDeleteCategory}><RiDeleteBin5Fill className='h-[25px] w-[25px]' /></div>
                  </div>
                </div>
                {error?.category ?
                  <div className='text-red-500'>
                    *{error?.category}
                  </div> : null}

              </div>
            </div>
            <button className='rounded-lg bg-pastel11 p-1 text-white h-[40px] shadow-lg'>agregar nuevo producto</button>
            {
              loaderRegisterProduct &&
              <div className="flex w-full mt-5 items-center m-auto justify-center">
                <RiLoader4Line className="animate-spin text-3xl text-pastel11 " />
                <p className="text-gray-400">registrando producto...</p>

              </div>
            }
          </form>
        </div>
      </>
    </LayoutDashboard>
  )
}
export default withUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(RegistroDeProductos)