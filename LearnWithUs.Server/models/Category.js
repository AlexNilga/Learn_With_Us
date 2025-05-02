
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      // Define columns
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: { msg: 'Category name has already been taken' }, // Enforce uniqueness
        validate: {
          notEmpty: { msg: "name cannot be empty" },
          len: {
            args: [3, 100],
            msg: "description must be between from 3 to 100 characters"
          }
        }
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "description cannot be empty" },
          len: {
            args: [3, 1024],
            msg: "description must be between from 3 to 1K characters"
          }
        }
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Make userId required
      },
    },
    {
      tableName: 'Categories', // Match your actual table name
      timestamps: false   // Disable if your table doesn't use timestamps
    }
  );

  Category.associate = (models) => {
    Category.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'creator',
    });
  };

  return Category;
};