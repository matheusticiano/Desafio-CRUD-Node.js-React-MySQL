import React from 'react';

const Footer = () => {
  return (
    <div className='footer'>
      <span>Support and business contact: matheusticiano34@gmail.com</span>
      <div className="footer-links">
        <a href="https://www.linkedin.com/in/matheus-ticiano-63b0792b6" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="https://github.com/matheusticiano" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://matheusticianodev.vercel.app/" target="_blank" rel="noopener noreferrer">
          <i className="fas fa-globe"></i>
        </a>
        <a href="https://www.instagram.com/ticiano.matheus/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  );
}

export default Footer;
