const express = require('express')

import { Request, Response } from 'express';
import { CitaInterface } from '../models/appointment.model';
import { CitasService } from '../services/appointments.service';

const router = express.Router();

const citasService = new CitasService()

router.post('/', async (req: Request, res: Response) => {

    const response = await citasService.createCita(req.body as CitaInterface)
    return res.status(response.status).json(response)

  }
);
  
router.get('/', async (req: Request, res: Response) => {

    const response = await citasService.getCitas()
    return res.status(response.status).json(response)

  }
);
  
router.put('/:id', async (req: Request, res: Response) => {

    const id = req.params.id;
    const response = await citasService.updateCita(id,req.body as CitaInterface)
    return res.status(response.status).json(response)

  }
);
  
router.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const response = await citasService.deleteCita(id)
    return res.status(response.status).json(response)
  });
  
router.put('/asignar/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const { medicoId } = req.body;

    const response = await citasService.adminUpdateCita(id,medicoId)
    return res.status(response.status).json(response)
});

export default router