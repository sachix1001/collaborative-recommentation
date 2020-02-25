import React, { useEffect } from "react";
import "./App.css";
import { setAllMovies, setAllExceptSelected } from "./redux/redux";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Movies from "./Movies";
import Recommendation from "./Recommendatin";
import Input from "./Input";
import dummy from "./dummyData.js";

// import ratings from "../data/ratings.json";

function App() {
  const dispatch = useDispatch();
  const selected = useSelector(state => state.selected);
  
  // const dummyWithContent = dummy.dummy.map(movie => {
  //   return {
  //     id: movie.id,
  //     content: movie.genres.concat(movie.overview, movie.keywords),
  //     poster: movie.poster,
  //     title: movie.title
  //   };
  // });
  // console.log("TCL: App -> selected", selected)
  // dispatch(setAllMovies(dummyWithContent));
  // dispatch(setAllExceptSelected(dummyWithContent));

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
