import 'dotenv/config';
import http from 'http';
import { connectDB } from './config/db.js';
import app from './app.js';

const PORT = process.env.PORT || 5000;

const startServer = async() => {
    try {
        // Connect to MongoDB first
        await connectDB();

        // Start Express server
        console.log(
            "EXPRESS MIDDLEWARE STACK:",
            app.router.stack.map((layer, index) => ({
                index,
                name: layer.name,
                route: layer.route ? layer.route.path : undefined
            }))
        );
        const server = http.createServer(app);

        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`Port ${PORT} is already in use.`);
                process.exit(1);
            }

            console.error('Server error:', error);
            process.exit(1);
        });

        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();