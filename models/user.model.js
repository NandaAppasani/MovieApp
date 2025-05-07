const mongoose = require("mongoose");
const Counter = require("./counter.model");

const CouponSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    discountValue: { type: Number, required: true },
  },
  { _id: false }
);

const BookingSchema = new mongoose.Schema(
  {
    reference_number: { type: Number, required: true },
    coupon_code: { type: Number, required: true },
    show_id: { type: Number, required: true },
    tickets: [{ type: Number }],
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    userid: { type: Number, unique: true },
    email: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], required: true },
    isLoggedIn: { type: Boolean, default: false },
    accesstoken: { type: String, default: "" },
    coupens: { type: [CouponSchema], default: [] },
    bookingRequests: { type: [BookingSchema], default: [] },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isNew && !this.userid) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "userId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    this.userid = counter.sequence_value;
  }
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
