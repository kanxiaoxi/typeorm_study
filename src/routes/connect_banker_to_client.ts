import express from "express";
import { Banker } from "../entities/Banker";
import { Client } from "../entities/Client";

const router = express.Router();


router.put("/api/banker/:bankerId/client/:clientId", async (req, res) => {
  const { bankerId, clientId } = req.params;

  const client = await Client.findOne(parseInt(clientId));
  const banker = await Banker.findOne(parseInt(bankerId));

  if (client && banker) {
    banker.clients = [client];
    await banker.save();
    return res.json({
      msg: "该银行家和客户成功建立联系",
    });
  } else {
    return res.json({
      msg: "客户或银行家未找到",
    });
  }
});

export { router as connectBankerToClientRouter };
