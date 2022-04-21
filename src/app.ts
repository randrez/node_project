import bodyParser from 'body-parser'
import express from 'express'
import { NOT_FOUND_STATUS_CODE, NOT_FOUND_STATUS_MESSAGE } from './config/constants'
import {routes as apiRoutes} from './routes/index'

const app = express()

app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }))
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.json({ status: true, message: 'Server OK!' }))
app.use('/api', apiRoutes)

app.use((req, res, next) => {
  const err = new Error(NOT_FOUND_STATUS_MESSAGE)
  res.statusCode = NOT_FOUND_STATUS_CODE
  res.send(err.message)
});

export { app }