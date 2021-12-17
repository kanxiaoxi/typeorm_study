import { createConnection } from "typeorm";
import express from "express";
import { Banker } from "./entities/Banker";
import { Client } from "./entities/Client";
import { Transaction } from "./entities/Transaction";
import { createClientRouter } from "./routes/create_client";
import { createBankerRouter } from "./routes/create_banker";

const app = express();

const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "wuxiaoshuai",
      password: "password",
      database: "typeorm_study",
      entities: [Client, Banker, Transaction],
      synchronize: true,
    });
    console.log("成功连接到Postgres数据库");

    app.use(express.json());
    app.use(createClientRouter);
    app.use(createBankerRouter);

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`服务器运行在${PORT}端口`);
    });
  } catch (error) {
    console.error(error);
    throw new Error("连接数据库失败");
  }
};

main();
