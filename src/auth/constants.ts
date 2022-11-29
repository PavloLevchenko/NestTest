export const authConstants = {
  secret: process.env.JWT_SECRET,
  expiresIn: "10h",
  localStrategyName: "Email and password",
  localStrategyFields: { usernameField: "email", passwordField: "password" },
};
