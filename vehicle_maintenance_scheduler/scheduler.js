const axios = require("axios");
const Log = require("../logging_middleware/logger");


const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzcjc3MDdAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNDA1NCwiaWF0IjoxNzc3NzAzMTU0LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNjExODhjZWUtNWJmOC00YWY3LTkxYjItMGIyZDAzODE1MjgwIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic3Jpc2h0aSByYWkiLCJzdWIiOiJkMWE3MDBhYS03ZDhjLTQ4NTgtYTY2Ni0zNjU2MGI1OGU1NmEifSwiZW1haWwiOiJzcjc3MDdAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJzcmlzaHRpIHJhaSIsInJvbGxObyI6InJhMjMxMTAwMzAyMDMxOCIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6ImQxYTcwMGFhLTdkOGMtNDg1OC1hNjY2LTM2NTYwYjU4ZTU2YSIsImNsaWVudFNlY3JldCI6IkJQTVRySkh1c1dYUXFGbW4ifQ.R1JbAKfA9OJ_n-8hpDcO3sTZveD4rQKIWzP0QUhEpo4";

const headers = {
  Authorization: `Bearer ${TOKEN}`
};

async function getSchedule() {
  try {
    // Logging (safe)
    await Log("backend", "info", "service", "fetching depots", TOKEN);

    const depotsRes = await axios.get(
      "http://20.207.122.201/evaluation-service/depots",
      { headers }
    );

    await Log("backend", "info", "service", "fetching vehicles", TOKEN);

    const vehiclesRes = await axios.get(
      "http://20.207.122.201/evaluation-service/vehicles",
      { headers }
    );

    const depots = depotsRes.data.depots;
    const vehicles = vehiclesRes.data.vehicles;

    let result = [];

    for (let depot of depots) {
      let maxHours = depot.MechanicHours;

      let n = vehicles.length;
      let dp = Array.from({ length: n + 1 }, () =>
        Array(maxHours + 1).fill(0)
      );

      for (let i = 1; i <= n; i++) {
        let duration = vehicles[i - 1].Duration;
        let impact = vehicles[i - 1].Impact;

        for (let w = 0; w <= maxHours; w++) {
          if (duration <= w) {
            dp[i][w] = Math.max(
              dp[i - 1][w],
              dp[i - 1][w - duration] + impact
            );
          } else {
            dp[i][w] = dp[i - 1][w];
          }
        }
      }

      result.push({
        depotId: depot.ID,
        maxImpact: dp[n][maxHours]
      });
    }

    await Log("backend", "info", "service", "schedule computed", TOKEN);

    return result;

  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
}

module.exports = getSchedule;