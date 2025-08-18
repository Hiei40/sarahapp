import { UserModel } from "../../DB/models/user.model.js";
// import { asyncHandler } from 'express-async-handler';
import { findOne, create } from "../../DB/db.service.js";
import { asyncHandler, successResponse } from '../../utils/responsed.js';
// import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import { generateIHash } from '../../utils/security/hash.security.js'; // تأكد من أن المسار صحيح
import {generateIEncrypt,compareEncrypt} from "../../utils/security/encryption.security.js";
import nodemailer from "nodemailer";

// ================== Signup Controller ==================
export const signup = asyncHandler(async (req, res, next) => {
  const { fullName, email, password, phone } = req.body;

  // 1. تحقق من أن البريد الإلكتروني غير مستخدم
  const existingUser = await findOne({
    model: UserModel,
    filter: { email },
  });

  if (existingUser) {
    return res.status(409).json({ success: false, message: "Email already exists" });
  }

  // 2. تشفير كلمة المرور
  const hashedPassword = await generateIHash(password, 10);
const encphone=await generateIEncrypt(phone,"HamadaSalam3laHambozo").toString();

  // 3. إنشاء المستخدم مع isActive = true
  const user = await create({
    model: UserModel,
    data: { fullName, email, password: hashedPassword,phone: encphone, isActive: true },
  });

  // 4. إزالة كلمة المرور من الاستجابة
  const { password: _, ...userData } = user._doc;

  return successResponse({
    res,
    message: "User created successfully",
    status: 201,
    data: { user: userData },
  });
});


// ================== Login Controller ==================
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. ابحث عن المستخدم وتأكد أنه نشط
  const user = await findOne({
    model: UserModel,
    filter: { email, isActive: true },
  });

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }

  // 2. تحقق من كلمة المرور
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }

  // 3. إنشاء التوكينات
  const accessToken = jwt.sign(
    { _id: user._id, isLoggedIn: true },
    "FW$Q$T$#@%",
    { expiresIn: 60 * 60 * 24 } // 24 ساعة
  );

  const refreshToken = jwt.sign(
    { _id: user._id, isLoggedIn: true },
    "FW$Q$T$#@%",
    { expiresIn: "1y" } // سنة
  );

  // 4. إزالة كلمة المرور من الاستجابة
  const { password: _, ...userData } = user._doc;

  return successResponse({
    res,
    message: "Login successful",
    data: { user: userData, accessToken, refreshToken },
  });
});

export const updatePassword = asyncHandler(async (req, res, next) => {
  const { email, newPassword } = req.body;

  // 1. تحقق من البيانات
  if (!email || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Email and new password are required",
    });
  }

  // 2. ابحث عن المستخدم
  const user = await findOne({
    model: UserModel,
    filter: { email, isActive: true },
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // 3. اعمل hash للباسورد الجديد
  const hashedPassword = await generateIHash(newPassword, 10);

  // 4. اعمل update
  user.password = hashedPassword;
  await user.save();

  // 5. رد بالنجاح
  return successResponse({
    res,
    message: "Password updated successfully",
    data: { email: user.email },
  });
});

export const hi = asyncHandler(async (req, res, next) => {
  const { email } = req.body; 

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required to say hi",
    });
  }

  const user = await findOne({
    model: UserModel,
    filter: { email, isActive: true },
  });

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email, you can't say hi",
    });
  }

  // نشيل الباسوورد من الاستجابة
  const { password: _, ...userData } = user._doc;

  return successResponse({
    res,
    message: `I say hi to ${user.fullName}`,
    data: { user: userData },
  });
});