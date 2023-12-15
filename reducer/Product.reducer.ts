import { todayDate } from "../dates/date";

type LibraryData =
  | { type: "newProduct"; payload: FormProductValues }
  | { type: "brands"; payload: Brands[] }
  | { type: "category"; payload: Category[] }
  | { type: "productToCart"; payload: ProductToCart[] }
  | { type: "cleanCart" }
  | { type: "resetAmountCart" }
  | { type: "currentlyDate" }
  | { type: "productNotFound"; payload: string }
  | { type: "loaderToSell"; payload: boolean }
  | { type: "generateSold"; payload: boolean }
  | { type: "loaderRegisterProduct"; payload: boolean }
  | { type: "dailySale"; payload: number }
  | { type: "dailyTicket"; payload: number }
  | { type: "averageTicket"; payload: number }
  | { type: "addStockProduct"; payload: ProductToCart | string }
  | { type: "loaderChargerStock"; payload: boolean }
  | { type: "loaderChargerStockAdd"; payload: boolean }
  | { type: "marcaSocio"; payload: MarcaSocio[] }
  | { type: "dataSales"; payload: number[] }
  | { type: "dataSalesLabel"; payload: string[] }
  | { type: "dataTotalSalesPerMonth"; payload: number }
  | { type: "totalSalesYear"; payload: number }
  | { type: "productsFromFilterByStock"; payload: ProductToCart[] }
  | { type: "productToUpdate"; payload: ProductToCart }
  | { type: "showSaleModal"; payload: boolean }
  | { type: "tostifyNotificationSales"; payload: number }
  | { type: "incrementAmountToItemFromCart", payload: number, payload2: string, payload3: ProductToCart[] | undefined }
  | { type: "getProductsSales"; payload: ProductToCart[] }
  | { type: "resetToastifyNotificationAddProduct" }
  | { type: "toastifyNotificationAddProduct" }
  | { type: "dataStatistics", payload: GeneralStatisticsPerDay[] }
  | { type: "getTickets", payload: Ticket[] }
  | { type: "showCancellationOfsaleModal", payload: boolean }
  | { type: "saveDataUser", payload: SaveUserData }
  | { type: "getDataUser", payload: User }
  | { type: "validatePin", payload: boolean }
  | { type: "loader", payload: boolean }
  | { type: "showSidebar", payload: boolean }
  | { type: "getUser", payload: User }
  | { type: "warningAmount", payload: string }
  | { type: "paymentData", payload: PaymentInfo }
  | { type:"paymentDataToStadistics", payload: PaymentDataToStatdistics}
  | { type:"dataOfTicketFromDay", payload: BasicDataStatistics}
  | { type:"lastDocumentProductsByStock", payload: any}
  | { type:"previousDocumentProductsByStock", payload: any}
  | { type:"showSidebarSale", payload: boolean}
  

export const Library = {
  showSidebarSale: false as boolean,
  lastDocumentProductsByStock: {} as any,
  previousDocumentProductsByStock: {} as any,
  paymentData: {} as PaymentInfo,
  warningAmount: "" as string,
  loader: true as boolean,
  newProduct: {} as FormProductValues,
  brands: [] as Brands[],
  category: [] as Category[],
  productToCart: [] as ProductToCart[],
  totalAmountToCart: 0 as number,
  currentlyDate: "" as string,
  loaderToSell: false as boolean,
  generateSold: false as boolean,
  productNotFound: "" as string,
  loaderRegisterProduct: false as boolean,
  dailySale: 0 as number,
  dailyTicket: 0 as number,
  averageTicket: 0 as number,
  addStockProduct: "" || {} as ProductToCart | string,
  loaderChargerStock: false as boolean,
  loaderChargerStockAdd: false as boolean,
  marcaSocio: [] as MarcaSocio[],
  dataSales: [] as number[],
  dataSalesLabel: [] as string[],
  dataTotalSalesPerMonth: 0 as number,
  totalSalesYear: 0 as number,
  productsFromFilterByStock: [] as ProductToCart[],
  productToUpdate: {} as ProductToCart,
  showSaleModal: false as boolean,
  tostifyNotificationSales: 0 as number,
  getProductsSales: [] as ProductToCart[],
  resetToastifyNotificationAddProduct: 0 as number,
  toastifyNotificationAddProduct: 0 as number,
  dataStatistics: [] as GeneralStatisticsPerDay[],
  getTickets: [] as Ticket[],
  showCancellationOfsaleModal: false as boolean,
  saveDataUser: [] as SaveUserData,
  getDataUser: {} as User,
  validatePin: false as boolean,
  showSidebar: false as boolean,
  getUser: {} as User,
  paymentDataToStadistics: {} as PaymentDataToStatdistics,
  dataOfTicketFromDay:{} as BasicDataStatistics
}

export const ProductsReducer = (state: LibraryAllData, action: LibraryData) => {
  switch (action.type) {
    case "showSidebarSale" : {
      return {
        ...state,
        showSidebarSale:action.payload
      }
    }
    case "previousDocumentProductsByStock" : {
      return {
        ...state,
        previousDocumentProductsByStock:action.payload
      }
    }
    case "lastDocumentProductsByStock" : {
      return {
        ...state,
        lastDocumentProductsByStock:action.payload
      }
    }
    case "dataOfTicketFromDay": {
      return {
        ...state,
        dataOfTicketFromDay: action.payload
      }
    }
    case "paymentDataToStadistics":{
      return {
        ...state,
        paymentDataToStadistics:action.payload
      }
    }
    case "paymentData": {
      return {
      ...state,
      paymentData:action.payload
      }
    }
    case "warningAmount" : {
      return {
        ...state,
        warningAmount:action.payload
      }
    }
    case "getUser":{
      return {
        ...state,
        getUser:action.payload
      }
    }
    case "showSidebar":{
      return {
        ...state,
        showSidebar:action.payload
      }
    }
    case "loader": {
      return {
        ...state, loader:action.payload
      }
    }
    case "validatePin": {
      return {
        ...state,
        validatePin:action.payload
      }
    }
    case "getDataUser": {
      return {
        ...state,
        getDataUser:action.payload
      }
    }
    case "saveDataUser" : {
      return {
        ...state, 
        saveDataUser: action.payload
      }
    }
    case "showCancellationOfsaleModal": {
      return {
        ...state,
        showCancellationOfsaleModal:action.payload
      }
    }
    case "getTickets": {
      return {
        ...state,
        getTickets: action.payload
      }
    }
    case "dataStatistics": {
      return {
        ...state,
        dataStatistics: action.payload
      }
    }
    case "toastifyNotificationAddProduct": {
      return {
        ...state,
        toastifyNotificationAddProduct: 1
      }
    }
    case "resetToastifyNotificationAddProduct": {
      return {
        ...state,
        toastifyNotificationAddProduct: 0
      }
    }
    case "getProductsSales": {
      return {
        ...state,
        getProductsSales: action.payload
      }
    }
    case "incrementAmountToItemFromCart": {
      let amountCart = 0
      const codeItem = action.payload2
      const amountItem = Number(action.payload)
      const cart = action.payload3
      const getItem = cart?.find(item => item.code === codeItem)
      if (getItem) {
        cart?.map(item => {
          if (item.code === codeItem) {
            item.amount = amountItem
          }
        })
      }
      cart?.map(item => {
        const getPrice = Number(item.price)
        let amountPerProduct: number = Number(item.amount) * Number(getPrice.toFixed(2))
        amountCart = amountCart + Number(amountPerProduct.toFixed(2))
      })
      return {
        ...state,
        productToCart: cart,
        totalAmountToCart: amountCart
      }
    }
    case "tostifyNotificationSales": {
      return {
        ...state,
        tostifyNotificationSales: action.payload
      }
    }
    case "showSaleModal": {
      return {
        ...state,
        showSaleModal: action.payload
      }
    }
    case "productToUpdate": {
      return {
        ...state,
        productToUpdate: action.payload
      }
    }
    case "productsFromFilterByStock": {
      return {
        ...state,
        productsFromFilterByStock: action.payload
      }
    }
    case "totalSalesYear": {
      return {
        ...state,
        totalSalesYear: action.payload
      }
    }
    case "dataTotalSalesPerMonth": {
      return {
        ...state,
        dataTotalSalesPerMonth: action.payload
      }
    }
    case "dataSales": {
      return {
        ...state,
        dataSales: action.payload,
      }
    }
    case "dataSalesLabel": {
      return {
        ...state,
        dataSalesLabel: action.payload
      }
    }
    case "marcaSocio": {
      return {
        ...state,
        marcaSocio: action.payload
      }
    }
    case "loaderChargerStockAdd": {
      return {
        ...state,
        loaderChargerStockAdd: action.payload
      }
    }
    case "loaderChargerStock": {
      return {
        ...state,
        loaderChargerStock: action.payload
      }
    }
    case "addStockProduct": {
      return {
        ...state,
        addStockProduct: action.payload
      }
    }
    case "averageTicket": {
      return {
        ...state,
        averageTicket: action.payload
      }
    }
    case "dailyTicket": {
      return {
        ...state,
        dailyTicket: action.payload
      }
    }
    case "dailySale": {
      return {
        ...state,
        dailySale: action.payload
      }
    }
    case "loaderRegisterProduct": {
      return {
        ...state,
        loaderRegisterProduct: action.payload
      }
    }
    case "newProduct": {
      return {
        ...state,
        newProduct: action.payload
      }
    }
    case "brands": {
      return {
        ...state,
        brands: action.payload
      }
    }
    case "category": {
      return {
        ...state,
        category: action.payload
      }
    }
    case "productToCart": {
      let amountCart: number = 0
      action.payload.map(prod => {
        const getPrice = Number(prod.price)
        let amountPerProduct: number = Number(prod.amount) * Number(getPrice.toFixed(2))
        amountCart = amountCart + Number(amountPerProduct.toFixed(2))
      })
      return {
        ...state,
        totalAmountToCart: amountCart,
        productToCart: action.payload
      }
    }
    case "cleanCart": {
      return {
        ...state,
        productToCart: []
      }
    }
    case "resetAmountCart": {
      return {
        ...state,
        totalAmountToCart: 0
      }
    }
    case "currentlyDate": {
      const date = todayDate()
      return {
        ...state,
        currentlyDate: date
      }
    }
    case "loaderToSell": {
      return {
        ...state,
        loaderToSell: action.payload
      }
    }
    case "productNotFound": {
      if (action.payload === "not found") {
        return {
          ...state,
          productNotFound: "no se encontro producto"
        }
      } else {
        return {
          ...state,
          productNotFound: ""
        }
      }
    }
    case "generateSold": {
      return {
        ...state,
        generateSold: action.payload
      }
    }
  }
}



