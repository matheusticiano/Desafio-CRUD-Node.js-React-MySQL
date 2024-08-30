import express from "express";
import tarefasRoutes from "./routes/tarefas.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/tarefas", tarefasRoutes);
app.use("/api/auth", authRoutes);

app.listen(8800, () => {
  console.log("Conectado");
});
