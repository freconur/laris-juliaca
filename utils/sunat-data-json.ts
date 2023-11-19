export const BOLETA_SUNAT:BoletaSunat = {
  ublVersion: "2.1",
  tipoOperacion: "01",
  tipoDoc: "03",
  serie: "B001", //DINAMICO
  correlativo: "1",
  fechaEmision: "2021-01-27T00:00:00-05:00",//DINAMICO
  formaPago: {
    moneda: "PEN",
    tipo: "Contado"
  },
  tipoMoneda: "PEN",
  client: {
    tipoDoc: "1",//DINAMICO
    numDoc: 47163626,//DINAMICO
    rznSocial: "Cliente",//DINAMICO
    address: {
      direccion: "Direccion cliente",//DINAMICO
      provincia: "LIMA",//DINAMICO
      departamento: "LIMA",//DINAMICO
      distrito: "LIMA",//DINAMICO
      ubigueo: "150101"
    }
  },
  company: {
    ruc: 2022222222222,
    //DINAMICO PERO NO SON OBLIGATORIOS, PERO LOS ATRIBUTOS DEBEN DE PERMANECER VACIOS
    razonSocial: "Mi empresa",//DINAMICO
    nombreComercial: "Mi empresa",//DINAMICO
    address: {
      direccion: "Direccion empresa",//DINAMICO
      provincia: "LIMA",//DINAMICO
      departamento: "LIMA",//DINAMICO
      distrito: "LIMA",//DINAMICO
      ubigueo: "150101"//DINAMICO
    }
  },
  //ESTOS SON LOS MONTOS DE VALOR DE VENTA FINAL Y EL IGV QUE SER COBRA
  mtoOperGravadas: 100,
  mtoIGV: 18,
  valorVenta: 100,
  totalImpuestos: 18,
  subTotal: 118,
  mtoImpVenta: 118,
  details: [
    //DETALLES DE TODOS LOS PRODUCTOS QUE SE ESTAN VENDIENDO
    {
      codProducto: "P001",
      unidad: "NIU",
      descripcion: "PRODUCTO 1",
      cantidad: 2,
      mtoValorUnitario: 50,
      mtoValorVenta: 100,
      mtoBaseIgv: 100,
      porcentajeIgv: 18,
      igv: 18,
      tipAfeIgv: 10,
      totalImpuestos: 18,
      mtoPrecioUnitario: 59
    }
  ],
  legends: [
    {
      code: "1000",
      value: "SON CIENTO DIECIOCHO CON 00/100 SOLES"
    }
  ]
}