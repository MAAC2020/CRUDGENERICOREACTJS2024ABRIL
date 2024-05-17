//parametros globales de los ids
//Implementado por mauricio.araujo@servinformacion.com
function parametrosGlobales() {
  return {
    idDataBase: {
      idBaseDeDatos: "1CwVEtD7lHjItB2_CJWra-BIiYACzR5ckb9PCuzMN0H4",
    },
    //nombre de las tablas utilizar
    nameTables: {
      tablaUsuario: "Usuario",
    },
    //nombre de los campos a actualizar
    // nameFieldUpdate: {
    //   nombreCampoActualizarId: "id",
    // },
  };
}

//conexion a la base de datos
function conexionBaseDeDatos(idBaseDeDatos) {
  //const { idBaseDeDatos } = parametrosGlobales();
  //se abre la conexion de la base de datos
  const BD = SpreadsheetApp.openById(idBaseDeDatos);
  //@return {object} BD: se retorna la base de datos
  return { BD };
}

//asignar nombre
//@param {String} nombreSheet: es el nombre de la hoja de calculo
function asignarNombreHojaDeCalculo(nombreSheet = "", idBaseDeDatos = "") {
  //se obtiene la base de datos
  const { BD } = conexionBaseDeDatos(idBaseDeDatos);
  //se obtiene el nombre de la base de datos
  const sheetHoja = BD.getSheetByName(nombreSheet);
  //@return {Array} sheetHoja: hoja de la base de datos
  return [sheetHoja];
}

//funcion para obtener la primera fila de cada tabla
function obtenerPrimeraRegistroCalculo(nombreSheet, idBaseDeDatos) {
  //obtener la hoja de calculo
  const [sheetHoja] = asignarNombreHojaDeCalculo(nombreSheet, idBaseDeDatos);

  //arreglo de rango de datos
  const dataSheetHoja = sheetHoja.getDataRange().getValues();

  const dataSheetHojaFirstData = dataSheetHoja.shift();

  //@return [Array] dataSheetHojaFirstData: es el arreglo de la primera fila nombres de las columnas
  return [dataSheetHojaFirstData];
}

//ACTUALIZADA 2023
//funcion para ordenar el objeto
//@param {Array} arregloPrimeraFilaBaseDeDatos: es el arreglo de la primera fila de las columnas de la base de datos
//@param {Object} formData: son los datos del formulario en objeto
function ordenarObjeto(arregloPrimeraFilaBaseDeDatos, formData) {
  let arregloPropiedadesRecibidas = [];

  for (let key in formData) {
    arregloPropiedadesRecibidas.push(key);
  }

  //arreglo de los datos ordenados
  let arregloDatosOrdenados = [];
  arregloPrimeraFilaBaseDeDatos.map((columna) => {
    //buscar la columna en la propiedad del objeto recibido
    let busqueda = arregloPropiedadesRecibidas.find(
      (propiedad) => propiedad.trim() == columna.trim()
    );
    //si la columna se encuentra en la propiedad entonces añadirl los datos al arreglo ordenado
    if (busqueda) {
      arregloDatosOrdenados.push(formData[columna]);
    } else {
      //añadir un espacio vacio
      arregloDatosOrdenados.push("");
    }
  });

  //@return {Array} arregloDatosOrdenados: son los valoreses el objeto del formulario ordenado
  return [arregloDatosOrdenados];
}

//funcion para ordenar el objeto
//@param {Array} arregloPrimeraFilaBaseDeDatos: es el arreglo de la primera fila de las columnas de la base de datos
//@param {Object} formData: son los datos del formulario en objeto
// function ordenarObjeto(arregloPrimeraFilaBaseDeDatos, formData) {
//   console.log(
//     "ARREGLO RECIBIDO DE LA PRIMERA FILA DE LA BASE DE DATOS",
//     arregloPrimeraFilaBaseDeDatos
//   );

//   //[ 'id', 'nombre_producto', 'valor' ]

//   console.log("DATA DEL FORMULARIO", formData);
//   //{ nombre_producto: 'Computador Lenovo' }

//   //obtener las propiedades del formulario
//   let claves = Object.keys(formData);
//   //objeto donde se ordenara el arreglo recibido del formulario
//   let objetoOrdenado = {};

//   let longitudArregloClaves = claves.length - 1;

//   console.log("LONGITU ARREGLO CLAVES", longitudArregloClaves);

//   //recorrer las columnas del arreglo de las columnas de la base de datos
//   arregloPrimeraFilaBaseDeDatos.map((el) => {
//     ////////////
//     for (let j = 0; j <= longitudArregloClaves; j++) {
//       let propiedad = claves[j];
//       if (propiedad == el) {
//         //si la propiedad es igual a la columna
//         //validar que j sea menor a la longitud del arreglo del form
//         if (j <= longitudArregloClaves) {
//           //console.log(objetoOrdenado[el])
//           //insertar la propiedad y el valor de la propiedad
//           objetoOrdenado[el] = formData[el];
//           //para el ciclo
//           break;
//         }
//       } else {
//         //validar si j es menor a la longitud -1 e insertar la propiedad vacia
//         if (j <= longitudArregloClaves - 1) {
//           objetoOrdenado[el] = "";
//         } else {
//           //en caso contrario continue para seguir interactuando sobre las propiedades
//           continue;
//         }
//       }
//     }
//   });

//   //console.log(objetoOrdenado)
//   //@return {Object} objetoOrdenado: es el objeto del formulario ordenado
//   return [objetoOrdenado];
// }
