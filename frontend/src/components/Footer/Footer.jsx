//@param {Object} estilo: son los estilos del color de fondo del footer
const Footer = ({ estilo }) => {
  return (
    <>
      {/* FOOTER */}
      <div className="container-fluid text-white mt-5 pb-2 pt-2" style={estilo}>
        <div className="row">
          <div xs={12} className="text-center">
            <p>
              © Seguros Bolívar S.A. 2023. Se prohíbe su uso o reproducción sin
              autorización de la Compañía Seguros Bolívar S.A.
            </p>
          </div>
        </div>
      </div>
      {/* FIN FOOTER */}
    </>
  );
};

export default Footer;
