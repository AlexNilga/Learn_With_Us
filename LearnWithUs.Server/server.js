const app = require('./app');
const db = require('./models');
const initDatabase = require('./databaseInit');

const PORT = 3000;

(async () => {
    try {
        await db.sequelize.authenticate();

        await initDatabase();

        const server = app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });

        // Graceful shutdown
        process.on('SIGINT', async () => {
            console.log('\nShutting down...');
            await db.sequelize.close();
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });

    } catch (err) {
        db.sequelize.close();
        console.error('Failed to start app:', err);
    }
})();