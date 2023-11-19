import React from 'react'

interface Props {
  dataStatistics: GeneralStatisticsPerDay[]
}
const TableStatidisticsPerMonth = ({ dataStatistics }: Props) => {
  return (
    <div className='w-full overflow-hidden overflow-y-scroll max-h-[550px] rounded-xl bg-white shadow-md mt-10'>
    {/* <div className='w-full overflow-y-scroll h-[300px] rounded-lg lg:h-[300px] xl:h-[300px]'> */}
      <h2 className='sticky top-0 left-0 right-0 z-10 pl-6 text-xl font-semibold font-nunito oveflow-hidden text-slate-700 py-[18px] bg-white border-b-[1px] border-slate-300'>Indicadores del mes</h2>
    <table className='w-full overflow-y-scroll'>
      <thead className='bg-slate-100 text-slate-500 h-[50px] border-b-[1px] border-slate-300 sticky top-[65px] left-0 right-0 z-10'>
      {/* <thead className='bg-slate-200 border-b-[1px] border-gray-200 text-slate-500 sticky top-0 left-0 right-0 z-10 '> */}
        <tr className='py-[18px] font-nunito capitalize'>
          <th className='text-center '>#</th>
          <th className='text-center '><span className='md:hidden'>i</span> <span className='hidden md:block'>ingresos</span></th>
          <th className='text-center '><span className='md:hidden'>i %</span> <span className='hidden md:block'>ingresos %</span></th>
          <th className='text-center '><span className='md:hidden'>t</span> <span className='hidden md:block'>ticket</span></th>
          <th className='text-center '><span className='md:hidden'>t %</span> <span className='hidden md:block'>ticket %</span></th>
          <th className='text-center '><span className='md:hidden'>t.p.</span> <span className='hidden md:block'>t. promedio</span></th>
          <th className='text-center '><span className='md:hidden'>t.p. %</span> <span className='hidden md:block'>t. promedio %</span></th>
        </tr>
      </thead>
      <tbody className='text-slate-500'>
        {
          dataStatistics &&
          dataStatistics?.map(data => {
            return (
              <tr key={data.date} className='hover:bg-slate-100 cursor-pointer border-b-[1px] border-slate-200 h-[60px]'>
                <td className='text-center'>{data.date}</td>
                <td className='text-center'>{data.dailySales?.toFixed(2)}</td>
                {
                data.growthSales ?
                <td className='text-center'>{`${data.growthSales}`}</td>
                :
                <td className='text-center'>0</td>
                }
                <td className='text-center'>{data.tickets}</td>

                {
                data.growthTicket ?
                <td className='text-center'>{`${data.growthTicket}`}</td>
                :
                <td className='text-center'>0</td>
                }
                <td className='text-center'>{data.averageTicket}</td>

                {
                data.growthAverageTicket ?
                <td className='text-center'>{`${data.growthAverageTicket}`}</td>
                :
                <td className='text-center'>0</td>
                }
                {/* <td className='text-center'>{data.averageTicket}</td> */}
              </tr>

            )
          })
        }
      </tbody>
    </table>

    </div>
  )
}

export default TableStatidisticsPerMonth