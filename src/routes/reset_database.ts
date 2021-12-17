import express from "express";
import resetDatabase from "../database/reset_database";

const router = express.Router();

router.delete("/api/reset-database", async (_req, res):Promise<any> => {
  if (process.env.NODE_ENV === "test") {
    await resetDatabase();
    return res.json({
      msg: "数据库重置完成"
    });
  }
});

export { router as resetDatabaseRouter };
