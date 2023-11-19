import React from 'react'


interface Props {
  dataUser:any
}
const TestNavbar = ( {dataUser}:Props) => {
  console.log('dataUser',dataUser)
  return (
    <div className='flex justify-between items-center h-[60px] w-ful bg-green-400'>
      <div>
        {dataUser.id}
      </div>
      <div>
        {dataUser.email}
      </div>
    </div>
  )
}

export default TestNavbar