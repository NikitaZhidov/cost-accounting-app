const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const path = require("path");

const costsRoutes = require("./routes/costs.routes");
const categoriesRoutes = require("./routes/categories.routes");
const authRoutes = require("./routes/auth.routes");
const iconsRoutes = require("./routes/icons.routes");
const usersRoutes = require("./routes/users.routes");

const PORT = process.env.PORT || 5000;

const app = express();

const dir = path.join(__dirname, "web");

app.use("/web", express.static(dir));
app.use(express.json({ extended: true }));

app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/costs", costsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/icons", iconsRoutes);
app.use("/api/users", usersRoutes);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${config.get("dbConfig.login")}:${config.get(
        "dbConfig.password"
      )}@clusterdb.sa7yk.mongodb.net/${config.get("dbConfig.db_name")}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    app.listen(PORT, () => {
      console.log(`Server has been started on ${PORT} port`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
