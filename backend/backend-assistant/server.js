import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'
const app = express()

app.use(cors())
app.use(express.json())


app.listen(5000, () => console.log('Server running at http://localhost:5000'))