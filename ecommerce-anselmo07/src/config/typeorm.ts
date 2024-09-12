import { DataSource, DataSourceOptions } from "typeorm";
import {config as dotenvConfig} from 'dotenv';
import { dirname } from "path";
import { registerAs } from "@nestjs/config";

dotenvConfig({path:'.env.developmet'});

const config = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities:[__dirname + '/../**/*.entity{.ts,.js}'],
    migrations:['dist/migrations/*{.js,.ts}'],
    synchronize: true,
    logging: true,
}
export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);