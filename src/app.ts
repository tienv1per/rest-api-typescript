import express from "express";
import config from "config";
import bodyParser from "body-parser";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";

const port = config.get<number>("port");

const app = express();

app.use(bodyParser.json());

app.use(deserializeUser);

app.listen(port, async () => {
    logger.info("Express server listening on port 8000");
    await connect();
    routes(app);
});
