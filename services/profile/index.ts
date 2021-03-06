import express, { Request, Response } from 'express'
import { bootstrap } from './src/bootstrap'
import { createPgClient } from './src/clients/postgresClient'

const PORT = 8080

const { consul } = bootstrap(PORT)

async function main() {
  const app = express()
  const client = await createPgClient()

  app.get('/', async (_req: Request, res: Response) => {
    try {
      const result = await client.query('SELECT * from users')
      console.log(result.rows) // Hello world!
      res.send(result.rows)
    } catch (error) {
      res.sendStatus(501)
    }
  })

  app.get('/sign-up', async (_req: Request, res: Response) => {
    try {
      // TODO: write to db
      // TODO: Send mail
      const nodes = consul.catalog.service.nodes('mail-service')
      res.status(201).send(nodes)
    } catch (error) {
      res.sendStatus(501)
    }
  })

  app.get('/health', async (_req: Request, res: Response) => {
    try {
      console.log('Healthcheck')
      res.send('OK')
    } catch (error) {
      console.error(error)
      res.sendStatus(501)
    }
  })

  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })
}
main()
