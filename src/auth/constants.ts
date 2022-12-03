export const authConstants = {
  secret: process.env.JWT_SECRET,
  sendGridApiKey: process.env.SENDGRID_API_KEY,
  sendGridMail: process.env.VERIFIED_SENDER,
  expiresIn: "10h",
  localStrategyName: "Email and password",
  localStrategyFields: { usernameField: "email", passwordField: "password" },
  verificationEmailError: "Email verification required",
  verificationPassedError: "Verification has already been passed",
  userEmptyObjectError: "Bad User object",
  confirmEmailVerificatioMessage: "Verification successful",
  errorEmailVerificationMessage: "User not found",
  sendVerificationEmailMessage: "Verification email sent",
};
