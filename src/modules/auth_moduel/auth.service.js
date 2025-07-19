import { UserModel } from "../../DB/models/user.model.js";
import { asyncHandler } from 'express-async-handler';
import { findOne, create } from '../../DB/db.service.js';
import { successResponse } from '../../utils/responsed.js';
import bcrypt from "bcryptjs";
import { generateIHash } from './your-hash-file.js'; // Adjust the import path

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

  // 2. تشفير كلمة المرور using generateIHash
  const hashedPassword = await generateIHash(password, 10);

  // 3. إنشاء المستخدم
  const user = await create({
    model: UserModel,
    data: { fullName, email, password: hashedPassword, phone },
  });

  return successResponse({
    res,
    message: "User created successfully",
    status: 201,
    data: { user },
  });
});

// ================== Login Controller ==================
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. ابحث عن المستخدم عن طريق البريد الإلكتروني مع تأكيد النشاط
  const user = await findOne({
    model: UserModel,
    filter: { 
      email,
      isActive: true // التأكد من أن المستخدم نشط
    },
  });

  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }

  // 2. تحقق من كلمة المرور
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }

  // 3. تسجيل الدخول ناجح
  return successResponse({
    res,
    message: "Login successful",
    data: { user },
  });
});