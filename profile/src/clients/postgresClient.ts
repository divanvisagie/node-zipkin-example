import { Client } from 'pg'

export const createPgClient = async () => {
  const client = new Client({
    database: 'profiles',
    user: 'root',
    password: 'password',
  })
  await client.connect()

  return client
  //   await client.end()
}
