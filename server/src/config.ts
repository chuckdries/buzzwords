import dotenv from "dotenv";
interface Config {
  port: string;
  dbType: string;
  mongoUrl: string;
  mongoDbName: string;
  cookieSecret: string;
  cookieDomain: string;
  maxActiveGames: number;
  googleClientId?: string;
  googleClientSecret?: string;
  apiPrefix: string;
  googleCallbackUrl: string;
  adminApiKey: string;
  notificationGameBaseUrl: string;
  enablePushNotifications?: boolean;
}

export const getConfig = (): Config => {
  dotenv.config();
  return {
    port: process.env.PORT || "8080",
    dbType: process.env.DB_TYPE || "memory",
    mongoUrl: process.env.MONGO_URL || "mongodb://localhost/dev",
    mongoDbName: process.env.MONGO_DB_NAME || "buzzwords",
    cookieSecret: process.env.COOKIE_SECRET || "CHANGE_ME_IN_PRODUCTION",
    cookieDomain: process.env.COOKIE_DOMAIN || "localhost",
    maxActiveGames: parseInt(process.env.MAX_ACTIVES_GAMES || "25"),
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    apiPrefix: process.env.API_PREFIX || "",
    googleCallbackUrl:
      process.env.GOOGLE_CALLBACK_URL ||
      "https://buzzwords.gg/api/login/google/redirect",
    adminApiKey: process.env.ADMIN_API_KEY || "CHANGE_ME_IN_PRODUCTION",
    notificationGameBaseUrl:
      process.env.NOTIFICATION_GAME_BASE_URL || "http://localhost:5173/play",
    enablePushNotifications: process.env.ENABLE_PUSH_NOTIFICATIONS === "true",
  };
};

export default getConfig;
