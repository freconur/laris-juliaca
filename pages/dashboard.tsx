import React, { useEffect } from 'react'
import { AuthAction, useUser, withUser } from 'next-firebase-auth'
import LayoutDashboard from '../layout/LayoutDashboard'
import { useGlobalContext } from '../context/GlobalContext'

const Dashboard = () => {
  const dataUser = useUser()
  const { getDataUser, saveDataUser } = useGlobalContext()

  useEffect(() => {
    if (dataUser.displayName && dataUser.photoURL && dataUser.email) {
      saveDataUser({ displayName: dataUser.displayName, photoURL: dataUser.photoURL, email: dataUser.email })
    }
  }, [])
  useEffect(() => {
    if(dataUser.id){
      getDataUser(dataUser.id)
    }
  },[dataUser.id])
  console.log('dataUser', dataUser)
  return (
    <LayoutDashboard>
      <div>
        dashboard
      </div>

    </LayoutDashboard>
  )
}

export default withUser({
  // whenAuthed: AuthAction.RENDER
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
  // whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN
})(Dashboard)
