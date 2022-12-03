import * as bCrypt from "bcryptjs";
import { nestApp } from "src/main";
import { userConstants } from "src/users/constants";

export const hashPassword = async function (password: string) {
  const salt = await bCrypt.genSalt();
  const hashedPassword = await bCrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async function (
  password: string,
  hashedPassword: string,
) {
  return await bCrypt.compare(password, hashedPassword);
};

export const getVerificationUrl = async (verificationToken: string) => {
  return (
    (await nestApp.getUrl()) +
    userConstants.emailVerificationPath +
    verificationToken
  );
};
