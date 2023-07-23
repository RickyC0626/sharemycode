import dotenv from "dotenv";
import server from "./server";

dotenv.config();

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at localhost:${port}`);
});
