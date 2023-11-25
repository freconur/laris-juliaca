import React from 'react'
import { RiBarChart2Fill, RiMoneyDollarCircleFill, RiDraftFill, RiArchiveDrawerFill, RiArrowLeftSLine } from "react-icons/ri";
import { MdPointOfSale } from "react-icons/md";
import { BsFillBoxFill } from "react-icons/bs";
import { RxUpdate } from "react-icons/rx";
import Link from 'next/link';
import { useGlobalContext } from '../../context/GlobalContext';
import { RiLoader4Line } from "react-icons/ri";

interface Props {
  showSidebarProducts: boolean,
  sidebarProducts: () => void,
  sidebar: () => void
}
const SidebarProducts = ({ sidebar, sidebarProducts, showSidebarProducts }: Props) => {
  const { LibraryData } = useGlobalContext()
  const { getUser } = LibraryData
  return (
    <>
      <div className={`${showSidebarProducts && "left-0 duration-300 "} w-[250px] fixed z-[910]  h-full bg-white duration-300 -left-[300px]`}>
        <div className='flex w-full bg-iconColor'>
          <div onClick={sidebarProducts} className='flex justify-center bg-iconColor items-center hover:opacity-80  cursor-pointer w-[40px] h-[50px] '>
            <RiArrowLeftSLine className='p-1 w-[40px] opacity-60 h-full text-white' />
          </div>
          <h2 className='p-1 h-[50px] flex justify-center items-center text-white text-2xl font-comfortaa'>Productos</h2>
        </div>
        {
          getUser.rol ?
            <ul className='capitalize p-1 font-comfortaa h-full px-2'>
              <li className="rounded-xl text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-sidebarHover hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
                <Link onClick={sidebar} href="/dashboard/productos" className="my-1 w-56 p-2">
                  <BsFillBoxFill className="text-xl block float-left mr-3" />
                  <span className={`text-base flex-1 ml-2 text-md`}>Mis productos</span>
                </Link>
              </li>
              {getUser.rol === "vendedor"
                ?
                null
                :
                <li className="rounded-xl text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-sidebarHover hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
                  <Link onClick={sidebar} href="/dashboard/registro-de-productos" className="my-1 w-56 p-2">
                    <RiDraftFill className="text-xl block float-left mr-3" />
                    <span className={`text-base flex-1 ml-2 text-md`}>Registro de producto</span>
                  </Link>
                </li>
              }
              {getUser.rol === "vendedor"
                ?
                null
                :
                <li className="rounded-xl text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-sidebarHover hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
                  <Link onClick={sidebar} href="/dashboard/cargas-stock" className="my-1 w-56 p-2">
                    <RiBarChart2Fill className="text-xl block float-left mr-3" />
                    <span className={`text-base flex-1 ml-2 text-md`}>Cargas de stock</span>
                  </Link>
                </li>
              }
              {getUser.rol === "vendedor"
                ?
                null
                :
                <li className="rounded-xl text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-sidebarHover hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
                  <Link onClick={sidebar} href="/dashboard/update-product" className="my-1 w-56 p-2">
                    <RxUpdate className="text-xl block float-left mr-3" />
                    <span className={`text-base flex-1 ml-2 text-md`}>actualizar producto</span>
                  </Link>
                </li>
              }

              {/* <li className="rounded-xl text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-sidebarHover hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
          <Link onClick={sidebar} href="/dashboard/stock" className="my-1 w-56 p-2">
            <RiArchiveDrawerFill className="text-xl block float-left mr-3" />
            <span className={`text-base flex-1 ml-2 text-md`}>productos por stock</span>
          </Link>
        </li> */}
            </ul>
            :
            <div className="flex w-full mt-5 items-center m-auto justify-center">
              <RiLoader4Line className="animate-spin text-3xl text-slate-500 " />
              <p className="text-slate-500">cargando...</p>
            </div>
        }
      </div>
    </>
  )
}

export default SidebarProducts