import express from "express";
import morgan from "morgan";
import setContext from "./setContext";
import data from "./data";

const PORT = 3003;

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.use(setContext);

app.get("/", (req, res) => {
  const { id: userId } = req.context;
  const message = data.find((message) => message.userId === userId);
  return res.json({ message: message?.content });
});

app.listen(PORT, () => {
  console.log(`Message service listening on port ${PORT}`);
});
