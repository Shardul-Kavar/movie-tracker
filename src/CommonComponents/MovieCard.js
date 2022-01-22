import { BookmarkAdd, BookmarkAdded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./CCstyles/MovieCard.css";

function MovieCard({
  movie,
  currentUser,
  base_url,
  isLargeRow,
  handleWatchlist,
  bookmarkThis,
  removeBookmark,
  watchlist,
}) {
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
    <div>
      <div className="movieCard">
        <img
          key={movie.id}
          onClick={() => handleClick(movie)}
          className={`row_poster ${isLargeRow && "row_posterLarge"}`}
          src={`${base_url}${
            isLargeRow ? movie.poster_path : movie.backdrop_path
          }`}
          alt={movie.name}
        />
        <div
          className="movieCard__textContent"
          // style={{
          //   display: "flex",
          //   justifyContent: "space-evenly",
          //   alignItems: "center",
          //   margin: "0",
          //   padding: "0",
          // }}
        >
          <p>
            {movie.name ||
              movie.original_name ||
              movie.title ||
              movie.original_title}
          </p>
          {watchlist?.length > 0 ? (
            watchlist.find((m) => {
              return m.movieId === movie.id;
            }) ? (
              <BookmarkAdded
                style={{ cursor: "pointer", color: "#1976D2" }}
                onClick={() => removeBookmark(movie)}
              />
            ) : (
              <BookmarkAdd
                style={{ cursor: "pointer" }}
                onClick={() => bookmarkThis(movie)}
              />
            )
          ) : (
            <BookmarkAdd
              style={{ cursor: "pointer" }}
              onClick={() => bookmarkThis(movie)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
