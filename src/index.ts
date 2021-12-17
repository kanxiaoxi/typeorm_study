import { createConnection } from 'typeorm'
import { Banker } from './entities/Banker'
import { Client } from './entities/Client'
import { Transaction } from './entities/Transaction'

const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "wuxiaoshuai",
      password: "password",
      database: "typeorm_study",
      entities: [Client,Banker,Transaction],
      synchronize: true
    })
    console.log('成功连接到Postgres数据库')
  } catch(error) {
    console.error(error)
    throw new Error('连接数据库失败')
  }
}

main()