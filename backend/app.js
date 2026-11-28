import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('API Working!');
});

app.use('/api/auth', (await
    import ('./routes/authRoutes.js')).default);
app.use('/api/admin', (await
    import ('./routes/adminRoutes.js')).default);
app.use('/api/services', (await
    import ('./routes/serviceRoutes.js')).default);
app.use('/api/availability', (await
    import ('./routes/availabilityRoutes.js')).default);
app.use('/api/bookings', (await
    import ('./routes/bookingRoutes.js')).default);
app.use('/api/integrations', (await
    import ('./routes/integrationRoutes.js')).default);
app.use('/api/payments', (await
    import ('./routes/paymentRoutes.js')).default);
app.use('/api/public', (await
    import ('./routes/publicRoutes.js')).default);
app.use('/public', (await
    import ('./routes/publicRoutes.js')).default);

export default app;