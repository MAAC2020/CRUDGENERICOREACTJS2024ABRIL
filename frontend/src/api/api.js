//@param {String} funcion: es el nombre de la funcion a llamar del backend
//@param {All} argumentos: puede recibir cualquier tipo de argumentos separados por comas
const api = async (funcion, ...argumentos) => {
  let promesa = new Promise((resolve, reject) => {
      google.script.run
        .withSuccessHandler((el) => {
          //se parse la respuesta y se retorna
          //@return success: todo correcto
          //se retorna resolve si todo esta correcto
          resolve(JSON.parse(el));
        })
        .withFailureHandler((err) => {
          //se parse la respuesta y se retorna
          //@return error: hubo algun error
          //se retorna reject si hay algun error en la promesa
          reject(JSON.parse(err));
        })
        [funcion](argumentos);
    });
  
    let respuesta = await promesa;
    //@return respuesta
    return respuesta;
};

export default api;



