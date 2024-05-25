import { myDataSource } from "../dataSource";
import { Weather } from "../entities/weather.entity";

export const repo = {
    weatherRepo: myDataSource.getRepository(Weather)
}