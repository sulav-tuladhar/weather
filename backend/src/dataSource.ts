import { DataSource } from "typeorm";
import { Weather } from "./entities/weather.entity";

export const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "weather_app",
    entities: [Weather],
    logging: true,
    synchronize: true,
})