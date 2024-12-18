import { DataSource, DataSourceOptions } from "typeorm";
import {config as dotenvConfig} from 'dotenv';
import { dirname } from "path";
import { registerAs } from "@nestjs/config";

dotenvConfig({path:'.env.development'});

const config = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities:[__dirname + '/../**/*.entity{.ts,.js}'],
    migrations:['dist/migrations/*{.js,.ts}'],
    synchronize: false, // TRUE
    logging: false,
    dropSchema: false,
}
export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);