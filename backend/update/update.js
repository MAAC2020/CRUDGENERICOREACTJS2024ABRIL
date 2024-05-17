//funcion para actualizar un registro
//@param {Object Stringify} formData: es el objeto en stringify de los valores a modificar
//@param {String} nombreTabla: es el nombre de la tabla a consultar
//@param {String} idBaseDeDatos: es el id de la base de datos
//@param {String} campoRecibido: es el nombre del campo columna a que se va a tomar como referencia de llave primaria
//@param {String} valorRecibido: es el valor donde va a hacer coincidencia con el campo recibido
function update(argumentos) {
  try {
    const [formData, nombreTabla, idBaseDeDatos, campoRecibido, valorRecibido] =
      argumentos;
    //si todo sale bien
    //obtener la hoja de calculo y asignar el nombre de la hoja de calculo
    const [sheetHoja] = asignarNombreHojaDeCalculo(nombreTabla, idBaseDeDatos);
    //data convertida
    let data = JSON.parse(formData);

    //campo convertido

    let campo = JSON.parse(campoRecibido);

    let valor = JSON.parse(valorRecibido);

    //arreglo de rango de datos
    const dataSheetHoja = sheetHoja.getDataRange().getValues();

    //obtener la primera fila de la tabla
    //[columna1,columna2,columna3]
    let [arregloPrimeraFilaBaseDeDatos] = obtenerPrimeraRegistroCalculo(
      nombreTabla,
      idBaseDeDatos
    );

    let posicionIdentificador;
    //recorrer la primera fila de la base de datos
    arregloPrimeraFilaBaseDeDatos.map((el, index) => {
      //si la columna es igual a id entonces
      if (el == campo) {
        //posicion del id en la base de datos
        posicionIdentificador = index;
      }
    });

    //si el campo se encuentra en la base entonces es diferente de undefined
    if (posicionIdentificador != undefined) {
      //va a buscar en la hoja el campo y el valor donde haya una coincidencia
      let indiceRegistroEncontrado = dataSheetHoja.findIndex(
        (el) => el[posicionIdentificador] == valor
      );

      console.log(indiceRegistroEncontrado + "INDICE DEL REGISTRO ENCONTRADO");
      //si encuentra el registro va a encontrar el indice
      if (indiceRegistroEncontrado != -1) {
        let arregloDeObjetoRecibido = Object.keys(data);
        //fila del registro encontrado
        let fila = indiceRegistroEncontrado + 1;

        //se recorre la primera fila de la base de datos
        arregloPrimeraFilaBaseDeDatos.map((columna, indice) => {
          //se busca la fila recibida con la propiedad recibida
          let busqueda = arregloDeObjetoRecibido.find(
            (propiedad) => propiedad == columna
          );
          //si encuentra el valor de la columna en la propiedad recibida entonces
          if (busqueda) {
            //si encuentra la busqueda entonces
            let columna = indice + 1;
            let datoUpdate = data[arregloPrimeraFilaBaseDeDatos[indice]];
            //@param {Int} fila: posicion fila
            //@param {Int} columna: posicion columna
            //@param {String} datoUpdate: es el dato actualizar en la base de datos
            let rango = sheetHoja.getRange(fila, columna).setValue(datoUpdate);
            console.log("SI LO ENCONTRE ESTOY DENTRO DE BUSQUEDA");
          }
        });
        return JSON.stringify("success");
      } else {
        console.log("No se encuentra el registro");

        return JSON.stringify("warning");
      }
    } else {
      console.error(
        "El campo que se esta introducciendo como campo recibido no existe en la base de datos" +
          campoRecibido
      );
      //si ocurre algun error retorna error
      return JSON.stringify("error");
    }
  } catch (error) {
    console.error(error);
    //si ocurre algun error retorna error
    return JSON.stringify("error");
  }
}
