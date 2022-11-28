export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  expiresIn: "10h",
  strategy: "Email and password",
};
