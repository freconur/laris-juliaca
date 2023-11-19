const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "setiembre", "octubre", "noviembre", "diciembre"]
const monthNumber = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
const days = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]

export const todayDateArray = () => {
  const date:Date = new Date()
  const today = {
    momth: months[date.getMonth()],
    year:date.getFullYear()
  }
  return today
}

export const todayDate = () => {
  const date = new Date()
  return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} del ${date.getFullYear()}`
}

export const currentMonth = () => {
  const date = new Date()
  return months[date.getMonth()]
}
export const currentYear = () => {
  const date = new Date()
  return `${date.getFullYear()}`
}
export const currentDate = () => {
  const date = new Date()
  return `${date.getDate()}`
}
export const functionDateConvert = (date: Date) => {
  return `${date.getDate()}/${monthNumber[date.getMonth()]}/${date.getFullYear().toString().slice(2, 4)}`
}
export const dateConvertObject = (date:Date) => {
  return {
    date:date.getDate(),
    month:months[date.getMonth()],
    year:Number(date.getFullYear())
  }
}
export const numberToNameMonth = (value:number) => {
  // const date = new Date()
  return months[value]
}