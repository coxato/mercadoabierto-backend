require('module-alias/register'); // path aliases
const express = require("express");
const cors = require("cors");
const config = require("../config");
const errorMiddlewareRoute = require("../network/errorMiddlewareRoute");
const useRoutes = require("./routes");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
useRoutes(app);
app.use(errorMiddlewareRoute);

app.listen(config.api.PORT, () => {
    console.log("server running on port " + config.api.PORT);
})