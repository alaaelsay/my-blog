import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";


const config:PostgresConnectionOptions={
    type:"postgres",
    host:"localhost",
    port:5432,
    username:"postgres",
    password:"2000116Alaa",
    database:"blog2",
    entities:[__dirname + '/**/*.entity.{ts,js}'],
    synchronize: true
}

export default config;