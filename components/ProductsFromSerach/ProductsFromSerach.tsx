import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface Props {
  results: ProductToCart[]
}
const ProductsFromSerach = ({results}:Props) => {
  const testData = (item:string) => {
    return { __html: item}
  }
  return (
    <ul>
      {
              results &&
              results.map((item:ProductToCart) => {
                return (
                  <li key={item.code} className='w-full my-2 border-b-2 border-slate-100'>
                    <CopyToClipboard text={item.code as string}>
                    <p className='text-slate-600 font-nunito'>{item.code}</p>
                    <h3 className='text-slate-600 capitalize font-nunito' dangerouslySetInnerHTML={testData(`${item.description}`)} />
                    
                    <div className='flex justify-between items-center'>
                    <p className='text-slate-600 font-nunito'>marca: {item.brand}</p>
                    <p className='text-slate-600 font-nunito'>precio: $ {item.price}</p>
                      </div>
                    </CopyToClipboard>

                  </li>
                  
                )
              })
            }
    </ul>
  )
}

export default ProductsFromSerach