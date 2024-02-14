import { Sequelize } from 'sequelize';
import { credentials } from './config';

const devCredentials = credentials.development

const {database, user, password, host} = devCredentials

const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'postgres'
})

sequelize.sync()
  .then(() => {
    console.log('Modelo sincronizado con la base de datos');
  })
  .catch(err => {
    console.error('Error al sincronizar el modelo con la base de datos:', err);
});

export {
    sequelize
}