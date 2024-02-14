
import { formatResponse } from "../common/response";
import { Medico } from "../models/doctor.model";

export class MedicosService {

    async getMedicos(){
        try {
          const medicos = await Medico.findAll();
          return formatResponse(200, '', medicos)
        //   res.json(citas);
        } catch (err) {
          console.error('Error al obtener la lista de doctores:', err);
          return formatResponse(500, 'Error al obtener la lista de doctores')
        //   res.status(500).json({ error: 'Error al obtener las citas médicas del paciente' });
        }
    }
      
}