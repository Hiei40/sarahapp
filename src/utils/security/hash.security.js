import bcrypt from "bcryptjs";

export const generateIHash=async({plaintext="",saltRound=process.env.saltRound}={})=>{
return bcrypt.hashSync(plaintext,parseInt(saltRound))
}



export const comparehash=async({plaintext="",hashValue=""}={})=>{

    return bcrypt.compareSync(plaintext,hashValue);
}