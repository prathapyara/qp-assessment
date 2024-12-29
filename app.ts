import express from "express";
import mongoose from "mongoose";
import adminRoutes from "./src/routes/admin.routes";
import userRoutes from "./src/routes/user.routes";

const app = express();
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

const MONGO_URI = "mongodb://localhost:27017/grocery"; 
//here we can use the mongodb url that we want 

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
