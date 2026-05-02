const express = require("express");
const Log = require("./logger");

const app = express();
const PORT = 3000;

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzcjc3MDdAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMTk1MSwiaWF0IjoxNzc3NzAxMDUxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZjZhZGE3NWQtZTkxOS00ZmU5LWE5YWQtODRmZWM4NzNiNDg0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic3Jpc2h0aSByYWkiLCJzdWIiOiJkMWE3MDBhYS03ZDhjLTQ4NTgtYTY2Ni0zNjU2MGI1OGU1NmEifSwiZW1haWwiOiJzcjc3MDdAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJzcmlzaHRpIHJhaSIsInJvbGxObyI6InJhMjMxMTAwMzAyMDMxOCIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6ImQxYTcwMGFhLTdkOGMtNDg1OC1hNjY2LTM2NTYwYjU4ZTU2YSIsImNsaWVudFNlY3JldCI6IkJQTVRySkh1c1dYUXFGbW4ifQ.R1z9DlAltkejsG64eqCkxWwKCpYLBw_5T0YP51HCRac";
app.get("/", async (req, res) => {
  await Log("backend", "info", "route", "home route hit", TOKEN);
  res.send("Working perfectly.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});