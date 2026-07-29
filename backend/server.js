const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let notes = [{ text: "hi" }];

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.post("/notes", (req, res) => {
  notes.push(req.body);
  res.json(notes);
});

app.delete("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes.splice(id, 1);
  res.json(notes);
});
app.get("/", (req, res) => {
  res.send("Backend is running!");
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});