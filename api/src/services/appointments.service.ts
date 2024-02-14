import { ResponseInterface, formatResponse } from "../common/response";
import { Cita, CitaInterface } from "../models/appointment.model";
import { Medico } from "../models/doctor.model";

export class CitasService {

    async createCita(citaInfo:CitaInterface):Promise<ResponseInterface> {
        const { paciente, fecha, hora, tipo, medicoId } = citaInfo;
        try {
      
          const citas:CitaInterface[] = await Cita.findAll({ where: { medicoId, estado: 'Agendada' } }) as any;
          const date = new Date(`${fecha} ${hora}:00`) as any

          const busyAppointment = citas.filter((cita) => {
            const date2 = new Date(`${cita.fecha} ${cita.hora}:00`) as any

            const differenciaMilisegundos = (date as number) - (date2 as number)

            if(differenciaMilisegundos < 1800000 /* 30 minutos*/) return true
            return false
          })

          if (busyAppointment.length > 0) {
            return formatResponse(400, 'El médico ya tiene una cita agendada en esta fecha y hora')
          }
      
          await Cita.create({ paciente, fecha, hora, tipo, medicoId, estado: 'Agendada' });
          return formatResponse(201, 'Cita médica agendada exitosamente')
        //   res.status(201).json({ message:  });
        } catch (err) {
          console.error('Error al agendar la cita médica:', err);
          return formatResponse(500, 'Error al agendar la cita médica')
        //   res.status(500).json({ error:  });
        }
    }
      
    async getCitas(){
        try {
          const citas = await Cita.findAll({ where:{estado:'Agendada'}, include: [{
            model: Medico,
            required: true
           }]});
          return formatResponse(200, '', citas)
        //   res.json(citas);
        } catch (err) {
          console.error('Error al obtener las citas médicas del paciente:', err);
          return formatResponse(500, 'Error al obtener las citas médicas del paciente')
        //   res.status(500).json({ error: 'Error al obtener las citas médicas del paciente' });
        }
    }
      
    async updateCita(id:string, cita:CitaInterface):Promise<ResponseInterface>{
        const { fecha, hora } = cita;
        try {
          const cita:CitaInterface = (await Cita.findByPk(id)) as any;
          const citas = await Cita.findAll({ where: { medicoId: cita?.medicoId, fecha, hora, estado: 'Agendada' } });
          if (citas.length > 0) {
            return formatResponse(400, 'El médico ya tiene una cita agendada en esta fecha y hora')
            // return res.status(400).json({ error: 'El médico ya tiene una cita agendada en esta fecha y hora' });
          }
          await Cita.update({ fecha, hora }, { where: { id } });
          return formatResponse(201, 'Cita médica actualizada exitosamente')
        //   res.json({ message: 'Cita médica actualizada exitosamente' });
        } catch (err) {
          console.error('Error al actualizar la cita médica:', err);
          return formatResponse(500, 'Error al actualizar la cita médica')
        //   res.status(500).json({ error: 'Error al actualizar la cita médica' });
        }
    }
      
    async deleteCita(id:string):Promise<ResponseInterface>{
        try {
          await Cita.update({ estado: 'Cancelada' }, { where: { id } });
          return formatResponse(204, 'Cita médica cancelada exitosamente')
        //   res.json({ message: 'Cita médica cancelada exitosamente' });
        } catch (err) {
          console.error('Error al cancelar la cita médica:', err);
          return formatResponse(500, 'Error al cancelar la cita médica')
        //   res.status(500).json({ error: 'Error al cancelar la cita médica' });
        }
    }
      
    async adminUpdateCita(id:string, doctorId:string):Promise<ResponseInterface>{

        try {
          const cita:CitaInterface = (await Cita.findByPk(id)) as any;
          const citas = await Cita.findAll({ where: { medicoId:doctorId, fecha: cita.fecha, hora: cita.hora, estado: 'Agendada' } });
          if (citas.length > 0) {
            return formatResponse(400, 'El médico ya tiene una cita agendada en esta fecha y hora')
            // return res.status(400).json({ error: 'El médico ya tiene una cita agendada en esta fecha y hora' });
          }
      
          await Cita.update({ medicoId:doctorId }, { where: { id } });
          return formatResponse(201, 'Cita médica actualizada exitosamente')
        } catch (err) {
          console.error('Error al asignar el médico a la cita médica:', err);
          return formatResponse(500, 'Error al asignar el médico a la cita médica')
        //   res.status(500).json({ error: 'Error al asignar el médico a la cita médica' });
        }
    }
}