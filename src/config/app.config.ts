export const EnvConfiguration = () => ({
  mongodb: process.env.MONGODB,
  port: Number(process.env.PORT),
  defaultLimit: Number(process.env.DEFAULT_LIMIT)
});
