import { asyncHandler, successResponse } from "../../utils/responsed.js";
import * as dbService from "../../utils/db.service.js";
import { UserModel } from "../../DB/models/user.model.js";
import {generateIEncrypt,compareEncrypt} from "../auth_moduel"
import { jwt } from "jwt-decode";

export const profile = asyncHandler(async (req, res, next) => {
 console.log (req.headers);
 const { authorization}=req.headers;
 const decode=jwt.verify(authorization,"FW$Q$T$#@%");
 console.log(decode);

 const user = await dbService.findById({
 
    model: UserModel,
    id: decode._id
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
user.phone=generateIEncrypt(user.phone,"hamda salem ala hambozo").toString(CryptoJS.enc.Utf8);

  return successResponse({ res, message: "Done", data: { user } });
});
 