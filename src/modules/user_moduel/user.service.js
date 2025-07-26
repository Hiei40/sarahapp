import { asyncHandler, successResponse } from "../../utils/responsed.js";
import * as dbService from "../../utils/db.service.js";
import { UserModel } from "../../DB/models/user.model.js";
import {generateIEncrypt,compareEncrypt} from "../auth_moduel"

export const profile = asyncHandler(async (req, res, next) => {
  const user = await dbService.findById({
    model: UserModel,
    id: req.params.userId
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
user.phone=generateIEncrypt(user.phone,"hamda salem ala hambozo").toString(CryptoJS.enc.Utf8);

  return successResponse({ res, message: "Done", data: { user } });
});
 