import 'dotenv/config'
import http from 'http'
import { connectDB } from './config/db.js'
import app from './app.js'

const port = process.env.PORT || 5000

connectDB()

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