import React, { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectMovie,
  setAllExceptSelected,
  addRecommendation
} from "./redux/redux";
import Box from "@material-ui/core/Box";
// import Popover from "@material-ui/core/Popover";
// import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import axios from "axios";

function Movies() {
  const allMovies = useSelector(state => state.allMovies);
  const selected = useSelector(state => state.selected);
  const dispatch = useDispatch();
  const recommendation = useSelector(state => state.recommendation);

  function movieSelected(movie) {
    const userInfo = {
      namespace: "movies",
      person: "newUser",
      action: "likes",
      thing: String(movie.id),
      expires_at: "2030-06-06",
      title: movie.title
    };
    dispatch(selectMovie(userInfo));
  }

  // create recommendation
  useEffect(() => {
    if (selected.length !== 0) {
      axios.post("/api/ratings", selected).then(res => {
      console.log("TCL: Movies -> selected", selected)
        let recommendation = res.data;
        console.log("TCL: Movies -> recommendation", recommendation);
        const orderedMovies = [];
        // order exceptedList
        recommendation.forEach(ranking => {
          const pick = allMovies.find(movie => {
            return movie.id == ranking;
          });
          
          orderedMovies.push(pick);

          dispatch(addRecommendation(orderedMovies));
        });
      });
    }
  }, [selected, allMovies]);


  return (
    <div style={{ width: "100%" }}>
      {recommendation.length !== 0 ? <h5>More movies...</h5> : null}
      <Box
        display="flex"
        flexWrap="wrap"
        p={1}
        pl={5}
        ml={5}
        mr={5}
        t={10}
        bgcolor="background.paper"
        css={{ maxWidth: "100%" }}
      >
        {allMovies.map((movie, i) => {
          return (
            <Box p={1} m={0} bgcolor="grey.900" className="movie-card" key={movie.id}>
              <Card>
                <CardMedia
                  component="img"
                  className="movie-img"
                  image={movie.poster}
                  key={movie.id}
                  alt={movie.title}
                  onClick={() => movieSelected(movie)}
                  aria-haspopup="true"
                />
              </Card>
            </Box>
          );
        })}
      </Box>
    </div>
  );
}

export default Movies;
