import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";


const config:PostgresConnectionOptions={
    type:"postgres",
    host:"localhost",
    port:5432,
    username:"postgres",
    password:"2000116Alaa",
    database:"blog2",
    entities:[__dirname + '/**/*.entity.{ts,js}'],
    migrationsTableName:'migrations',
    migrations:[__dirname + '/migrations/**/*.ts']
}

const AppDataSource= new DataSource(config)

export {AppDataSource}

export default config;