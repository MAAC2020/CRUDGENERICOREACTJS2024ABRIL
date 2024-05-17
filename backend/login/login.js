let formulario = JSON.stringify({
  user: "mauricio@gmailsss.com",
  pass: "uzumaki uchiha 2020",
});

const probar = () => {
  let logueo = login(
    formulario,
    "Usuario",
    "1CwVEtD7lHjItB2_CJWra-BIiYACzR5ckb9PCuzMN0H4"
  );
  console.log(logueo);
};

//funcion de loguearse
//@param {Object Stringify} formData: son los datos en objeto del formulario del login
//@param {String} nombreTabla: es el nombre de la tabla a consultar el login
//@param {String} idBaseDeDatos: es el id de la base de datos para insertar
function login(argumentos) {
  try {
    console.log("ARGUMENTOS");
    console.log(argumentos);

    const [formData] = argumentos;
    const { idDataBase, nameTables } = parametrosGlobales();

    const { idBaseDeDatos } = idDataBase;

    const { tablaUsuario } = nameTables;
    //si todo sale bien
    //obtener la hoja de calculo y asignar el nombre de la hoja de calculo
    const [sheetHoja] = asignarNombreHojaDeCalculo(tablaUsuario, idBaseDeDatos);

    //arreglo de rango de datos
    const dataSheetHoja = sheetHoja.getDataRange().getValues();

    //obtener la primera fila de la tabla
    //[columna1,columna2,columna3]
    let [arregloPrimeraFilaBaseDeDatos] = obtenerPrimeraRegistroCalculo(
      tablaUsuario,
      idBaseDeDatos
    );

    //obtener el usuario y la contraseña
    let { user, pass } = JSON.parse(formData);

    console.log("usuario: " + user);
    console.log("password: " + pass);
    //variable para guardar la posicion del usuario
    let posicionUser = null;
    let posicionPass = null;
    let posicionEstado = null;
    //recorrer el arreglo de la primera posicion de la tabla para buscar el campo user
    arregloPrimeraFilaBaseDeDatos.map((el, index) => {
      //si al recorrer la primera fila el campo es user entonces guardar la posicion del user
      if (el == "user") {
        posicionUser = index;
      }

      //si al recorrer la primera fila el campo es user entonces guardar la posicion del pass
      if (el == "pass") {
        posicionPass = index;
      }

      //si al recorrer la primera fila el estado entonces guardar la posicion del estado
      if (el == "estado") {
        posicionEstado = index;
      }
    });

    //si la posicion User es diferente de nulo y la posicion del Pass es diferente de null
    //si la posicion del estado es diferente de null
    //significa que en la tabla en la primera fila existe el campo user y pass,
    // y quedo almacenada su posicion
    if (
      posicionUser != null &&
      posicionPass != null &&
      posicionEstado != null
    ) {
      console.log("<<<<<<<<ENTRE AQUI>>>>>>>>");

      console.log("POSICION USER" + posicionUser);
      console.log("POSICION PASS" + posicionPass);
      console.log("POSICION ESTADO" + posicionEstado);
      //omitir la primera fila del arreglo de arreglos
      dataSheetHoja.shift();

      //si el elemento en la posicion del usuario es igual al user que viene desde el formulario
      //y si el elemento en la posicion del Pass es igual al pass que viene desde el formulario
      //encuentra coincidencia retorna un arreglo [] si no encuentra retorna undefined
      let arrayBusqueda = dataSheetHoja.find(
        (el) =>
          el[posicionUser] == user &&
          el[posicionPass] == pass &&
          el[posicionEstado] == "activo"
      );

      console.log("ARRAY BUSQUEDA");
      console.log(arrayBusqueda);

      if (arrayBusqueda) {
        let arregloUsuarioEncontrado = [];
        //se recorrre la primera fila de la base de datos
        arregloPrimeraFilaBaseDeDatos.map((columna, index) => {
          //ir añadiendo propiedades al objeto conservando las anteriores
          //si hay un valor en la columna
          if (columna) {
            arregloUsuarioEncontrado = {
              ...arregloUsuarioEncontrado,
              [arregloPrimeraFilaBaseDeDatos[index]]: arrayBusqueda[index],
            };
          }
        });

        //@return {Array Object} arregloUsuarioEncontrado: es el arreglo del registro que retorna cuando encuentra coincidencia de logueo
        //puede retornar undefined si no lo encuentra y si lo encuentra retorna el registro
        return JSON.stringify(arregloUsuarioEncontrado);
      } else {
        //en caso contrario retorna un null
        return JSON.stringify(null);
      }
    } else {
      //en caso contrario dejar este mensaje para el desarrollador para añadir el campo user y pass en la tabla
      console.log(
        "EL CAMPO user o pass no existe en la primera fila de la tabla añadirla porfavor"
      );
    }

    // let registroEncontrado = dataSheetHoja.find((el) => el[posicionId] == id);
    // return JSON.stringify("success");
  } catch (error) {
    console.error(error);
    //@return {Json Stringify} error: se retorna success si todo es correcto
    //si hay un error
    return JSON.stringify("error");
  }
}
