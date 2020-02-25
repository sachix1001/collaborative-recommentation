import React, { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectMovie,
  setAllExceptSelected,
  addRecommendation
} from "./redux/redux";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";

function Recommendation() {
  const allMovies = useSelector(state => state.allMovies);
  const recommendation = useSelector(state => state.recommendation);
  const dispatch = useDispatch();

  function movieSelected(movie) {
    const userInfo = {
      namespace: "movies",
      person: "newUser",
      action: "likes",
      thing: String(movie.movie_id),
      expires_at: "2030-06-06",
      title: movie.title
    };
    dispatch(selectMovie(userInfo));
  }

  const useStyles = makeStyles(theme => ({
    popover: {
      pointerEvents: "none"
    },
    paper: {
      padding: theme.spacing(1)
    }
  }));
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <div style={{ width: "100%" }}>
      {recommendation.length !== 0 ? <h5>You might like...</h5> : null}
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
        {recommendation.length !== 0
          ? recommendation.map((movie, i) => {
              return (
                <Box
                  p={1}
                  m={0}
                  bgcolor="grey.900"
                  className="movie-card"
                  key={movie.id}
                >
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
            })
          : null}
      </Box>
    </div>
  );
}

export default Recommendation;
