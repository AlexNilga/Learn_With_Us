
module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define(
    'User',
    {
      // Define columns
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false, // ensures it's not null
        unique: { msg: 'Username has already been taken' },
        validate: {
          isEmail: { msg: "Username must be a valid email address" }, // ensures it's a valid email format
          notEmpty: { msg: "Username is required" }, // ensures it's not an empty string
          len: {
            args: [3, 50], // Validate length (3 to 50 characters)
            msg: "Username must be between 3 and 50 characters long"
          },
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Password is required" }
        }
      },
      role: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [['Admin', 'User']],
            msg: 'Role must be one of Admin, User'
          }
        },
        defaultValue: "User"
      }
    },
    {
      tableName: 'Users', // Match your actual table name
      timestamps: false   // Disable if your table doesn't use timestamps
    },
  );

  // 🔽 Override toJSON on the prototype
  User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    return values;
  };

  User.associate = (models) => {
    User.hasMany(models.Category, {
      foreignKey: 'userId',
      as: 'categories',
    });
  };

  return User;
};
