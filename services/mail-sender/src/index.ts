import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import { bootstrap } from './bootstrap'

const PORT = 8084

bootstrap(PORT)

const app = express()

app.use(bodyParser.json())

app.post('/send', async (req: Request, res: Response) => {
  try {
    // TODO: Parse JSON
    res.send(req.body.body)
  } catch (error) {
    res.sendStatus(501)
  }
})

app.get('/health', async (req: Request, res: Response) => {
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
