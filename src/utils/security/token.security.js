import jwt from 'jsonwebtoken';


export const genratetoken=async({
    payload={},
signature=process.env.Access_token_Signature,
    options={expiresIn:60*60}

}={})=>{


    return jwt.sign(payload,signature,options);
}


export const verifytoken =async ({token="",signature=process.env.Access_token_Signature,}={})=>{
return jwt.verify(token,signature);

}


