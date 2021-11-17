import express, { Request, Response } from 'express'

const PORT = process.env.PORT || 8080
const app = express()

app.get('/', (req: Request, res: Response) => {
  res.send({
    name: 'Static User',
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
