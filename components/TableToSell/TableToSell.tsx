import React, { useEffect, useReducer, useState } from 'react'
import { RiDeleteBin7Fill, RiLoader4Line, RiShoppingCartFill } from "react-icons/ri";
import { useGlobalContext } from '../../context/GlobalContext';
interface Props {
  productToCart: ProductToCart[] | undefined,
  totalAmountToCart: number,
  loaderToSell: boolean
}
const TableToSell = ({ productToCart, totalAmountToCart, loaderToSell }: Props) => {
  const initialAmount = { amount: 0 }
  const { deleteProductCart, incrementAmountToItemFromCart } = useGlobalContext()
  const [valueInputAmount, setValueInputAmount] = useState(initialAmount)
  const [itemcode, setItemCode] = useState<string>("")

  const handleClickItem = (code: string) => {
    setItemCode(code)
  }
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInputAmount({
      ...valueInputAmount,
      [e.target.name]: e.target.value
    })
  }
  useEffect(() => {
    incrementAmountToItemFromCart(valueInputAmount.amount, itemcode)
  }, [valueInputAmount.amount])

  return (
    <div className='rounded-sm overflow-y-scroll  max-cs:mr-0 overflow-hidden  md:block w-full'>
      {
        productToCart &&
          productToCart.length > 0

          ?
          <>
            <table className='w-full  bg-white  rounded-md shadow-md relative'>
              <thead className='bg-headerTable border-b-2 border-gray-200 '>
                <tr className="text-slate-400 capitalize font-nunito ">
                  <th className="pl-3 py-3 md:p-2 hidden md:block  w-[20px] text-left">#</th>
                  {/* <th className="py-3 md:p-2  text-left">codigo</th> */}
                  <th className="py-3 md:p-2 pl-1 md:pl-2 text-left ">descripcion</th>
                  {/* <th className="py-3 md:p-2  text-center">stock</th> */}
                  {/* <th className="py-3 md:p-2  text-center">marca</th> */}
                  <th className="py-3 md:p-2  text-center">precio</th>
                  <th className="py-3 md:p-2  text-center">cntd.</th>
                  <th className="py-3 md:p-2  text-center">total</th>
                  <th className="py-3 md:p-2  text-center"></th>

                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {
                  productToCart &&
                  productToCart.length > 0
                  &&
                  productToCart?.map((product, index) => {
                    return (
                      <tr key={product.code} className='h-[100px] hover:bg-hoverTableSale duration-100 cursor-pointer'>
                        <td className='hidden md:block text-slate-500 pl-3 text-left'>{index + 1}</td>
                        {/* <td className='text-slate-500 px-1 text-left'>{product.code}</td> */}
                        <td className='text-slate-500 pl-1 md:pl-2 px-1 text-left'>
                          <div>
                            <p>{product.description}</p>
                            <p>stock: {product.stock}</p>
                          </div>

                        </td>
                        {/* <td className='text-slate-500 px-3 text-center'>{product.stock}</td> */}
                        {/* <td className='text-slate-500 px-3 text-center'>{product.brand}</td> */}
                        <td className='px-3 text-center text-green-500'>S/{product.price}</td>
                        <td className='grid h-[100px] px-1 place-content-center m-auto text-blue-500 font-semibold'>
                          <div className='w-full'>

                            <input value={product.amount} name="amount" onClick={() => handleClickItem(product.code as string)} onChange={onChangeValue} className={`w-[40px] text-center bg-slate-200 rounded-md outline-none pl-1`} type="number" />
                          </div>
                        </td>
                        <td className='text-slate-500 px-1 text-center'>{(Number(product.amount) * Number(product.price)).toFixed(2)}</td>
                        <td className='text-red-300 flex text-xl justify-center items-center w-[40px]'>
                          <div onClick={() => deleteProductCart(productToCart, product.code)} className='flex items-center justify-center cursor-pointer'>
                            <RiDeleteBin7Fill />
                          </div>
                        </td>
                        {
                          product.warning &&
                          <td className="p-2 text-red-500 text-center">*stock</td>
                        }

                      </tr>
                    )
                  })

                }
              </tbody>
            </table>
          </>
          :
          <div className='grid place-content-center h-full w-full'>
            {loaderToSell
              ?
              <div className="flex w-full mt-5 items-center m-auto justify-center">
                <RiLoader4Line className="animate-spin text-3xl text-blue-500 " />
                <p className="text-gray-400">cargando...</p>
              </div>
              :
              <div className='flex text-slate-500 gap-3 items-center'>
                <RiShoppingCartFill className="text-3xl" />
                <p>carrito de compra esta vacio</p>
              </div>
            }
          </div>
      }
    </div >
  )
}

export default TableToSell