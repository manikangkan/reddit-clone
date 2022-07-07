import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User.js";
import bodyParser from "body-parser";
import Comment from "./models/Comment.js";
import Vote from "./models/Vote.js";

const PORT = 4000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const MONGODB_URL = process.env.MONGODB_URL;

mongoose
  .connect(`${MONGODB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB🎊");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// auth api
app.post("/signup", (req, res) => {
  const { email, username, password } = req.body;
  const user = new User({
    email,
    username,
    password,
  });
  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((err) => {
      res.status(400).send({ error: err });
    });
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username, password })
    .then((user) => res.send(user))
    .catch((err) => res.status(401).send({ error: "User not found" }));
});

// comments router
app.get("/comments", (req, res) => {
  Comment.find({
    rootId: null,
  })
    .sort({ createdAt: -1 })
    .then((comments) => res.send(comments));
});

app.get("/comments/root/:rootId", (req, res) => {
  Comment.find({ rootId: req.params.rootId })
    .sort({ createdAt: -1 })
    .then((comments) => res.send(comments));
});

app.get("/comments/:id", (req, res) => {
  Comment.findById(req.params.id).then((comment) => res.send(comment));
});

app.post("/comments", (req, res) => {
  const { title, body, author, parentId, rootId } = req.body;

  const comment = new Comment({
    title,
    body,
    author,
    parentId,
    rootId,
  });

  comment
    .save()
    .then(() => {
      res.status(201).send(comment);
    })
    .catch((err) => {
      res.status(400).send({ error: err });
    });
});

// vote router
app.post("/vote", (req, res) => {
  const { author, commentId, direction } = req.body;
  const vote = new Vote({
    author,
    commentId,
    direction: direction === "up" ? 1 : -1,
  });
  vote
    .save()
    .then(() => res.status(201).send(vote))
    .catch((err) => res.status(400).send({ error: err }));
});

app.get("/vote/:commentId", (req, res) => {
  Vote.find({ commentId: req.params.commentId }).then((votes) => {
    const sum = votes.reduce((acc, cur) => acc + cur.direction, 0);
    res.send({ sum });
  });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}🎧`);
});
