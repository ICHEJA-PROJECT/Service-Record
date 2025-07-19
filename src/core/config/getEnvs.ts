import 'dotenv/config';
import { EnvsI } from "./domain/interfaces/EnvsI";
import { envsValidator } from "./validatros/envs.validator"

const getEnvs = (): EnvsI => {
    const { error, value } = envsValidator.validate({
        ...process.env,
        BROKER_HOSTS: process.env.BROKER_HOSTS?.split(','),
    });

    if(error) {
        throw new Error(`Invalid enviroment variables: ${error.message}`);
    }

    return {
        PORT: value.PORT,
        DB_NAME: value.DB_NAME,
        DB_PORT: value.DB_PORT,
        DB_HOST: value.DB_HOST,
        DB_USERNAME: value.DB_USERNAME,
        DB_PASSWORD: value.DB_PASSWORD,
        BROKER_HOSTS: value.BROKER_HOSTS
    };
};

export const envsValues = getEnvs();