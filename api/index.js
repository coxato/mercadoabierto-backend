const express = require("express");
const cors = require("cors");
const config = require("../config");
const errorMiddlewareRoute = require("../network/errorMiddlewareRoute");
const useRoutes = require("./routes");
const { handleConnection } = require("../store/mysql");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
useRoutes(app);
app.use(errorMiddlewareRoute);

async function startServer() {
    await handleConnection();
    
    app.listen(config.api.PORT, () => {
        console.log("server running on port " + config.api.PORT);
    })
}

startServer();