import { BookmarkAdd, BookmarkAdded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

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
    <div>
      <div>
        <img
          style={{ cursor: "pointer" }}
          key={movie.id}
          onClick={() => handleClick(movie)}
          className={`row_poster ${isLargeRow && "row_posterLarge"}`}
          src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
          alt={movie.name}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            margin: "0",
            padding: "0",
          }}
        >
          <p>{movie.name || movie.original_name || movie.title || movie.original_title}</p>
        </div>
        {watchlist?.length > 0 ? (
          watchlist.find((m) => {
            return m.movieId === movie.id;
          }) ? (
            <BookmarkAdded style={{ cursor: "pointer" }} onClick={() => removeBookmark(movie)} />
          ) : (
            <BookmarkAdd style={{ cursor: "pointer" }} onClick={() => bookmarkThis(movie)} />
          )
        ) : (
          <BookmarkAdd style={{ cursor: "pointer" }} onClick={() => bookmarkThis(movie)} />
        )}
      </div>
    </div>
  );
}

export default MovieCard;
