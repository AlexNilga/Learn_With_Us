
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
        type: DataTypes.TEXT,
        validate: {
          notEmpty: { msg: "content comment text cannot be empty" },
          len: {
            args: [10, 4000],
            msg: "Comment must be from 10 to 4000 characters"
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
      tableName: 'ContentComment', // actual table name
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