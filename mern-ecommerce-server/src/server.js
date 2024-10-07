const app = require("./app");
const { serverPort } = require("./config");
const connectToDatabase = require("./config/db");

app.listen(serverPort, async () => {
  console.log(`Server is running at http://localhost:${serverPort}`);

  await connectToDatabase();
});
