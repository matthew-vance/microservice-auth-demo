import express, { Request } from "express";
import morgan from "morgan";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import data from "./data";

const PORT = 3002;
const TOKEN_SECRET = "secret";

const app = express();

app.use(express.json());
app.use(morgan("combined"));

interface AuthBody {
  email: string;
  password: string;
}

app.get("/data", (_req, res) => {
  return res.json(data);
});

app.post("/signup", (req: Request<{}, {}, AuthBody>, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const existingUser = data.findIndex((user) => user.email === email) !== -1;
  if (existingUser)
    return res.status(409).send("User with email already exists");
  const id = data.length + 1;
  data.push({ id, email, password: hashedPassword });

  return res.status(201).send("Sign up successful");
});

app.post("/login", (req: Request<{}, {}, AuthBody>, res) => {
  const { email, password } = req.body;

  const foundUser = data.find((user) => user.email === email);
  if (!foundUser) return res.status(404).send("User not found");

  const isValidPassword = bcrypt.compareSync(password, foundUser.password);
  if (!isValidPassword) return res.status(401).send("Invalid password");

  const userContext = { id: foundUser.id, email: foundUser.email };
  const token = jwt.sign({ userContext }, TOKEN_SECRET, {
    expiresIn: "1m",
  });

  return res.json({
    token,
  });
});

app.listen(PORT, () => {
  console.log(`Auth service listening on port ${PORT}`);
});
