import asyncHandler from "express-async-handler";
import * as dbService from "../../DB/db.service.js";
import { UserModel } from "../../DB/models/user.model.js";
import { verifytoken ,getSignatures} from "../../utils/security/token.security.js";
import {decodeToken} from "../../utils/security/token.security.js";
export const authentication = asyncHandler(async (req, res, next) => {
  req.user =  
await decodeToken({authorization:req.headers.authorization,next})
return next( );


});
