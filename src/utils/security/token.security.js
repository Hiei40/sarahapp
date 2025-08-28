import jwt from 'jsonwebtoken';
import * as dbService from "../../DB/db.service.js";
export const SignatureTypeEnum = {system:'system',bearer:"Bearer"};
export const tokentypeEnum = { access: 'access', refresh: 'refresh' };
export const genratetoken = async ({
    payload = {},
    signature = process.env.Access_token_Signature,
    options = { expiresIn: 60 * 60 }

} = {}) => {


    return jwt.sign(payload, signature, options);
}
export const generateRefreshToken = async ({
    payload = {},
    signature = process.env.Refresh_token_Signature,
    options = { expiresIn: "1y" }
} = {}) => {
    return jwt.sign(payload, signature, options);
}

export const verifytoken = async ({ token = "", signature = process.env.Access_token_Signature, } = {}) => {
    return jwt.verify(token, signature);

}


export const getSignatures=async(
    {signaturelevel=SignatureTypeEnum.bearer}={})=>{
const signature={Accesssigntuare:undefined,Refreshsigntuare:undefined};
  switch (signaturelevel) {
case SignatureTypeEnum.system:
  signature.Accesssigntuare=process.env.ACCESS_TOKEN_System_SECRET;
  signature.Refreshsigntuare=process.env.REFRESH_TOKEN_System_SECRET;
break;
default:  
   signature.Accesssigntuare=process.env.ACCESS_TOKEN_SECRET;
   signature.Refreshsigntuare=process.env.REFRESH_TOKEN_SECRET;
break;
    }


}

export const decodeToken=async({authorization="",tokentype=tokentypeEnum.access,next}={})=>{
    console.log(authorization);
  const [Bearer, token] = req.headers.authorization?.split(" ") || [];

  if (!Bearer || !token) {
    const error = new Error("Authorization header missing");
    error.status = 401;
    throw error;
  }


 let Signature=await getSignatures({signatureLevel:Bearer})
 
  const decode = await verifytoken(token,tokentype===tokentypeEnum.access? Signature.Accesssigntuare:Signature.refresh);

  const user = await dbService.findbyid({ model: UserModel, id: decode._id });

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  req.user = user;
  next();
}