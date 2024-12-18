import { DataSource, DataSourceOptions } from "typeorm";
import {config as dotenvConfig} from 'dotenv';
import { registerAs } from "@nestjs/config";

dotenvConfig({path:'.env.development'});

const config = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities:[__dirname + '/../**/*.entity{.ts,.js}'],
    migrations:['dist/migrations/*{.js,.ts}'],
    ssl: {
        rejectUnauthorized: false,  // A veces se puede necesitar para ciertas configuraciones de PostgreSQL
    },
    synchronize: true, // TRUE
    logging: false,
    dropSchema: false,
}
export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);