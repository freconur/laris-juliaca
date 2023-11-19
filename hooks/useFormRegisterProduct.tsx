import React, { SetStateAction, useState } from 'react'
import { useGlobalContext } from '../context/GlobalContext'

const useFormRegisterProduct = (formValues: FormProductValues, onValidate: (form: FormProductValues) => FormProductValues | null) => {
  const { addProduct, loaderRegisterProducts } = useGlobalContext()
  const [form, setForm] = useState<FormProductValues>(formValues)
  const [loading, setLoading] = useState<boolean | Promise<boolean>>(false)
  const [error, setError] = useState<FormProductValues | null>(null)
  const [equalsOne, setEqualsOne] = useState(1)

  const handleProductValues = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    setLoading(true)
    let err = onValidate(form)
    if (err === null) {
      loaderRegisterProducts(true)
        setForm(formValues)
        addProduct(form)
    } else {
      setError(err)
    }
    setEqualsOne(1)
  }
  return {setEqualsOne,equalsOne, form, error, loading,setLoading, handleProductValues, handleSubmit }
}

export default useFormRegisterProduct