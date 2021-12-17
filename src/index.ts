import express from "express";
import "dotenv/config";
import { createClientRouter } from "./routes/create_client";
import { createBankerRouter } from "./routes/create_banker";
import { createTransactionRouter } from "./routes/create_transaction";
import { connectBankerToClientRouter } from "./routes/connect_banker_to_client";
import { deleteClientRouter } from "./routes/delete_client";
import { fetchClientRouter } from "./routes/fetch_clients";
import createDatabaseConnection from "./database/create_connection";
import { resetDatabaseRouter } from "./routes/reset_database";

const establishDataBaseConnection = async (): Promise<any> => {
  try {
    await createDatabaseConnection();
    console.log("成功连接到Postgres数据库");
  } catch (error) {
    console.error(error);
    throw new Error("连接数据库失败");
  }
};

const initializeExpress = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true}))
  app.use(createClientRouter);
  app.use(createBankerRouter);
  app.use(createTransactionRouter);
  app.use(connectBankerToClientRouter);
  app.use(deleteClientRouter);
  app.use(fetchClientRouter);
  app.use(resetDatabaseRouter)

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`服务器运行在${PORT}端口`);
  });
};

const main = async () => {
  await establishDataBaseConnection();
  initializeExpress();
};

main();
