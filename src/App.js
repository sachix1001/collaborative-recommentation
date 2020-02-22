import React, { useEffect } from "react";
import "./App.css";
import { setAllMovies, setAllExceptSelected } from "./redux/redux";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Movies from "./Movies";
import Input from "./Input";
import dummy from "./dummyData.js";
import {ger} from './recommendation.js'
console.log(ger)

// import ratings from "../data/ratings.json";

function App() {
  const dispatch = useDispatch();

  const dummyWithContent = dummy.dummy.map(movie => {
    return {
      id: movie.id,
      content: movie.genres.concat(movie.overview, movie.keywords),
      poster: movie.poster,
      title: movie.title
    };
  });
  dispatch(setAllMovies(dummyWithContent));
  dispatch(setAllExceptSelected(dummyWithContent));

  useEffect(() => {
    axios.get("/api/moviedata").then(res => {
      const movies = res.data.map(movie => {
        return {
          id: movie.id,
          content: movie.genres.concat(movie.overview, movie.keywords),
          poster: movie.poster,
          title: movie.title
        };
      });
      dispatch(setAllMovies(movies));
      dispatch(setAllExceptSelected(movies));
    });
  }, [dispatch]);
  // useEffect(() => {


  
  //   const esm = new g.MemESM();
  //   const ger = new g.GER(esm);
  //   ger.initialize_namespace("movies");

  //   axios.get("/api/ratings").then(res => {
  //     res.data.map(rating => {
  //       ger.events([
  //         {
  //           namespace: "movies",
  //           person: rating.userId,
  //           action: Math.floor(rating.rating),
  //           thing: rating.mobieId,
  //           expires_at: "2030-06-06"
  //         }
  //       ]);
  //     });
  //   });
  //   const recom = ger.recommendations_for_person("movies", "2", {
  //     actions: { 5: 5, 4: 3, 3: 1 }
  //   });
  //   console.log(recom)
  // });

  return (
    <div className="App">
      <nav className="nav-bar">
        <h1 id="title">Movie Recommendation</h1>
      </nav>
      <Input />
      <div className="wrapper">
        <Movies></Movies>
      </div>
    </div>
  );
}

export default App;
