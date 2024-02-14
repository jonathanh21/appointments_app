
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ErrorModal } from '../components/ErrorModal';

export const CreateAppointment = () => {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [doctor, setDoctor] = useState('');
  const [paciente, setPaciente] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [doctors, setDoctors] = useState<any[]>([])
  const [openErrorModal, setOpenErrorModal] = useState(false)
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
  const [error, setError] = useState('')
  const [citaUpdate, setCitaUpdate] = useState<any>({})

  const params = useParams()


  const fetchDoctors = async () => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/medicos`)
        .then(response => {
            console.log(response.data.data)
            setDoctors(response.data.data);
        })
        .catch(error => {
            setOpenErrorModal(true)
            setError('Error al obtener los doctores')
            console.log('Error al obtener los doctores:', error);
        });
  }

  const createCita = async (event:any) =>{
    event.preventDefault();

    const cita = { fecha, hora,  medicoId:doctor, tipo:especialidad, paciente };
    console.log(cita);
    axios.post(`${import.meta.env.VITE_BASE_URL}/citas`,cita,)
        .then(response => {
            setOpenConfirmationModal(true)
            console.log(response.data.data)
        })
        .catch(error => {
            setOpenErrorModal(true)
            setError('Error al crear la citas')
            console.log('Error al crear la citas:', error);
        });
  }

  const updateCita = async (e:any)=> {
    e.preventDefault();
    const cita = { fecha, hora,  medicoId:doctor, tipo:especialidad, paciente };
    axios.put(`${import.meta.env.VITE_BASE_URL}/citas/${citaUpdate.id}`,cita)
    .then(response => {
        setOpenConfirmationModal(true)
        console.log(response.data.data)
    })
    .catch(error => {
        setOpenErrorModal(true)
        setError('Error al actualizar la cita')
        console.log('Error al actualizar la cita', error);
    });
  }

  const fetchCita = async (id:string) => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/citas`)
    .then(response => {
        const cita = response.data.data.filter((cita:any) => cita.id == id)[0]
        setCitaUpdate(cita)
        setFecha(cita.fecha)
        setHora(cita.hora)
        setPaciente(cita.paciente)
        setDoctor(cita.Medico.id)
        setEspecialidad(cita.tipo)
    })
    .catch(error => {
        console.error('Error al obtener las cita:', error);
        setError('Error al obtener la citas')
    });
}


  useEffect(()=>{
    fetchDoctors()
    if(params.id){
        fetchCita(params.id)
    } else {
        setCitaUpdate("")
        setFecha("")
        setHora("")
        setPaciente("")
        setDoctor("")
        setEspecialidad("")
    }
  },[params.id])

  return (
    <form onSubmit={(e)=>params.id? updateCita (e):createCita(e)} className='content form'>
        {params.id && <h1>Actualizar Cita</h1>}
        <ErrorModal message={error} isOpen={openErrorModal} onConfirm={()=>setOpenErrorModal(false)}/>
        <ErrorModal title={params.id ?"Cita Actualizada":"Cita creada"}  message={params.id? "Cita actualizada exitosamente":'Cita fue creada exitosamente'} isOpen={openConfirmationModal} onConfirm={()=>setOpenConfirmationModal(false)}/>
        <div className='form-row'>
            <div className="form-section">
                <label htmlFor="fecha">Fecha:</label>
                <input
                type="date"
                id="fecha"
                value={fecha}
                onChange={(event) => setFecha(event.target.value)}
                />
            </div>
            <div className="form-section">
                <label htmlFor="hora">Hora:</label>
                <input
                type="time"
                id="hora"
                value={hora}
                onChange={(event) => setHora(event.target.value)}
                />
            </div>
        </div>
        <div className='form-row'>
            <div className="form-section">
                <label htmlFor="fecha">Paciente:</label>
                <input
                    id="paciente"
                    value={paciente}
                    onChange={(event) => setPaciente(event.target.value)}
                    disabled={params.id?true:false}
                />
            </div>
        </div>
        <div className='form-row'>
            <div className="form-section">
                <label htmlFor="doctor">Doctor:</label>
                <select
                id="doctor"
                value={doctor}
                onChange={(event) => setDoctor(event.target.value)}
                disabled={params.id?true:false}
                >
                <option value="">Selecciona un doctor</option>
                {doctors.map((doctor, index) => (
                    <option key={index} value={doctor.id}>
                        {doctor.nombre}
                    </option>
                ))}
                </select>
            </div>
            <div className="form-section">
                <label htmlFor="especialidad">Especialidad:</label>
                <select
                    id="especialidad"
                    value={especialidad}
                    onChange={(event) => setEspecialidad(event.target.value)}
                    disabled={params.id?true:false}
                >
                <option value="">Selecciona una especialidad</option>
                <option value="Pediatría">Pediatría</option>
                <option value="Cardiología">Cardiología</option>
                <option value="Dermatología">Dermatología</option>
                {/* Agrega más opciones según las especialidades médicas que necesites */}
                </select>
            </div>
        </div>
        <div style={{display:'flex', justifyContent:'end', alignItems:'end', width:'60%'}}>

            <Link to="/"><button>Cancelar</button></Link>
            <button style={{backgroundColor:'#6750A4', color:'white', borderRadius:'10px'}} type="submit">{params.id ? 'Actualizar':'Guardar'}</button>
        </div>
    </form>
  );
};

