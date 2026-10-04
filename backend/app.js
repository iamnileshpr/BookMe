//only for test
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API WORKING')
})

app.use('/api/auth', (await
    import ('./routes/authRoutes.js')).default)

export default app