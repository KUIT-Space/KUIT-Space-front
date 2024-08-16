const WebSocket = require("ws");
const fs = require("fs");
const path = require("path");

const wss = new WebSocket.Server({ port: 8080 });

const filePath = path.join(__dirname, "mockMSG.json");

// Read messages from file
const readMessages = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) return reject(err);
      resolve(JSON.parse(data));
    });
  });
};

// Write messages to file
const writeMessages = (messages) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(messages, null, 2), (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

// Broadcast messages to all clients
const broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on("connection", async (ws) => {
  // Send existing messages to new client
  const messages = await readMessages();
  ws.send(JSON.stringify(messages));

  ws.on("message", async (message) => {
    const newMessage = JSON.parse(message);
    messages.push(newMessage);

    // Save the new message to the file
    await writeMessages(messages);

    // Broadcast the updated messages to all clients
    broadcast(JSON.stringify(messages));
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

console.log("WebSocket server is listening on ws://localhost:8080");
