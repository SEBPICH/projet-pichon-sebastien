const express = require("express");
const cors = require("cors");

const app  = express ();

var corsOptions = {
  origin: "*",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  headers: 'Content-Type, Authorization',
  exposedHeaders:'Authorization'
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


const database = require("./models");

app.get("/", (req, res) => {
  res.json({ message: "You are entering the application" });
});

database.sequelize.sync(
)
  .then(() => {
    console.log("Synced database.");
  })
  .catch((err) => {
    console.log("Failed to sync database: " + err.message);
  });

require("./routes")(app);



const PORT =  443;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
