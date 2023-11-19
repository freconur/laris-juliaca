import React, { useEffect } from 'react'
import { BsCashCoin } from "react-icons/bs";
import { currentMonth, currentYear } from '../../dates/date';
import { BsTicketPerforated } from "react-icons/bs";
import { BiMoneyWithdraw } from "react-icons/bi";
interface Props {
  dailySale: number | undefined,
  dailyTicket: number | undefined,
  averageTicket: number | undefined,
  dataTotalSalesPerMonth: number,
  totalSalesYear: number,
  dataSales: number[],
  dataStatistics: GeneralStatisticsPerDay[]
}
const CardEstadisticas = ({ dataStatistics, dataSales, dailySale, dailyTicket, averageTicket, dataTotalSalesPerMonth, totalSalesYear }: Props) => {

  console.log("test", dataSales.length)
  // const getTest = () => {
  //   if (dataSales) {
  //     const rta = ((dataSales[dataSales.length - 1] / dataSales[dataSales.length - 2]) - 1) * 100
  //     // console.log('dataSales[dataSales.length - 1]', dataSales[dataSales.length - 1])
  //     // console.log('dataSales[dataSales.length - 2]', dataSales[dataSales.length - 2])
  //     // console.log('rta', rta.toFixed(2))
  //   }
  // }
  useEffect(() => {
    // getTest()
  }, [dailySale])
  console.log('dailySale cards', dailySale)
  return (
    <>
      {
        dataStatistics &&
        // dataStatistics && dailySale &&
        <div className="  rounded-md grid xl:grid-cols-4 lg:grid-cols-3 xs:grid-cols-2 cs:grid-cols-3  font-nunito gap-5 w-full">
          {/* venta diaria */}
          <div className="w-full h-[150px] rounded-xl p-3 shadow-md bg-white">
            {/* <div className="w-full h-[150px] rounded-sm p-3 drop-shadow-xl bg-gradient-to-r from-gr-1 from-0% via-gr-2 via-80% to-gr-3 to-100%"> */}
            <div className="grid w-full grid-cols-gridCardStat">
              <div className="w-full p-3">
                <div className="text-slate-600 font-bold text-xl capitalize ">Venta diaria</div>
                <div className="text-slate-600 flex gap-3  font-bold">
                  <div className="flex justify-center items-center">
                    <p className='text-3xl'>$ {dailySale?.toFixed(2)}</p>
                    {/* <p>$ {Number(dataStatistics[dataStatistics.length - 1]?.dailySales)}</p> */}
                  </div>
                </div>

              </div>
              <div className="m-auto h-[50px] w-[50px] text-iconColor rounded-xl bg-cardStatisticsIcon p-3">
                <BsCashCoin className="w-full h-full" />
              </div>
            </div>
            <div className="text-slate-400 p-3">
              {
                Number(dataStatistics[dataStatistics.length - 1]?.growthSales) > 0
                  ?
                  <span className="bg-cardTransparent rounded-sm p-1">
                    {Number(dataStatistics[dataStatistics.length - 1]?.growthSales)}
                    % mas que ayer</span>
                  :
                  <span className="bg-cardTransparent rounded-sm p-1">
                    {Number(dataStatistics[dataStatistics.length - 1]?.growthSales)}
                    % menos que ayer</span>
              }
            </div>
          </div>

          {/* ticket diarios */}
          <div className="w-full h-[150px] rounded-xl p-3 shadow-md bg-white">
            <div className="grid w-full grid-cols-gridCardStat">
              <div className="w-full p-3">
                <div className="text-slate-600 font-bold text-xl capitalize">Tickets</div>
                <div className="text-slate-600 flex gap-3  font-bold">
                  <div className="flex justify-center items-center">
                    <p className='text-3xl'># {Number(dataStatistics[dataStatistics.length - 1]?.tickets)}</p>
                  </div>
                </div>

              </div>
              <div className="m-auto h-[50px] w-[50px] text-iconColor rounded-xl bg-cardStatisticsIcon p-3">
                <BsTicketPerforated className="w-full h-full" />
              </div>
            </div>
            <div className="text-slate-400 p-3">
              {
                
                  Number(dataStatistics[dataStatistics.length - 1]?.growthTicket) > 0
                    ?
                    <span className="bg-cardTransparent rounded-sm p-1">
                      {Number(dataStatistics[dataStatistics.length - 1]?.growthTicket)}
                      % mas que ayer</span>
                    :
                    <span className="bg-cardTransparent rounded-sm p-1">
                      {Number(dataStatistics[dataStatistics.length - 1]?.growthTicket)}
                      % menos que ayer</span>
              }
            </div>
          </div>

          {/* ticket promedio */}

          <div className="w-full h-[150px] rounded-xl p-3 shadow-md bg-white">
            <div className="grid w-full grid-cols-gridCardStat">
              <div className="w-full p-3">
                <div className="text-slate-600 font-bold text-xl capitalize">T. promedio</div>
                <div className="text-slate-600 flex gap-3  font-bold">
                  <div className="flex justify-center items-center">
                    <p className='text-3xl'>$ {Number(dataStatistics[dataStatistics.length - 1]?.averageTicket).toFixed(2)}</p>
                  </div>
                </div>

              </div>
              <div className="m-auto h-[50px] w-[50px] text-iconColor rounded-xl bg-cardStatisticsIcon p-3">
                <BiMoneyWithdraw className="w-full h-full" />
              </div>
            </div>
            <div className="text-slate-400 p-3">
            {
                Number(dataStatistics[dataStatistics.length - 1]?.tickets) === 0 && Number(dataStatistics[dataStatistics.length - 1]?.dailySales) === 0 ?

                  null

                  : 
                  Number(dataStatistics[dataStatistics.length - 1]?.growthAverageTicket) > 0
                    ?
                    <span className="bg-cardTransparent rounded-sm p-1">
                      {Number(dataStatistics[dataStatistics.length - 1]?.growthAverageTicket)}
                      % mas que ayer</span>
                    :
                    <span className="bg-cardTransparent rounded-sm p-1">
                      {Number(dataStatistics[dataStatistics.length - 1]?.growthAverageTicket)}
                      % menos que ayer</span>
              }
              
            </div>
          </div>

          {/* ingresos acumlativos del mes */}

          <div className="w-full h-[150px] rounded-xl p-3 shadow-md bg-white">
            <div className="grid w-full grid-cols-gridCardStat">
              <div className="w-full p-3">
                <div className="text-slate-600 font-bold text-xl capitalize">{currentMonth()}</div>
                <div className="text-slate-600 flex gap-3  font-bold">
                  <div className="flex justify-center items-center">
                    <p className='text-3xl'>$ {dataTotalSalesPerMonth && dataTotalSalesPerMonth.toFixed(2)}</p>
                  </div>
                </div>

              </div>
              <div className="m-auto h-[50px] w-[50px] text-iconColor rounded-xl bg-cardStatisticsIcon p-3">
                <BsCashCoin className="w-full h-full" />
              </div>
            </div>
            <div className="text-slate-400 p-3">
              <span className="bg-cardTransparent rounded-sm p-1">25 %</span> menos que ayer
            </div>
          </div>

          {/* ingresos anual */}
          <div className="w-full h-[150px] rounded-xl p-3 shadow-md bg-white">
            <div className="grid w-full grid-cols-gridCardStat">
              <div className="w-full p-3">
                <div className="text-slate-600 font-bold text-xl capitalize">{currentYear()}</div>
                <div className="text-slate-600 flex gap-3  font-bold">
                  <div className="flex justify-center items-center">
                    <p className='text-3xl'>$ {totalSalesYear && totalSalesYear.toFixed(2)}</p>
                  </div>
                </div>

              </div>
              <div className="m-auto h-[50px] w-[50px] text-iconColor rounded-xl bg-cardStatisticsIcon p-3">
                <BsCashCoin className="w-full h-full" />
              </div>
            </div>
            <div className="text-slate-400 p-3">
              <span className="bg-cardTransparent rounded-sm p-1">25 %</span> menos que ayer
            </div>
          </div>

        </div>
      }
    </>
  )
}

export default CardEstadisticas