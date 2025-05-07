
module.exports = (sequelize, DataTypes) => {
  const ContentComment = sequelize.define(
    'ContentComment',
    {
      // Define columns
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      text: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Content comment text cannot be empty" },
          len: {
            args: [3, 1000],
            msg: "Comment must be from 3 to 1000 characters"
          }
        }
      },
      contentId: {
        type: DataTypes.UUID,
        allowNull: false
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
      tableName: 'ContentComments', // actual table name
      timestamps: false   // Disable if your table doesn't use timestamps
    }
  );

  ContentComment.associate = (models) => {
    ContentComment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'creator'
    });

    ContentComment.belongsTo(models.Content, {
      foreignKey: 'contentId',
      as: 'content'
    });
  };

  return ContentComment;
};