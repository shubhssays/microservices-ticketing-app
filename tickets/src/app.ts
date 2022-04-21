import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import { errorHandler, NotFoundError } from '@devshubhs_micro_ta/common'


const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}))

app.all('*', async () => {
    throw new NotFoundError
})

// app.all('*',async (req, res, next) =>{
//     next(new NotFoundError)
// }) 

app.use(errorHandler)

export { app }