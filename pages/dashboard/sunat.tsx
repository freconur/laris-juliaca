import React, { useState } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'

const initialValueFormUser = {username:"", password:""}
const Sunat = () => {
  const [formUser, setFormUser] = useState<UserApisPeru>(initialValueFormUser)
  const {loginApisPeruContext} = useGlobalContext() 
  const formUserOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormUser({
      ...formUser,
      [e.target.name]: e.target.value
    })
  }
  const loginApisPeru = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    loginApisPeruContext(formUser)
  }
  console.log('formUser', formUser)
  return (
    <div>
      <form onSubmit={loginApisPeru}>
        <div>
          <label>usuario</label>
          <input name="username"  onChange={formUserOnChange} type="text" />
        </div>
        <div>
          <label>contrasena</label>
          <input name="password" onChange={formUserOnChange} type="text" />
        </div>
        <button className='p-3 rounded-sm bg-blue-500 text-white font-semibold'>login</button>
      </form>
    </div>
  )
}

export default Sunat