/* globals window */
import React, { FormEventHandler, useEffect, useState } from 'react'
import initAuth from '../initAuth'
import { AuthAction, withUser } from 'next-firebase-auth'
import { useGlobalContext } from '../context/GlobalContext'
import { loginWithGoogle } from '../reducer/google'

initAuth()
const Auth = () => {
  const user = { user:"", password:""}
  const [userData, setUserData] = useState(user)
  const { loginWithEmailContext } = useGlobalContext()
  const [renderAuth, setRenderAuth] = useState(false)

  const handleChangeUservalue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]:e.target.value
    })
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true)
    }
  }, [])
const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  loginWithEmailContext(userData)
} 
  return (
    <div className='grid place-content-center place-items-center h-[100vh]'>
      <div className='p-2 '>
        <div className="flex justify-center items-center mb-10">
          <h1 className='font-sidebar text-5xl capitalize'>libreria </h1>
          <p className='text-sm font-dmMono ml-2 flex items-center justify-center'>18</p>
        </div>
        <form onSubmit={handleSubmit}  className='w-full bg-white  drop-shadow-sm p-2'>
          <div className='mb-3'>
            <label className='text-nunito text-md capitalize text-slate-600 '>usuario</label>
            <input onChange={handleChangeUservalue} name="user" value={userData.user} type="email" className='w-full border-[1px] border-slate-400 h-[40px] rounded-sm outline-none pl-2' />
          </div>
          <div className='mb-3'>
            <label className='text-nunito text-md capitalize text-slate-600 '>contrasena</label>
            <input onChange={handleChangeUservalue} name="password" value={userData.password} type="password" className='w-full border-[1px] border-slate-400 h-[40px] rounded-sm outline-none pl-2' />
          </div>
          <button  className='h-[50px] bg-pastel10 p-2 capitalize text-white w-full font-nunito text-lg rounded-md'>iniciar sesion</button>
        </form> 
      </div>
    </div>
  )
}
export default withUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP
})(Auth)

