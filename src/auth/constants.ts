export const authConstants = {
  secret: process.env.JWT_SECRET,
  expiresIn: "10h",
  localStrategyName: "Email and password",
  localStrategyFields: { usernameField: "email", passwordField: "password" },
  verificationEmailError: "Email verification required",
  verificationPassedError: "Verification has already been passed",
  userEmptyObjectError: "Bad User object",
  confirmEmailMessage: "Verification successful",
  sendVerificationEmailMessage: "Verification email sent",
};
