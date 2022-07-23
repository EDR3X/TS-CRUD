import "dotenv/config";

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.k8uny.mongodb.net/?retryWrites=true&w=majority`;

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 8080;


const API_HEADER = process.env.API_HEADER || "";

export const config = {
  mongo: { url: MONGO_URL },
  server: { port: SERVER_PORT },
  api: { header: API_HEADER }
};
