//funcion para consultar todo
//@param {String} nombreTabla: es el nombre de la tabla a consultar
//@param {String} idBaseDeDatos: es el identificador de la base de datos
function readAll(argumentos) {
  try {
    const [nombreTabla, idBaseDeDatos] = argumentos;
    //obtener la hoja de calculo y asignar el nombre de la hoja de calculo
    const [sheetHoja] = asignarNombreHojaDeCalculo(nombreTabla, idBaseDeDatos);

    //obtener la primera fila de la tabla
    //[columna1,columna2,columna3]
    let [arregloPrimeraFilaBaseDeDatos] = obtenerPrimeraRegistroCalculo(
      nombreTabla,
      idBaseDeDatos
    );

    //datos de rango de las hojas
    const dataSheetHoja = sheetHoja.getDataRange().getValues();
    //quitar el primer elemento de la hoja de calculo
    dataSheetHoja.shift();
    //longitud de las columnas de la tabla
    let longitudColumnas = arregloPrimeraFilaBaseDeDatos.length - 1;
    //arreglo de los registros
    let arrayRegistros = [];
    //recorrer los registros de la tabla
    dataSheetHoja.map((filas) => {
      //objeto que ira guardando las propiedades y el valor
      let arregloFilas = {};
      //ciclo que va desde la posicion cero hasta la longitud de las columnas +1
      for (i = 0; i <= longitudColumnas + 1; i++) {
        //si la posicion de la columna es menor o igual a la longitud de la columna
        if (i <= longitudColumnas) {
          console.log("arregloPrimeraFilaBaseDeDatos[i]");
          console.log(arregloPrimeraFilaBaseDeDatos[i]);

          //si esta vacia la columna
          if (arregloPrimeraFilaBaseDeDatos[i].toString().trim() == "") {
            let vacio;
            arregloFilas = {
              ...arregloFilas,
              ["vacio" + i]: filas[i],
            };
          } else {
            //si la primera columna de la google sheet no esta vacia
            arregloFilas = {
              ...arregloFilas,
              [arregloPrimeraFilaBaseDeDatos[i]]: filas[i],
            };
          }
          //ir añadiendo propiedades al objeto conservando las anteriores
        } else if (i > arregloPrimeraFilaBaseDeDatos.length - 1) {
          //cuando i es mayor a la longitud del arreglo de la base de datos
          //entonces añadir al arreglo el objeto con sus propiedades
          arrayRegistros.push(arregloFilas);
        }
      }
    });

    console.log("ARREGLO DE REGISTROS");
    console.log(arrayRegistros);
    //@return {JSON STRING Array} arrayRegistros: es el arreglo de arreglos de objetos con sus propiedades
    //de la tabla
    return JSON.stringify(arrayRegistros);
  } catch (error) {
    console.error(error);
    //@return "Error en Json"
    return JSON.stringify("error");
  }
}
