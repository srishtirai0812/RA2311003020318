const axios = require("axios");

const LOG_API = "http://20.207.122.201/evaluation-service/logs";

const Log = async (stack, level, pkg, message, token) => {
  try {
    const res = await axios.post(
      LOG_API,
      {
        stack: stack,
        level: level,
        package: pkg,
        message: message
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("Log sent:", res.data);
  } catch (err) {
    console.error("Logging failed:", err.response?.data || err.message);
  }
};

module.exports = Log;