import { useContext } from "react";
import { NavLink } from "react-router-dom";
//obtener el contexto del usuario
import LoginContext from "../../contexts/LoginProvider";

//@param {Object} estilo: son los estilos del color de fondo del menu
//@param {String} urlLogo: es la url del logo a utilizar en el proyecto
const MenuLateral = ({ estilo, urlLogo }) => {
  //contexto global del usuario logueado
  const { user, login, logout } = useContext(LoginContext);
  return (
    <>
      {/* <!--NAVBAR--> */}
      <nav className="navbar navbar-dark" style={estilo}>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#menu"
            aria-controls="menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="text-rigth">
            <a className="navbar-brand">{user && user.user}</a>
            <img className="bg-light" src={urlLogo} width={180}></img>
          </div>
        </div>
      </nav>
      {/* <!--FIN NAVBAR--> */}

      {/* <!--SIDEBAR--> */}
      <div
        className="offcanvas offcanvas-start text-white"
        style={estilo}
        tabIndex="-1"
        id="menu"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Menú
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <hr />
        <div className="offcanvas-body">
          {/* <!--NAV VERTICAL--> */}
          <ul className="nav flex-column nav-pills mb-auto">
            <NavLink
              className={"rounded-pill w-100 pt-2 pb-2 btn btn-primary-esago"}
              to="/usuario"
            >
              <i className="bi bi-list-ul"></i> Registrar Usuario
            </NavLink>

            <NavLink
              className={
                "rounded-pill w-100 pt-2 pb-2 btn btn-primary-esago mt-3"
              }
              to="/usuario/consultar"
            >
              <i className="bi bi-list-ul"></i> Consultar Usuario
            </NavLink>
          </ul>
          {/* <!-- FIN NAV VERTICAL--> */}
          <hr />
        </div>
        {/* <!--CERRAR SESION--> */}
        <ul className="nav flex-column nav-pills mt-auto">
          <li className="nav-item">
            {/* BOTON PARA CERRAR LA SESION */}
            <button className="nav-link text-white" onClick={() => logout()}>
              <i className="bi bi-box-arrow-left"></i> Cerrar Sesión
            </button>
          </li>
        </ul>
        {/* <!--FIN CERRAR SESION--> */}
      </div>
      {/* <!--FIN SIDEBAR--> */}
    </>
  );
};

export default MenuLateral;
