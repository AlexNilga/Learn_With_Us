
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
        type: DataTypes.STRING(500),
        unique: { msg: 'Category name has already been taken' }, // Enforce uniqueness
        validate: {
          notEmpty: { msg: "name cannot be empty" },
          len: {
            args: [3, 500],
            msg: "Catgory name must be from 3 to 500 characters"
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: { msg: "description cannot be empty" }
        }
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
    },
    {
      tableName: 'Category', // Match your actual table name
      timestamps: false   // Disable if your table doesn't use timestamps
    }
  );

  Category.associate = (models) => {
    Category.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'creator',
    });

    Category.hasMany(models.Content, {
      foreignKey: 'categoryId',
      as: 'contents',
    });
  };

  Category.hasMany(Category, {
    as: 'children',
    foreignKey: 'parentId'
  });
  
  Category.belongsTo(Category, {
    as: 'parent',
    foreignKey: 'parentId'
  });


  return Category;
};