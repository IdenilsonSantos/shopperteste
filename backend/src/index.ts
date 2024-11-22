import "dotenv/config";
import express from "express";
import cors from "cors";
import tripRoutes from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/ride", tripRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
