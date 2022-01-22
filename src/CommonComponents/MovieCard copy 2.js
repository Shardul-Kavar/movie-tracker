import { BookmarkAdd, BookmarkAdded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function MovieCard({ movie, currentUser, base_url, isLargeRow, handleWatchlist, bookmarkThis, removeBookmark, watchlist }) {
  const navigate = useNavigate();
  // useEffect(() => {
  // watchlist.filter((e) => {
  //   return e.movieId === movie.id;
  // }).length !== 0 && console.log(true);
  // console.log(watchlist);
  // }, []);

  function handleClick(movie) {
    console.log(watchlist);
    // navigate("/moviepage", { state: { movie, base_url } });
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        key={movie.id}
        onClick={() => handleClick(movie)}
        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
        alt={movie.name}
        style={{ cursor: "pointer" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.overview}
        </Typography>
      </CardContent>
      <CardActions>
        {watchlist?.length > 0 ? (
          watchlist.find((m) => {
            return m.movieId === movie.id;
          }) ? (
            <Button size="small" onClick={() => removeBookmark(movie)}>
              <BookmarkAdded style={{ cursor: "pointer" }} />
            </Button>
          ) : (
            <Button size="small" onClick={() => bookmarkThis(movie)}>
              <BookmarkAdd style={{ cursor: "pointer" }} />
            </Button>
          )
        ) : (
          <Button size="small" onClick={() => bookmarkThis(movie)}>
            <BookmarkAdd style={{ cursor: "pointer" }} />
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default MovieCard;

// ==============================================================
