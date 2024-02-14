import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h1>Gestión de Citas</h1>
      <nav className="links">
        <ul>
          <li>
            <Link to="/visualizar-citas">Visualizar Citas</Link>
          </li>
          <li>
            <Link to="/crear-cita">Crear Cita</Link>
          </li>
        </ul>
      </nav>
      <ul>
        <li onClick={()=>{}}>
            <a>
            Cerrar Sesión
                </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
