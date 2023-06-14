const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const os = require("os");
const ipAddress = getIpAddress();
const jsonDataRoute = require('../routes/jsonDataRoute');
function getIpAddress() {
  const ifaces = os.networkInterfaces();
  let ipAddress = "localhost";
  Object.keys(ifaces).forEach((ifname) => {
    ifaces[ifname].forEach((iface) => {
      if (iface.family === "IPv4" && iface.internal === false) {
        ipAddress = iface.address;
      }
    });
  })
  return ipAddress;
}

mongoose.connect("mongodb+srv://sarthakkhandare21:1a4YlKJvMpdkvrfi@blackcoffer.zkqfnay.mongodb.net/?retryWrites=true&w=majority");
mongoose.connection.on("error", (err) => {
  console.log("<<<<<<< FAILED CONNECTION >>>>>>>");
});
mongoose.connection.on("connected", (con) => {
  console.log("<<<<<<<< CONNECTED >>>>>>>>");
});

const app = express();
const port = process.env.PORT || 8888;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use(cors());
app.use(express.json());
app.get("/api", async (req, res) => {
  res.send("Endpoint hit 🎊 🎊 🎊 🎊");
});
app.use("/api/data", require("../routes/data"));
app.use('/api/jsonDataRoute', require('../routes/jsonDataRoute'));
app.listen(port, () => {
  const ipAddress = getIpAddress();
  console.log(`Example app listening at http://${ipAddress}:${port}`);
});
