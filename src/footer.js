import React, { useState } from 'react';

const Footer = () => {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  const acceptCookies = () => {
    // Guardar la confirmación del boton "Aceptar las cookies" en el Local Storage
    localStorage.setItem('cookiesAccepted', 'true');
    setCookiesAccepted(true);
  };

  // Comprobar si las cookies ya han sido aceptadas previamente
  const isCookiesAccepted = sessionStorage.getItem('cookiesAccepted');

  return (
    <footer className="footer">
      Teléfono: <span>+56942199915</span>

      {!cookiesAccepted && !isCookiesAccepted && (
        <div className="cookies-overlay">
          <div className="cookies-message">
            <p>Utilizamos cookies para mejorar tu experiencia en nuestro sitio web.</p>
            <p>Al continuar navegando, aceptas nuestro uso de cookies.</p>
            <button onClick={acceptCookies}>Aceptar</button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
