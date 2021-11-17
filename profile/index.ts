import express, { Request, Response } from 'express'
import { createPgClient } from './clients/postgresClient'

const PORT = process.env.PORT || 8080
const app = express()

async function main() {
  const client = await createPgClient()

  app.get('/', async (req: Request, res: Response) => {
    try {
      const result = await client.query('SELECT * from usersa')
      console.log(result.rows) // Hello world!
      res.send(result.rows)
    } catch (error) {
      res.sendStatus(501)
    }
  })

  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })
}
main()
