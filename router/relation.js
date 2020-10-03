const relation = require("express").Router();

const {
  getUsers,
  postUser,
  postRelation,
  getUser,
  updateUser,
} = require("../controller/users");

relation.route("/users").get(getUsers).post(postUser);
relation.route("/relation").post(postRelation);
relation.route("/users/:userId").get(getUser).patch(updateUser);

module.exports = relation;
