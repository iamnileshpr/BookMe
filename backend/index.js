import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import http from 'http'


const port = process.env.PORT || 5000
const app = express()

//middlewares

app.use(cors())
app.use(express.json())

//database connection


//routes
app.get('/', (req, res) => {
    res.send('API WORKING')
})

const server = http.createServer(app)

server.on('error', (error) => {
    if (error.code == 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please use a different port.`)
        process.exit(1)
    }
    throw error
})

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})