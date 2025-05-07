const app = require('./learnWithUsApp');
const db = require('./models');

const PORT = 3000;

(async () => {
    try {
        await db.sequelize.authenticate();

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