import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    address: [{ details: { type: String }, for: { type: String } }],
    phoneNumber: [Number],
  },
  {
    timestamps: true,
  }
);   

export const UserModel = mongoose.model("Users", UserSchema);
