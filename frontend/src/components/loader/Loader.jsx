//componente que muestra el loader de cargando
const Loader = () => {
  return (
    <>
      <div className="loading show">
        <span className="h4 text-white">
          <i className="bi bi-hourglass-split"></i>Cargando
        </span>
        <div className="spin"></div>
      </div>
    </>
  );
};

export default Loader;
