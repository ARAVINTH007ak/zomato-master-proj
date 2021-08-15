import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { UserModel } from "../../database/user";

const Router = express.Router();

Router.post("/signup", async (req, res) => {
  try {
    const { email, password, fullname, phoneNumber } = req.body.credentials;

    const checkUserByEmail = await UserModel.findOne({ email: email });
    const checkUserByphone = await UserModel.findOne({
      phoneNumber: phoneNumber,
    });

    //! CHECKING IF EMAIL ALREADY EXISTS

    if (checkUserByEmail || checkUserByphone) {
      return res.json({ error: "User Already Exists!" });
    }

    //!Hashing Password
    const bcryptSalt = await bcrypt.genSalt(8);

    const hashedPassword = await bcrypt.hash(password, bcryptSalt);

    //!saving

    await UserModel.create({
      ...req.body.credentials,
      password: hashedPassword,
    });

    //!Generate JWT(JSON Web Token) auth token
    const token = jwt.sign({ user: { fullname, email } }, "zomatoApp");

    //!Return
    return res.status(200).json({ token, status: "Success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
