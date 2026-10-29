//only for test
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'
import availabilityRoutes from './routes/availabilityRoutes.js'
import integrationRoutes from './routes/integrationRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
const app = express()

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('API WORKING')
})

app.use('/api/auth', (await
    import ('./routes/authRoutes.js')).default)
app.use('/api/services', (await
    import ('./routes/serviceRoutes.js')).default)
app.use('/api/availability', (await
    import ('./routes/availabilityRoutes.js')).default)
app.use('/api/integration', (await
    import ('./routes/integrationRoutes.js')).default)
app.use('/api/bookings', (await
    import ('./routes/bookingRoutes.js')).default)
app.use('/api/payments', (await
    import ('./routes/paymentRoutes.js')).default)

export default app