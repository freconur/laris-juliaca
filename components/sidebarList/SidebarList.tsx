import Link from 'next/link'
import React from 'react'
import { RiBarChart2Fill, RiArrowLeftSLine } from "react-icons/ri";
import { MdPointOfSale } from "react-icons/md";
import { BsFillBoxFill } from "react-icons/bs";
import { BiArchiveOut } from "react-icons/bi";
import { useGlobalContext } from '../../context/GlobalContext';
import { TiTicket } from "react-icons/ti";
import styles from '../../components/sidebarList/SidebarList.module.css'
interface Props {
  showSidebar: boolean,
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>,
  sidebarProducts: () => void
}
const SidebarList = ({ sidebarProducts }: Props) => {
  const { showSidebarContext, LibraryData } = useGlobalContext()
  const { showSidebar } = LibraryData
  return (
    <ul className='capitalize p-1 font-comfortaa h-full px-2'>
      <li className="rounded-xl text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-sidebarHover hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
        <Link onClick={() => showSidebarContext(!showSidebar)} href="/dashboard/estadisticas" className="my-1 w-56 p-2">
          <RiBarChart2Fill className=" text-xl block float-left mr-3" />
          <span className='text-base flex-1 ml-2 text-md'>estadisticas</span>
        </Link>
      </li>
      <li className="rounded-xl text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-sidebarHover hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
        <div className='flex justify-between items-center '>

        <Link onClick={sidebarProducts} href="" className="my-1 w-[200px] p-2">
          <BsFillBoxFill className="text-xl block float-left mr-3" />
          <span className={`text-base flex-1 ml-2 text-md`}>productos</span>

        </Link>
        <Link onClick={sidebarProducts} href="">
        <RiArrowLeftSLine className='rotate-180 text-xl block float-left mr-3 w-[40px] pl-5' />

        </Link>
        </div>
      </li>

      <li className="rounded-xl text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-sidebarHover hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
        <Link onClick={() => showSidebarContext(!showSidebar)} href="/dashboard/registro-ventas" className="my-1 w-56 p-2">
          <MdPointOfSale className="text-xl block float-left mr-3" />
          <span className={`text-base flex-1 ml-2 text-md`}> Punto de venta</span>
        </Link>
      </li>
      
      <li className="rounded-xl text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-sidebarHover hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
        <Link onClick={() => showSidebarContext(!showSidebar)} href="/dashboard/anulacion-venta" className="my-1 w-56 p-2">
          <TiTicket className="text-xl block float-left mr-3" />
          <span className={`text-base flex-1 ml-2 text-md`}>Mis tickets</span>
        </Link>
      </li>
      <li className="rounded-xl text-slate-600 pl-2 text-sm flex items-center gap-x-4 cursor-pointer   mt-2 capitalize   hover:bg-sidebarHover hover:text-white duration-300  whitespace-nowrap my-3 drop-shadow-lg">
        <Link onClick={() => showSidebarContext(!showSidebar)} href="/dashboard/ventas" className="my-1 w-56 p-2">
          <BiArchiveOut className="text-xl block float-left mr-3" />
          <span className={`text-base flex-1 ml-2 text-md`}>ventas</span>
        </Link>
      </li>
    </ul>
  )
}

export default SidebarList