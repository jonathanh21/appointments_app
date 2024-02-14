import axios from 'axios';
import { useEffect, useState } from 'react'
import { Cita } from '../interfaces/components';
import { Appointment } from '../components/Appointment';
import { ErrorModal } from '../components/ErrorModal';

export const Appointments = () => {
    const [citas, setCitas] = useState<Cita[]>([]);
    const [error, setError] = useState('')
    const [openErrorModal, setOpenErrorModal] = useState(false)

    const fetchCitas = async () => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/citas`)
        .then(response => {
            console.log(response.data.data)
            setCitas(response.data.data);
            setError("")
        })
        .catch(error => {
            setOpenErrorModal(true)
            console.error('Error al obtener las citas:', error);
            setError('Error al obtener las citas')
        });
    }

    useEffect(() => {
        fetchCitas()
    }, []);

    return (
        <div className='content appointments'>
            <ErrorModal message={error} isOpen={openErrorModal} onConfirm={()=>setOpenErrorModal(false)}/>
            {citas.length ? citas.map(cita => (
            <Appointment appointment={cita} key={cita.id}/>
            )): <div>NO HAY CITAS PROGRAMADAS ACTUALMENTE</div>}
            
        </div>
    );
}
