const express = require('express')
import citasRouter from './controllers/appointments.router'
import medicosRouter from './controllers/medicos.router'
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/citas', citasRouter)
app.use('/medicos', medicosRouter)

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});