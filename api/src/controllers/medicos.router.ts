const express = require('express')

import { Request, Response } from 'express';
import { MedicosService } from '../services/doctors.service';

const router = express.Router();

const medicosService = new MedicosService()

router.get('/', async (req: Request, res: Response) => {

    const response = await medicosService.getMedicos()
    return res.status(response.status).json(response)

  }
);
  
export default router
  