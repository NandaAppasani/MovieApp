const Counter = require("../models/counter.model");
const User = require("./../models/user.model");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const TokenGenerator = require("uuid-token-generator");
const b2a = (input) => Buffer.from(input).toString("base64");

require("dotenv").config();
const tokgen = new TokenGenerator();

const findAllUsers = async () => {
  return await User.find();
};

const createNewUser = async (body) => {
  const {
    email,
    password,
    first_name,
    last_name,
    role,
    contact,
    coupens,
    bookingRequests,
  } = body;

  const counter = await Counter.findByIdAndUpdate(
    { _id: "userId" },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );

  const userId = counter.sequence_value;

  const uuid = uuidv4();
  const accessToken = tokgen.generate();

  const username = b2a(`${first_name}${last_name}`);

  const newUser = new User({
    userid: userId,
    email,
    first_name,
    last_name,
    username,
    contact,
    password: b2a(password),
    role,
    isLoggedIn: false,
    uuid,
    accesstoken: accessToken,
    coupens: coupens || [],
    bookingRequests: bookingRequests || [],
  });

  await newUser.save();

  return newUser;
};

const loginHandler = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid Credentials");

  const encoded = b2a(password);
  if (encoded !== user.password) {
    throw new Error("Email and password combination do not match!");
  }

  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  user.accesstoken = token;
  await user.save();

  return {
    id: user._id,
    role: user.role,
    token: token,
  };
};

const logoutHandler = async (token) => {
  const user = await User.findOne({ accesstoken: token });
  user.accesstoken = "";
  return await user.save();
};

const getCouponById = async (email, couponId) => {
  const user = await User.findOne({ email });
  if (!user) return null;

  return user.coupens.find((coupon) => coupon.id === couponId) || null;
};

const bookShow = async (email, booking) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  user.bookingRequests.push(booking);
  await user.save();
};

const bulkCreateUsers = async (body) => {
  const userList = [];
  for (const user of body) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "userId" },
      { $inc: { sequence_value: 1 } },
      { new: true }
    );
    userList.push({
      ...user,
      userid: counter.sequence_value,
    });
  }

  const users = await User.insertMany(userList);

  return users;
};

module.exports = {
  findAllUsers,
  createNewUser,
  bulkCreateUsers,
  loginHandler,
  logoutHandler,
  getCouponById,
  bookShow,
};
