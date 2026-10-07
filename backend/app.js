//only for test
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'

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

export default app