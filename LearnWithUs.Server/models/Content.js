
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
            args: [3, 1000],
            msg: "name must be from 3 to 100 characters"
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

  // Override toJSON on the prototype, to hide the path hash
  Content.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.path;
    return values;
  };

  Content.associate = (models) => {
    Content.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'creator',
    });
    
    Content.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category',
    });
  };

  return Content;
};