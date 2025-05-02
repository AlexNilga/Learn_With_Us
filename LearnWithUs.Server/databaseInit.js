const db = require('./models');

const User = db.User;
const Category = db.Category;


async function initDatabase() {
  try {
    console.log('Connected to SQL Server');

    // Create tables if they don't exist
    await db.sequelize.sync({ force: true }); // `force: true` drops and recreates
    console.log('Tables synced successfully');

    // Create a super adim with password 'welome123'
    const superAdmin = await db.User.create(
      {
        username: 'superadmin@example.com',
        role: "Admin",
        password: "$2b$10$BnSP5uCQ4hMXmO3.787peeqOMlVVO7poPpfHZEY9Ec.GlRUTBYkG6",
        firstName: "Super",
        lastName: "Admin",
      }
    );

    const users = await User.findAll();
    console.log('Users:', users.map(u => u.toJSON()));

    // Populate categories
    await Category.create(
      {
        name: 'Math',
        description: "Materials related to math",
        userId: superAdmin.id // Associate with super admin
      }
    );

    await Category.create(
      {
        name: 'Psychology',
        description: "Materials related to psychology",
        userId: superAdmin.id // Associate with super admin
      }
    );

    const categories = await Category.findAll();
    console.log('Categories:', categories.map(c => c.toJSON()));

  } catch (err) {
    console.error('Error:', err);
  } finally {
  }
}

module.exports = initDatabase
