import express, { Request, Response } from 'express'
import axios from 'axios'
import { bootstrap } from './bootstrap'

const PORT = 8081
const app = express()

const { consul } = bootstrap(PORT)

async function getUrlFor(serviceName: string): Promise<string> {
  const ps = (await consul.catalog.service.nodes(serviceName)) as any[]
  const firstItem = ps[0] || {}

  const url = `http://${firstItem.ServiceAddress}:${firstItem.ServicePort}`
  console.log(`Using url: `, url)
  return url
}

app.get('/', async (req: Request, res: Response) => {
  try {
    const url = await getUrlFor('profile')
    const response = await axios.get(`${url}/`)
    res.send(response.data)
  } catch (error) {
    console.error('/', error)
    res.sendStatus(501)
  }
})

app.get('/sign-up', async (req: Request, res: Response) => {
  try {
    const url = await getUrlFor('profile')
    const response = await axios.get(`${url}/sign-up`)
    res.send(response.data)
  } catch (error) {
    console.error('/', error)
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
