// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { SerialPort } = require("serialport");
const fs = require("fs");

async function listSerialPorts() {
  await SerialPort.list().then((ports, err) => {
    if (err) {
      console.log("Error Listing Ports", err)
      return;
    } else {
      console.log("Ports", ports)
    }
    if (ports.length === 0) {
      console.log("No ports Discovered!")
    }
  });
}

function listPorts() {
  listSerialPorts();
  setTimeout(listPorts, 2000);
}

setTimeout(listPorts, 2000);
listSerialPorts();

const button = document.getElementById("saveConfig");

button.addEventListener("click", () => {
  const host = document.forms[0].elements["host"].value;
  const port = Number(document.forms[0].elements["port"].value);
  const rfid = document.forms[0].elements["rfid"].value;
  const aor = document.forms[0].elements["aor"].value;
  const location = document.forms[0].elements["location"].value;
  let data = { host, port, rfid, aor, location };
  data = JSON.stringify(data);

  fs.mkdir("./config", (err) => {
    if (!err) {
      console.log("Directory Created Successfully!");
    } else {
      console.log("Error Creating Directory!", err);
    }
  });

  fs.writeFile("./config/naphimis.json", data, (err) => {
    if (!err) {
      console.log("File Written Successfully!", data);
    } else {
      console.log("Error Writing File!", err);
    }
  });
});