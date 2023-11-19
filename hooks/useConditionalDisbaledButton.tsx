import React, { useState } from 'react'

const useConditionalDisbaledButton = (productValuesForm:FormProductValues) => {
  const [disabledButton, setDisabledButton] = useState<boolean>(true)
  if(productValuesForm.brand || productValuesForm.category || productValuesForm.code || productValuesForm.description || productValuesForm.price || productValuesForm.stock) {
    setDisabledButton(false)
  } 
  if(!productValuesForm.brand || !productValuesForm.category || !productValuesForm.code || !productValuesForm.description || !productValuesForm.price || !productValuesForm.stock) {
    setDisabledButton(true)
  }
  return (
    <div>useConditionalDisbaledButton</div>
  )
}

export default useConditionalDisbaledButton