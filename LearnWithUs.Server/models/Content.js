
module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define(
    'Content',
    {
      // Define columns
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Content name cannot be empty" },
          len: {
            args: [10, 1000],
            msg: "name must be from 10 to 100 characters"
          }
        }
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Content description cannot be empty" },
          len: {
            args: [10, 1000],
            msg: "description must be from 10 to 1000 characters"
          }
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    },
    {
      tableName: 'Contents', // Match your actual table name
      timestamps: false   // Disable if your table doesn't use timestamps
    }
  );

  Content.associate = (models) => {
    Content.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'creator',
    });
    
    Content.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'parent',
    });
  };

  return Content;
};