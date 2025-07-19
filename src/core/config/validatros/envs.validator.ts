import * as Joi from 'joi';
import { EnvsI } from '../domain/interfaces/EnvsI';

export const envsValidator = Joi.object<EnvsI>({
  DB_NAME: Joi.string().required().description('Name of the database'),
  DB_PORT: Joi.number().required().description('Port of the database'),
  DB_HOST: Joi.string().required().description('Hsot of the database'),
  DB_USERNAME: Joi.string()
    .required()
    .description('Username to acess at database'),
  DB_PASSWORD: Joi.string().required().description('Password of the database'),
  BROKER_HOSTS: Joi.array()
    .items(Joi.string())
    .required()
    .description('Hosts of the message broker'),
}).unknown(true);
