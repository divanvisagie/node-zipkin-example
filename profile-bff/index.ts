import express, { Request, Response } from 'express'
// import fetch from 'node-fetch'
import axios from 'axios'

const PORT = 8081
const app = express()

app.get('/', async (req: Request, res: Response) => {
  const response = await axios.get('http://localhost:8080')
  res.send(response.data)
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
