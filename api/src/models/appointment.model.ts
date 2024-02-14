import { sequelize } from "../database/conn";
import { DataTypes } from 'sequelize';
import { Medico } from "./doctor.model";

export interface CitaInterface {
    id: number;
    paciente: string;
    fecha: Date;
    hora: string;
    tipo: string;
    estado: 'Agendada' | 'Cancelada';
    medicoId: number;
}

export const Cita = sequelize.define('Cita', {
    paciente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('Agendada', 'Cancelada'),
        defaultValue: 'Agendada'
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

Medico.hasMany(Cita, { foreignKey: 'medicoId' });
Cita.belongsTo(Medico, { foreignKey: 'medicoId' });