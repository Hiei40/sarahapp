import bcrypt from "bcryptjs";

export const generateIHash=async({plaintext="",saltRound=12}={})=>{
return bcrypt.hashSync(plaintext,pasrseInt(saltRound))
}



export const comparehash=async({plaintext="",hashValue=""}={})=>{

    return bcrypt.compareSync(plaintext,hashValue);
}