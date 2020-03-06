import React, { useEffect } from "react";
import "./App.css";
import { setAllMovies, setAllExceptSelected } from "./redux/redux";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Movies from "./Movies";
import Recommendation from "./Recommendatin";
import Input from "./Input";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/api/moviedata").then(res => {
      const movies = res.data.map(movie => {
        
        return {
          id: movie.movie_id,
          content: movie.genres.concat(movie.overview, movie.keywords),
          poster: movie.poster,
          title: movie.title
        };
      });
      
      dispatch(setAllMovies(movies));
      dispatch(setAllExceptSelected(movies));
    });
  }, [dispatch]);

  return (
    <div className="App">
      <nav className="nav-bar">
        <h1 id="title">Movie Recommendation</h1>
      </nav>
      <Input />
      <div className="wrapper">
        
        <Recommendation/>
        <Movies/>
      </div>
    </div>
  );
}

export default App;
