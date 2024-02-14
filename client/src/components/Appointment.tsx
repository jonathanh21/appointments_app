import { Link } from 'react-router-dom'
import './index.css'
import { CancelationModal } from './CancelationModal'
import { useState } from 'react';
import axios from 'axios';



export const Appointment = ({appointment}:{appointment:any}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleCancelAppointment = () => {
        axios.delete(`${import.meta.env.VITE_BASE_URL}/citas/${appointment.id}`)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.error('Error al cancelar la cita:', error);
        });
        setIsModalOpen(false)
        window.location.reload()
    }
    const formatDate= (date:Date) => {
        const newDate = new Date(date)
        newDate.setHours(newDate.getHours()+5)

        return newDate.toDateString()
    }

    return (
        <div className="apptCard">
            <CancelationModal 
                paciente={appointment.paciente} 
                isOpen={isModalOpen} 
                onCancel={()=>setIsModalOpen(false)}
                onConfirm={handleCancelAppointment}
            />
            <span><strong>Fecha:</strong> {formatDate(new Date(appointment.fecha))} - {appointment.hora.slice(0,5)}</span>
            <div><strong>Doctor Asignado:</strong> {appointment.Medico.nombre}</div>
            <br/>
            <div><strong>Tipo de cita:</strong> {appointment.tipo}</div>
            <div><strong>Paciente:</strong> {appointment.paciente}</div>
            <section className='card-buttons'>
                <button onClick={()=>setIsModalOpen(true)}>Cancelar</button>
                <Link to={`/actualizar-cita/${appointment.id}`}><button style={{backgroundColor:'#6750A4', color:'white', borderRadius:'10px'}}>Actualizar</button></Link>
            </section>
        </div>
    )
}
