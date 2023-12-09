
import { getAuth, signOut } from 'firebase/auth'
import React, { useEffect, useRef, useState } from 'react'
import { authApp } from '../../firebase/firebase.config'
import { RiMenuFill } from "react-icons/ri";
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { useGlobalContext } from '../../context/GlobalContext';
import { toast } from 'react-toastify';
import { nameUser } from '../../utils/validateForm';
import UserOptions from './UserOptions';
import SearchBarResults from './SearchBarResults';
import SearchBar from './SearchBar';
interface Props {
  dataUser: any
}
const Navbar = ({ dataUser }: Props) => {
  // const Navbar = () => {
  const [showOptionsUser, setShowOptionsUser] = useState(false)
  const cerrarSesion = getAuth(authApp)
  const handleLogout = () => {
    signOut(cerrarSesion)
  }
  const closeBoxSearch = useRef<HTMLDivElement>(null)
  const closeBoxSearchInput = useRef<HTMLInputElement>(null)
  const { addProductRegisterToSell, LibraryData, resetToastifyNotificationAddProduct, showSidebarContext } = useGlobalContext()
  const { productToCart, toastifyNotificationAddProduct, getDataUser, showSidebar } = LibraryData
  const [onInput, setOnInput] = useState(false)
  const initialValueInput = { description: "" }
  const [conditionalValue, setConditionalValue] = useState(initialValueInput)
  const [results, setResults] = useState<any>(null)
  const closeUserOptions = useRef<HTMLDivElement>(null)

  const closeUserOptionWithClick = () => {
    setShowOptionsUser(false)
  }
  useOnClickOutside(closeUserOptions, closeUserOptionWithClick)
  const addProductFromNavbar = (code: string) => {
    addProductRegisterToSell(code, productToCart)
  }
  const handleClickOutside = () => {
    setConditionalValue(initialValueInput)
    setOnInput(!onInput)
  }
  const closeBoxSearchWithButton = () => {
    setConditionalValue(initialValueInput)
  }
  useOnClickOutside(closeBoxSearch, handleClickOutside)

  const successToastify = () => {
    toast.success('se agrego producto al carrito', {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
  }
  useEffect(() => {
    resetToastifyNotificationAddProduct()
    if (toastifyNotificationAddProduct === 1) {
      successToastify()
    }
  }, [results, toastifyNotificationAddProduct, getDataUser])
  const changeValueResult = (data: any) => {
    setResults(data)
  }
  const testData = (item: string) => {
    return { __html: item }
  }
  const testEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(e.key)
    if (e.key === 'Escape') {
      handleClickOutside()
    }
    new KeyboardEvent('keydown', {
      'key': 'Tab'
    })
  }
  return (
    <>
      <nav className={`sticky top-0 z-[800] w-full h-[60px] px-2 bg-white shadow-md flex justify-between items-center pl-0 pr-1 pb-1 pt-1 `}>
        <div className='flex gap-1 justify-center items-center'>
          <h1 className=' text-center  bg-iconColor justify-center w-full flex items-center text-3xl capitalize text-white font-comfortaa h-[60px] font-semibold tracking-wider xs:pr-1'>
            <span className='hidden xs:block font-comfortaa text-white text-md'>mypos.</span>
            <span className='xs:hidden font-comfortaa'>MPS</span>
          </h1>
          <RiMenuFill onClick={() => showSidebarContext(!showSidebar)} className="text-3xl w-[50px]  text-gray-600 font-bold cursor-pointer" />
        </div>
        <SearchBar changeValueResult={changeValueResult} conditionalValue={conditionalValue} setConditionalValue={setConditionalValue} />
        <div onClick={() => setShowOptionsUser(!showOptionsUser)} className='relative  flex justify-center cursor-pointer items-center xsm:w-[180px]'>
          {dataUser
            ?
            <>
              {
                dataUser?.email &&
                <div className="flex justify-center items-center relative z-[30]">
                  <div className='flex w-[35px] h-[35px] rounded-full mr-2 bg-sidebarHover justify-center items-center capitalize text-white font-dmMono'>
                    <p>
                      {(dataUser?.email[0])}
                    </p>
                  </div>
                  <p className='font-nunito capitalize text-gray-400'>{nameUser(dataUser?.email)}!</p>

                </div>
              }
              <UserOptions showOptionsUser={showOptionsUser} handleLogout={handleLogout} closeUserOptions={closeUserOptions} />
            </>
            :
            <p>test</p>
          }
        </div>
        <SearchBarResults conditionalValue={conditionalValue} handleClickOutside={handleClickOutside} results={results} productToCart={productToCart} addProductFromNavbar={addProductFromNavbar} testData={testData} />
      </nav>
    </>
  )
}

export default Navbar