import express from "express"
import { createQueryBuilder } from "typeorm"
import { Client } from "../entities/Client"

const router = express.Router()

router.get("/api/clients", async (_req, res)=>{
  const client = await createQueryBuilder('client')
  .select('client.first_name')
  .addSelect('client.balance')
  .from(Client, 'client')
  .leftJoinAndSelect('client.transactions', 'transactions')
  .where('client.id = :clientId', {clientId: 4})
  .where('client.balance >= :minBalance AND client.balance <= :maxBalance',{minBalance: 3000, maxBalance: 4500})
  .getMany()

  return res.json(client)
})

export {
  router as fetchClientRouter
}