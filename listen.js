const app = require("./app");

const { PORT = 9090 } = process.env;

app.listen(PORT, () => {
  console.log("Server is listening on port 9090...");
});
