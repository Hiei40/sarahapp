import bcrypt from 'bcryptjs';

export const generateHash = (plaintext = "", saltRound = 12) => {
  return bcrypt.hashSync(plaintext, parseInt(saltRound));
};

export const generateIHash = async (plaintext = "", saltRound = 12) => {
  return await bcrypt.hash(plaintext, parseInt(saltRound));
};