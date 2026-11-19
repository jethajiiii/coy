import { config } from "dotenv";
config();
import { env } from "./config/env";
import { app } from "./app";

const port = Number(env.PORT);

app.listen(port, () => {
  console.log(`🚀 Server listening on http://localhost:${port}`);
});
