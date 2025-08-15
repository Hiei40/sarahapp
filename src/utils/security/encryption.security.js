import CryptoJS from "crypto-js";
export const generateIEncrypt=async({plaintext="",secretkey=process.env.secretkey}={})=>{
return CryptoJS.AES.encrypt(plaintext,secretkey).toString();
}



export const compareEncrypt=async({ciphertext="",secretkey=""}={})=>{

    return CryptoJS.AES.decrypt(ciphertext,hashValue).toString(CryptoJS.enc.Utf8);
}