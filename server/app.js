const express = require("express");
const morgan = require("morgan");
const path = require("path");
const db = require("./knex");
const g = require("ger");
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())


// Setup logger
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "build")));

app.get("/api/moviedata", async (req, res) => {
  try {
    const movies = await db.select().from("movies");
    res.json(movies);
  } catch (err) {
    console.error("Error loading locations!", err);
    res.sendStatus(500);
  }
});
// app.get("/api/ratings", async (req, res) => {
//   try {
//     const ratings = await db.select().from("ratings");
//     res.json(ratings);
//   } catch (err) {
//     console.error("Error loading locations!", err);
//     res.sendStatus(500);
//   }
// });

app.post("/api/ratings", async (req, res) => {
  try {
    const userData = await req.body;
    console.log(userData);

    const esm = new g.MemESM();
    const ger = new g.GER(esm);
    let ratings = await db.select().from("ratings");
    ratings= ratings.map(rating => {
      return {
        namespace: "movies",
        person: rating.userId,
        action: "likes",
        thing: rating.movieId,
        expires_at: "2030-06-06"
      }
    })
    ratings.push(...userData);
    ger.initialize_namespace('movies')
    .then( function() {
      return ger.events(ratings)
    })
    .then( function() {
      // What things might alice like?
      return ger.recommendations_for_person('movies', 'newUser', {actions: {"likes": 1}})
    })
    .then( function(recommendations) {
      recommendations = recommendations.recommendations.map(movie => movie.thing)
      res.json(recommendations)
    })
    
  } catch (err) {
    console.error("Error loading locations!", err);
    res.sendStatus(500);
  }
});

// Always return the main index.html, so react-router render the route in the client
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

module.exports = app;
