import algoliasearch from 'algoliasearch/lite';
import 'react-toastify/dist/ReactToastify.css';

import { AuthAction, useUser, withUser } from 'next-firebase-auth';
import LayoutDashboard from '../../layout/LayoutDashboard';
import { useGlobalContext } from '../../context/GlobalContext';
import Navbar from '../../components/Navbar/Navbar';
import { useEffect } from 'react';


const MiPerfil = () => {
  const dataUser = useUser()
  const { getDataUserContext, LibraryData } = useGlobalContext()
  const { getUser } = LibraryData
  //debo cargar todos los datos del usuario

  const infoUser = () => {
    if (dataUser) {
      getDataUserContext(`${dataUser.id}`)
    }
  }
  useEffect(() => {
    infoUser()
  }, [dataUser, getUser.id])
  return (
    <LayoutDashboard>
      <Navbar dataUser={dataUser} />
      <>
        <div className="w-full h-full relative p-2">
          <h3 className="text-xl text-slate-700 font-dmMono">{`Dashboard > Mi Perfil`}</h3>
          {getUser &&
            <>
            <div className='bg-white p-2 rouned-md mt-[20px]'>

              <h2 className=" text-2xl font-nunito text-slate-500">Mi informacion</h2>
              <form className='w-full'>
                <div className='flex gap-5 w-full mb-5'>
                  <div className='w-full'>
                    <div>
                      <label className='text-md font-nunito capitalize text-slate-600'>nombres</label>
                    </div>
                    <input type="text" className="capitalize pl-2 bg-slate-100 text-slate-400 rounded-sm outline-none h-[40px] w-full" value={getUser.name} />
                  </div>
                  <div className='w-full'>
                    <div>
                      <label className='text-md font-nunito capitalize text-slate-600'>apellidos</label>
                    </div>
                    <input type="text" className=" capitalize pl-2 bg-slate-100 text-slate-400 rounded-sm outline-none h-[40px] w-full" value={getUser.lastname} />
                  </div>
                </div>
                <div className='flex gap-5 w-full mb-5'>
                  <div className='w-full'>
                    <div>
                      <label className='text-md font-nunito capitalize text-slate-600'>cuenta</label>
                    </div>
                    <input type="text" className="pl-2 capitalize bg-slate-100 text-slate-400 rounded-sm outline-none h-[40px] w-full" value={getUser.acc} />
                  </div>
                  <div className='w-full'>
                    <div>
                      <label className='text-md font-nunito capitalize text-slate-600'>dni</label>
                    </div>
                    <input type="text" className="pl-2 capitalize bg-slate-100 text-slate-400 rounded-sm outline-none h-[40px] w-full" value={getUser.dni} />
                  </div>
                </div>
                <div className='flex gap-5 w-full'>
                  <div className='w-full'>
                    <div>
                      <label className='text-md font-nunito capitalize text-slate-600'>rol de usuario</label>
                    </div>
                    <input type="text" className="pl-2 capitalize bg-slate-100 text-slate-400 rounded-sm outline-none h-[40px] w-full" value={getUser.rol} />
                  </div>
                  <div className='w-full'>
                    <div>
                      <label className='text-md font-nunito capitalize text-slate-600'>fecha de nacimieto</label>
                    </div>
                    {/* <input type="text" className="pl-2 text-slate-400 rounded-sm outline-none h-[40px] w-full" value={getUser.fechaNacimiento?.getDay() a} /> */}
                  </div>
                </div>
              </form>
            </div>
            </>
          }
        </div>
      </>
    </LayoutDashboard>
  )
}
export default withUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(MiPerfil)