const express = require("express");
const getSchedule = require("./scheduler");

const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Scheduler running");
});

app.get("/schedule", async (req, res) => {
  const data = await getSchedule();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Scheduler running on port ${PORT}`);
});