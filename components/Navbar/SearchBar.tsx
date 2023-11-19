import algoliasearch from 'algoliasearch/lite';
import { useRouter } from 'next/router'
import React from 'react'
import { BsSearchHeart } from 'react-icons/bs';


interface Props {
  conditionalValue: { description: string },
  setConditionalValue: React.Dispatch<React.SetStateAction<{ description: string; }>>,
  changeValueResult: (data:any) => void
}
const searchClient = algoliasearch(`${process.env.NEXT_PUBLIC_APPLICATION_ID_ALGOLIA}`, `${process.env.NEXT_PUBLIC_SEARCH_API_KEY_ALGOLIA}`);
const index = searchClient.initIndex(`${process.env.NEXT_PUBLIC_ALGOLIA_INDEX_ALGOLIA}`)
const SearchBar = ({conditionalValue, setConditionalValue,changeValueResult}:Props) => {
  const { pathname } = useRouter()

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setConditionalValue({
      ...conditionalValue,
      [e.target.name]: e.target.value
    })
    value === ''
      ? changeValueResult(null)
      : performSearch(value)
  }
  const performSearch = async (value: string) => {
    const { hits } = await index.search(value, {
      hitsPerPage: 5
    })
    const results = hits.map((hit: any) => {
      const { objectID: key, _highlightResult } = hit
      const {
        // code: { value: code },
        description: { value: description },
        brand: { value: brand },
        price: { value: price },
        stock: { value: stock },
      } = _highlightResult

      return { key, description, stock, brand, price }
      // return { key, description, code, stock, brand, price }
    })
    changeValueResult(results)
  }
  return (
    <>
      {
        pathname === "/dashboard/registro-ventas"
        &&
        <div className={`${conditionalValue.description.length > 0 ? "rounded-t-lg  overflow-hidden duration-700 absolute md:relative md:top-1 top-[10px] left-[5px] z-[50] right-[5px] w-[95%] mb:w-[338px]" : "relative rounded-lg w-[50px] mb:w-[25%] "} bg-white px-1  border-spacing-0 border-[1px] border-slate-200 flex justify-center items-center w-[10%]  xsm:mx-2 cs:w-[70%] xsm:w-[95%]`}>
          <BsSearchHeart className='text-5xl mb:text-2xl h-[30px] text-slate-300 xsm:text-2xl' />
          <input
            // onKeyDown={testEnter}
            // ref={closeBoxSearchInput}
            name="description"
            onChange={handleChangeValue}
            className={`w-full outline-none  h-[40px] pl-3 text-slate-500 p-1`}
            type="text"
            placeholder="busqueda"
          />
        </div>
      }
    </>
  )
}

export default SearchBar