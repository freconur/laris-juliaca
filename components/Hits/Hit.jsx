import React, { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';

import 'react-toastify/dist/ReactToastify.css';

const Hit = ({ hit}) => {
  return (
    <>
      {
        hit.code?.length === 13
        ?
        <>
        
          <CopyToClipboard  text={hit.code}>
            < div key={hit.code} className="cursor-pointer w-full bg-white p-1 my-2 rounded-md shadow-sm" >
              <div className="flex justify-between font-nunito  items-center">
                <div className="flex gap-3 justify-between items-center w-full">

                  <div className="text-slate-600 font-dmMono">
                    Cod: {hit.code}
                  </div>
                  <div className="text-green-600">
                    <span className='text-slate-600'>Precio: </span>$ {hit.price}
                  </div>
                </div>

              </div>

              <div className="grid grid-cols-gridMyProducts justify-between">
                <span className="capitalize text-slate-600">
                  {hit.description}
                </span>
                <div className="text-blue-600 text-right">
                  stock: {hit.stock}
                </div>
              </div>

            </div>
          </CopyToClipboard>
        </>

          : null
      }
    </>
  )
}

export default Hit

