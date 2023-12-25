// const express = require("express");
// const cors = require("cors");


// const app = express();

// var corsOptions = {
//   origin: "mongodb://localhost:27017"
// };

// app.use(cors(corsOptions));

// // parse requests of content-type - application/json
// app.use(express.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bezkoder application." });
// });

// // set port, listen for requests
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });



// // const db = require('./app/models/dbConfig'); // Replace 'dbConfig' with your actual database configuration file name

// const dbConfig = require('./app/config/db.config');
// const db = require("./app/models");
//  // Adjust the path as needed
//  // Adjust the path accordingly

// const Role = db.role;

// // db.mongoose
// //   .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true
// //   })
// //   .then(() => {
// //     console.log("Successfully connect to MongoDB.");
// //     initial();
// //   })
// //   .catch(err => {
// //     console.error("Connection error", err);
// //     process.exit(1);
// //   });

// db.mongoose
//   .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true, // Adding this option might be necessary depending on your use case
//     useFindAndModify: false // Adding this option might be necessary depending on your use case
//   })
//   .then(() => {
//     console.log("Successfully connect to MongoDB.");
//     initial();
//   })
//   .catch(err => {
//     console.error("Connection error", err);
//     process.exit(1);
//   });



// function initial() {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       new Role({
//         name: "user"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'user' to roles collection");
//       });

//       new Role({
//         name: "moderator"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'moderator' to roles collection");
//       });

//       new Role({
//         name: "admin"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'admin' to roles collection");
//       });
//     }
//   });
// }

// // routes
// require('./app/routes/auth.routes')(app);
// require('./app/routes/user.routes')(app);

// // set port, listen for requests



const express = require("express");
const cors = require("cors");
const dbConfig = require('./app/config/db.config');
const app = express();

var corsOptions = {
  origin: "mongodb://localhost:27017"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
const Role = db.role;

// Use the connection string directly without constructing it manually
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit(1);
  });

function initial() {
  // Use the `countDocuments` method without a callback
  Role.countDocuments()
    .then((count) => {
      if (count === 0) {
        // Your initialization code remains the same
        new Role({
          name: "user"
        }).save()
          .then(() => console.log("added 'user' to roles collection"))
          .catch((err) => console.log("error", err));

        new Role({
          name: "moderator"
        }).save()
          .then(() => console.log("added 'moderator' to roles collection"))
          .catch((err) => console.log("error", err));

        new Role({
          name: "admin"
        }).save()
          .then(() => console.log("added 'admin' to roles collection"))
          .catch((err) => console.log("error", err));
      }
    })
    .catch((err) => {
      console.error("Error during countDocuments:", err);
    });
}

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
