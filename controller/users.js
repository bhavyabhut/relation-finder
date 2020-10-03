const User = require("../model/User");
const { Relation } = require("../model/Relation");
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: { users } });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: { error: "Server Error" },
    });
  }
};
exports.getUser = async (req, res, next) => {
  const { userId } = req.params;
  if (!userId)
    res.status(400).json({
      success: false,
      data: { error: "Please enter user" },
    });
  try {
    const user = await User.findById(userId);
    if (user) res.status(200).json({ success: true, user });
    else res.status(400).json({ success: false, error: "No resources found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: { error: "Server Error" },
    });
  }
};
exports.postUser = async (req, res, next) => {
  const { name, directRelation } = req.body;
  console.log(name, directRelation, req.body);
  if (!name)
    res.status(400).json({
      success: false,
      data: { error: "Please enter name", fieldError: true, location: "name" },
    });
  else {
    const user = new User({
      name,
      directRelation: directRelation || "",
    });
    try {
      await user.save();
      res.status(201).json({ success: true, data: { user } });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        data: { error: "Server Error" },
      });
    }
  }
};

// relation

exports.postRelation = async (req, res, next) => {
  const { firstPerson, secondPerson, relation } = req.body;
  console.log(firstPerson, secondPerson, relation);
  if (!firstPerson || !secondPerson)
    res
      .status(400)
      .json({ success: false, data: { error: "Please select two people" } });
  if (!relation)
    res.status(400).json({
      success: false,
      data: {
        fieldError: true,
        location: "relation",
        error: "Please provide relation",
      },
    });
  try {
    const firstUser = await User.findById(firstPerson);
    const secondUser = await User.findById(secondPerson);
    if (!firstUser || !secondUser)
      res
        .status(400)
        .json({ success: false, data: { error: "No resources found" } });
    const relationObj = new Relation({
      relationWith: secondPerson,
      relationName: relation,
    });
    firstUser.otherRelation.push(relationObj);
    await firstUser.save();
    res.status(200).json({ success: true, data: { firstUser } });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: { error: "Server Error" },
    });
  }
};

exports.updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const { directRelation } = req.body;
  console.log(directRelation);
  if (!userId)
    res.status(400).json({
      success: false,
      data: { error: "Please enter user" },
    });
  try {
    const user = await User.findById(userId);
    if (user) {
      user.directRelation = directRelation;
      await user.save();
      res.status(200).json({ success: true, user });
    } else
      res.status(400).json({ success: false, error: "No resources found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: { error: "Server Error" },
    });
  }
};
