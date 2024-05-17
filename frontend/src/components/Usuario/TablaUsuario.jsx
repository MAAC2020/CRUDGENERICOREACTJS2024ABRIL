import { useContext, useEffect, useState } from "react";
//importacion de constante de la configuracion del dataTable
import configuracionDataTable from "../../helpers/configuracionDataTable/configuracionDataTable";
//importacion del contexto del loader
import LoaderContext from "../../contexts/LoaderProvider";
//importacion de editar el modal
import { parametrosGlobales } from "../../helpers/constantes/constantes";
import EditarUsuarioModal from "./EditarUsuarioModal";
import api from "../../api/api";

const TablaUsuario = () => {
  //contextoGlobal del loader
  const { mostrarLoader, ocultarLoader } = useContext(LoaderContext);

  //estado de tabla
  const [datosTabla, setDatosTabla] = useState([]);
  //estado de elemento a editar
  const [elementoEditar, setElementoEditar] = useState({});
  //estado para mostrar modal
  const [show, setShow] = useState(false);
  //funciones para cerrar y mostrar el modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    obtenerRegistrosTabla();
  }, []);

  //funcion para obtener los datos de la persona
  const obtenerRegistrosTabla = async () => {
    try {
      //destruir y limpiar la tabla antes de obtener los datos
      $("#tabla").dataTable().fnClearTable();
      $("#tabla").dataTable().fnDestroy();
      setDatosTabla(null);
      //mostrar loader
      mostrarLoader();
      //se llama a la funcion para insertar
      //@param {String} tablaUsuario: es el nombre de la tabla a consultar
      //@param {String} idBaseDeDatos: es el identificador de la base de datos

      let data = await api(
        "readAll",
        parametrosGlobales.nameTables.tablaUsuario,
        parametrosGlobales.idDataBase.idBaseDeDatos
      );

      // console.log(data);
      //asignar los datos a la tabla
      setDatosTabla(data);
      //ocultar loader
      ocultarLoader();
      $(document).ready(function () {
        //@param {object} configuracionDatatable: es la configuracion del datatable en español
        $("#tabla").DataTable(configuracionDataTable);
      });
    } catch (e) {
      console.error(e);
      //destruir y limpiar la tabla antes de obtener los datos
      $("#tabla").dataTable().fnClearTable();
      $("#tabla").dataTable().fnDestroy();
      //mostrar loader
      mostrarLoader();
      //asignar los datos a la tabla
      setDatosTabla([]);
      //ocultar loader
      ocultarLoader();
      $(document).ready(function () {
        //@param {object} configuracionDatatable: es la configuracion del datatable en español
        $("#tabla").DataTable(configuracionDataTable);
      });
    }
  };

  //funcion para editar el registro
  //@param {Object} el: es el registro actual a editar
  const editar = (el) => {
    setElementoEditar(el);
    handleShow();
  };

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-12">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => obtenerRegistrosTabla()}
            >
              Recargar Tabla
            </button>
          </div>
          <div className="col-12 table-responsive mt-4 bg-white p-4 border border-1 rounded-4 mt-5 shadow-lg p-3 mb-5 bg-body rounded">
            {/* MIENTRAS CARGA LOS DATOS MUESTRE UN LOADER DE CARGANDO */}
            {/* {datosTabla == null && <Loader />} */}
            {/* EN CASO CONTRARIO MUESTRA LA TABLA CON O SIN DATOS */}
            {datosTabla !== null && (
              <table className="table hover" id="tabla">
                <thead>
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">usuario</th>
                    <th scope="col">contraseña</th>
                    <th scope="col">rol</th>
                    <th scope="col">estado</th>
                    <th scope="col">editar</th>
                  </tr>
                </thead>
                <tbody>
                  {datosTabla.length > 0 &&
                    datosTabla.map((el, index) => (
                      <tr key={index}>
                        <td>{el.id}</td>
                        <td>{el.user}</td>
                        <td>{el.pass}</td>
                        <td>{el.rol}</td>
                        <td>{el.estado}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary-esago"
                            onClick={() => editar(el)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-pencil-square"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path
                                fillRule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      {/* MODAL PARA EDITAR si show es verdadero mostrar el modal */}
      {show && (
        <EditarUsuarioModal
          elementoEditar={elementoEditar}
          show={show}
          setShow={setShow}
          handleClose={handleClose}
          handleShow={handleShow}
          obtenerRegistrosTabla={obtenerRegistrosTabla}
        />
      )}
    </>
  );
};

export default TablaUsuario;
