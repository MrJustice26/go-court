export default () => ({
  jwtSecret: process.env.JWT_SECRET,
  frontendUrl: process.env.FRONTEND_URL,
  frontendDomain: process.env.FRONTEND_DOMAIN,
});
