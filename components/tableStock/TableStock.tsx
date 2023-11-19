import React from 'react'


interface Props {
  paginationProducts: () =>ProductToCart[]
}
const TableStock = ({ paginationProducts }: Props) => {
  return (
    <div className='w-full rounded-lg shadow mt-5 overflow-auto'>
      <table className='w-full rounded-lg overflow-hidden  border-[1px] '>
        <thead className='bg-pink-600 border-b-2 border-gray-200'>
          <tr className="p-5">
            <th className='text-white text-center'>n*</th>
            <th className='text-white text-left'>codigo</th>
            <th className='text-white text-left'>descripcion</th>
            <th className='text-white text-center'>marca</th>
            <th className='text-white text-center'>stock</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {
            paginationProducts() &&
              paginationProducts().length > 0
              ?
              paginationProducts().map((item, index) => {
                return (
                  <tr key={item.code}>
                    <td className='text-slate-600 text-center'>{index+1}</td>
                    <td className='text-slate-600 text-left'>{item.code}</td>
                    <td className='text-slate-600'>{item.description}</td>
                    <td className='text-slate-600 text-center'>{item.brand}</td>
                    <td className='text-slate-600 text-center'>{item.stock}</td>
                  </tr>
                )
              })
              :
              <tr>
                <td></td>
                <td className='text-gray-500'>no se encontraron productos</td>
              </tr>
          }

        </tbody>
      </table>
    </div>
  )
}

export default TableStock