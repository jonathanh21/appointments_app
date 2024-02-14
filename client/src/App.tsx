// Importar dependencias
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './App.css'
import { Navbar } from './components/Navbar';
import { Appointments } from './pages/Appointments';
import { CreateAppointment } from './pages/CreateAppointment';


const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="app">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Appointments />} />
          <Route path="/visualizar-citas" element={<Appointments />} />
          <Route path="/actualizar-cita/:id" element={<CreateAppointment />} />
          <Route path="/crear-cita" element={<CreateAppointment />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;