interface Props {
  children: JSX.Element | JSX.Element[]
}
const LayoutSales = ({children}:Props) => {
  return (
    <div className='grid grid-cols-gridSale w-[100vw] gap-2'>
      {children}
    </div>
  )
}

export default LayoutSales
