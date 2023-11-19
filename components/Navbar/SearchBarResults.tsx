import React from 'react'


interface Props {
  conditionalValue: { description: string },
  handleClickOutside: () => void,
  results: any,
  productToCart:ProductToCart[] | undefined,
  addProductFromNavbar:(code: string) => void,
  testData: (item: string) => any
}
const SearchBarResults = ({conditionalValue, handleClickOutside, results, productToCart, addProductFromNavbar, testData}:Props) => {
  return (
    <>
    {
      conditionalValue.description.length > 0
        ?
        // <div className=' shadow-lg overflow-hidden h-[500px] absolute top-[60px] right-0 md:right-[152px] left-0 md:top-[40px] md:left-[88px] mx-1 my-1 p-2 bg-white rounded-sm'>
        <div className=' shadow-lg z-[60] max-w-[100%] md:min-w-[75%] overflow-hidden h-[500px] fixed top-[45px] border-[1px] border-slate-200 right-0 md:right-[152px] left-0 md:top-[50px] md:left-[88px] mx-1 my-1 p-2 bg-white rounded-sm'>
          <div className='flex justify-between items-center'>
            <h3 className='text-slate-700 capitalize font-dmMono text-lg my-5'>productos relacionados</h3>
            <div onClick={handleClickOutside} className='text-white cursor-pointer text-lg flex justify-center items-center w-[20px] h-[20px] rounded-full bg-red-400 p-3 font-dmMono shadow-lg'>x</div>
          </div>
          {/* <ProductsFromSerach results={results}/> */}
          <div className=' pr-2'>
            {
              results &&
              results.map((item: ProductToCart) => {
                return (
                  productToCart &&
                  <div key={item.id} onClick={() => addProductFromNavbar(`${item?.code}`)} className='w-full my-2 hover:bg-slate-200 border-b-2 cursor-pointer border-slate-100'>
                    <div className='flex justify-between items-center'>
                      <p className='text-slate-600 capitalize font-nunito' dangerouslySetInnerHTML={testData(`${item.code}`)} />
                      {/* <p className='text-slate-600 font-nunito' dangerouslySetInnerHTML={testData(`${item.stock}`)}/> */}
                    </div>
                    <h3 className='text-slate-600 capitalize font-nunito' dangerouslySetInnerHTML={testData(`${item.description}`)} />
                    <div className='flex justify-between items-center'>
                      <div className='flex'>
                        <span className='font-nunito text-slate-600'>marca: </span><p className='text-slate-600 capitalize font-nunito' dangerouslySetInnerHTML={testData(`${item.brand}`)} />
                      </div>
                      <div className='flex'>
                        <span className='font-nunito text-slate-600'>precio: $</span><p className='text-slate-600 capitalize font-nunito' dangerouslySetInnerHTML={testData(`${item.price}`)} />
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        :
        null
    }
    </>
  )
}

export default SearchBarResults