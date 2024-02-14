import { sequelize } from "../database/conn";
import { DataTypes } from 'sequelize';
import { Cita } from "./appointment.model";

export const Medico = sequelize.define('Medico', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    especialidad: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  