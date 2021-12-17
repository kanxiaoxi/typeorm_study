import { createConnection } from 'typeorm'

const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "wuxiaoshuai",
      password: "password",
      database: "typeorm_study"
    })
    console.log('成功连接到Postgres数据库')
  } catch(error) {
    console.error(error)
    throw new Error('连接数据库失败')
  }
}

main()