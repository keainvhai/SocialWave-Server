//create a table in mysql

module.exports = (sequelize, DataType) => {
  const Posts = sequelize.define("Posts", {
    title: { type: DataType.STRING, allowNull: false },
    postText: { type: DataType.STRING, allowNull: false },
    username: { type: DataType.STRING, allowNull: false },
  });

  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      //delete a post from table,will delete all commnets related to post
      onDelete: "cascade",
    });

    Posts.hasMany(models.Likes, {
      //delete a post from table,will delete all commnets related to post
      onDelete: "cascade",
    });
  };

  return Posts;
};
