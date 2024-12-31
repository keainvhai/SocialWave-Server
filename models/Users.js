//create a table in mysql

module.exports = (sequelize, DataType) => {
  const Users = sequelize.define("Users", {
    username: { type: DataType.STRING, allowNull: false },
    password: { type: DataType.STRING, allowNull: false },
  });

  // Users.associate = (models) => {
  //   Users.hasMany(models.Posts, {
  //     //delete a post from table,will delete all commnets related to post
  //     onDelete: "cascade",
  //   });
  // };

  Users.associate = (models) => {
    Users.hasMany(models.Likes, {
      //delete a post from table,will delete all commnets related to post
      onDelete: "cascade",
    });

    Users.hasMany(models.Posts, {
      //delete a post from table,will delete all commnets related to post
      onDelete: "cascade",
    });
  };
  return Users;
};
