const dotenv = require("dotenv").config()
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const { dbConnection } = require("./db/db.connect");

const userRoute = require("./routes/user.route");
const userPages = require("./routes/page.route");

const errorHandler = require("./middleware/errorHandler");
const routeHandler = require("./middleware/routeHandler");

dbConnection();

app.use("/user", userRoute);
app.use("/pages", userPages);

app.get("/", (req, res) => {
    res.send("One Notion Live...")
}) 

//middleware
app.use(routeHandler)
app.use(errorHandler)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Project running on http://localhost:${PORT}`);
})