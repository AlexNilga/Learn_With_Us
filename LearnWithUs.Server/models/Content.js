
module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define(
    'Content',
    {
      // Define columns
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      path: {
        type: DataTypes.STRING(2048),
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(1000),
        validate: {
          notEmpty: { msg: "Content name cannot be empty" },
          len: {
            args: [3, 1000],
            msg: "name must be from 3 to 100 characters"
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: { msg: "Content description cannot be empty" },
          len: {
            args: [10, 1000],
            msg: "description must be from 10 to 1000 characters"
          }
        }
      },
      mimeType: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false
      },      
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
    },
    {
      tableName: 'Content', // Match your actual table name
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

    Content.hasMany(models.ContentComment, {
      foreignKey: 'contentId',
      as: 'contentComments',
    });
  };

  return Content;
};