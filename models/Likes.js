//create a table in mysql

module.exports = (sequelize, DataType) => {
  const Likes = sequelize.define("Likes", {});
  return Likes;
};
