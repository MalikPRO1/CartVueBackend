const express = require("express");
const bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./db");
const logger = require("./logger");

const app = express();

app.use(express.static("public"));
//logger stuff
app.use(logger);
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use((err, req, res, next) => {
  console.log("Error: ", err);
  res.status(500).send("An error occurred, please try again later.");
});

connectToDb()
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server is running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.log("Error starting server: ", err);
  });

const updateLesson = (lessonId, spaces) => {
  // Get the database connection
  const db = getDb();
  // Access the lesson collection in the database
  const collection = db.collection("lesson");

  // Find and update the lesson document based on lessonId
  collection.findOneAndUpdate(
    { _id: new ObjectId(lessonId) },
    { $inc: { spaces: -spaces } }, // Decrease the number of spaces available
    (err, result) => {
      if (err) throw err;
    }
  );
};

// Endpoint to retrieve lessons
app.get("/lessons", async (req, res, next) => {
  try {
    const searchText = req.query.search;
    let query = {};

    // If there is a search query, construct a search query
    if (searchText) {
      query = {
        $or: [
          { subject: { $regex: searchText, $options: 'i' } },
          { location: { $regex: searchText, $options: 'i' } }
        ]
      };
    }

    // Access the lesson collection in the database, perform search, and send the results
    const db = getDb();
    const collection = db.collection("lesson");
    const items = await collection.find(query).toArray();
    
    res.send(items);
  } catch (err) {
    next(err);
  }
});

// Endpoint to create orders
app.post("/orders", async (req, res, next) => {
  try {
    const order = req.body;

    const db = getDb();
    const collection = db.collection("order");

    const result = await collection.insertOne(order);
    if (result["acknowledged"]) {
      updateLesson(order.lesson_id, order.spaces);
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});


// Endpoint to update lessons
app.put("/lessons/:id", (req, res) => {
  const lessonId = req.params.id;
  const spaces = req.body.spaces;

  // Update the lesson with the provided spaces
  updateLesson(lessonId, spaces);

  res.send("Lesson updated successfully");
});
