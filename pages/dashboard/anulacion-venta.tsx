import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import Tickets from '../../modals/ticketsModal/Tickets'
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { numberToNameMonth } from '../../dates/date';
import { AuthAction, useUser, withUser } from 'next-firebase-auth';
import { BsLayoutSidebar } from 'react-icons/bs';
import LayoutDashboard from '../../layout/LayoutDashboard';
import Navbar from '../../components/Navbar/Navbar';
const AnulacionVenter = () => {
  const dataUser = useUser()
  const { getTicketsContext, LibraryData, setModalCancellationOfSale, getDataUser, getDataUserContext } = useGlobalContext()
  const { getTickets, showCancellationOfsaleModal } = LibraryData
  const [startDate, setStartDate] = useState(dayjs());
  const [minDate, setMinDate] = useState(dayjs(new Date().setFullYear(2023)));
  const [findTicket, setFindTicket] = useState<Ticket>()
  const dateData: DateData = {
    date: startDate.date(),
    month: numberToNameMonth(startDate.month()),
    year: startDate.year(),
  }
  useEffect(() => {
    if(dataUser.id) {
      getDataUserContext(`${dataUser.id}`)
    }
  },[dataUser])
  useEffect(() => {
    //debere colocar la funcion para poder traerme todods los tickets disponibles
    getTicketsContext(dateData)
  // }, [startDate, dataUser.id,dataUser])
}, [startDate])

  const handleClickModal = (ticket: number) => {
    setModalCancellationOfSale(showCancellationOfsaleModal)
    const findTicket: Ticket | undefined = getTickets.find(t => Number(t.id) === ticket)
    setFindTicket(findTicket)
  }
  console.log('getTickets',getTickets)
  return (
    <LayoutDashboard>
      <><Navbar dataUser={dataUser}/></>
      <div className="w-full p-2">
        {
          showCancellationOfsaleModal && findTicket &&
          <Tickets findTicket={findTicket} />
        }
        <h1 className='text-slate-700 text-2xl font-dmMono capitalize my-5'>anulacion de venta</h1>
        <div className='flex justify-end items-center'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker minDate={minDate} value={startDate} onChange={(newValue: any) => setStartDate(newValue)} />
          </LocalizationProvider>
        </div>
        <h3 className='text-slate-600 font-dmMono my-3'>
          tickets de venta
        </h3>
        <ul className='w-full grid gap-3 bg-white p-1'>
          {
            getTickets &&
            getTickets.map(ticket => {
              return (
                <li onClick={() => handleClickModal(Number(ticket.id))} key={ticket.id} className='border-[1px] border-iconColor p-1 rounded-sm w-full flex hover:bg-cardStatisticsIcon duration-300 cursor-pointer justify-between items-center drop-shadow-sm'>
                  <div className='capitalize text-slate-600'>fecha: {`${ticket.date}`}</div>
                  <div className='capitalize text-slate-600'>ticket: {ticket.id}</div>
                </li>
              )
            })
          }
        </ul>
      </div>
    </LayoutDashboard>
  )
}
export default withUser({
  // whenAuthed: AuthAction.RENDER
  // whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(AnulacionVenter)