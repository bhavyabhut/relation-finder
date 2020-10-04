const { RelationSchema } = require("./Relation");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please enter name"],
    },
    directRelation: String,
    otherRelation: [RelationSchema],
  },
  { timestamps: true }
);
module.exports = mongoose.model("TestUser", UserSchema);
