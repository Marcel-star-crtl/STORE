"use server";

const User = require("@/lib/models/user.modal");
const { connect } = require("@/lib/mongoDB");

async function createUser(user) {
  try {
    await connect();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createUser,
};
