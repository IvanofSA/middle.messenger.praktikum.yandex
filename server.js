const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  return next();
});

app.use(express.static(__dirname + '/dist'));

app.listen(PORT, function() {
  console.log(`App listening on port ${PORT}!`);
});
