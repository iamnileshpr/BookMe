import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import http from 'http'
import { connectDB } from './config/db.js'

const app = express()

// DB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.send('API Working!')
})

app.use('/api/auth', (await
    import ('./routes/authRoutes.js')).default)
app.use('/api/admin', (await
    import ('./routes/adminRoutes.js')).default)
app.use('/api/services', (await
    import ('./routes/serviceRoutes.js')).default)
app.use('/api/availability', (await
    import ('./routes/availabilityRoutes.js')).default)
app.use('/api/bookings', (await
    import ('./routes/bookingRoutes.js')).default)
app.use('/api/integrations', (await
    import ('./routes/integrationRoutes.js')).default)
app.use('/api/payments', (await
    import ('./routes/paymentRoutes.js')).default)
app.use('/api/public', (await
    import ('./routes/publicRoutes.js')).default)
app.use('/public', (await
    import ('./routes/publicRoutes.js')).default)

const PORT = 5001
const server = http.createServer(app)

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Stop the existing backend process or set a different PORT in backend/.env.`)
        process.exit(1)
    }

    throw error
})

server.listen(PORT, () => {
    console.log(`Server Started on http://localhost:${PORT}`)
})

export default app