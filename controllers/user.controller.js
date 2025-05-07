const userService = require("./../services/user.service");

const findAllUsers = async (req, res) => {
  try {
    const users = await userService.findAllUsers();
    res.status(200).json({
      data: users,
      message: "Users list fetched successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message || err,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Email and Password are required",
      });
    }
    const response = await userService.loginHandler(req.body);
    res.status(200).json({
      data: response,
      message: "Login successful",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message || err,
    });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }
    await userService.logoutHandler(token);
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message || err,
    });
  }
};

const addUser = async (req, res) => {
  try {
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        message: "Invalid request, please check your request body",
      });
    }

    const user = await userService.createNewUser(body);

    if (user) {
      return res.status(201).json({
        data: {
          id: user._id,
          email: user.email,
          username: user.username,
          token: user.accesstoken,
        },
        message: "User created successfully",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message || err,
    });
  }
};

const bulkCreate = async (req, res) => {
  try {
    const body = req.body;
    if (body?.length === 0) {
      res.status(400).json({
        message: "Invalid request, please check your request body",
      });
    }
    const users = await userService.bulkCreateUsers(body);
    if (users) {
      res.status(201).json({
        data: null,
        message: "Users created successfully",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message || err,
    });
  }
};

const getCouponCode = async (req, res) => {
  try {
    const { email, couponId } = req.query;

    if (!email || !couponId) {
      return res
        .status(400)
        .json({ message: "Email and couponId are required" });
    }

    const coupon = await userService.getCouponById(email, Number(couponId));

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    return res.status(200).json({
      data: coupon,
      message: "Coupon fetched successfully",
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const bookShow = async (req, res) => {
  try {
    const { email, booking } = req.body;

    if (
      !email ||
      !booking ||
      !booking.reference_number ||
      !booking.show_id ||
      !booking.tickets
    ) {
      return res.status(400).json({ message: "Incomplete booking details" });
    }

    await userService.bookShow(email, booking);

    return res.status(200).json({
      message: "Show booked successfully",
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

module.exports = {
  findAllUsers,
  addUser,
  bulkCreate,
  login,
  logout,
  getCouponCode,
  bookShow,
};
