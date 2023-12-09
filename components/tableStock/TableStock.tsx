import React from 'react'


interface Props {
  paginationProducts: () =>ProductToCart[]
}
const TableStock = ({ paginationProducts }: Props) => {
  return (
    <div className='w-full rounded-lg shadow mt-5 overflow-auto'>
      <table className='w-full rounded-lg overflow-hidden  border-[1px] '>
        <thead className='bg-gb-3 border-b-2 border-gray-200 capitalize '>
          <tr >
            <th className='text-white text-center p-2'>#</th>
            <th className='text-white text-left mr-1'>codigo</th>
            <th className='text-white text-left mr-1'>descripcion</th>
            <th className='text-white text-center mr-1'>marca</th>
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
                  <tr key={item.code} className='hover:bg-slate-200 cursor-pointer '>
                    <td className='text-slate-600 text-center p-2'>{index+1}</td>
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