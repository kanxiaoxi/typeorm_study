import { Connection, createConnection } from "typeorm";
import * as entities from "../entities"

const createDatabaseConnection = ():Promise<Connection> => {
  return createConnection({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: Object.values(entities),
      synchronize: true,
      logging: true
  })
}

export default createDatabaseConnection