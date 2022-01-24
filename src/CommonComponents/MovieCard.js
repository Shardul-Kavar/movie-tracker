import { BookmarkAdd, BookmarkAdded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./CCstyles/MovieCard.css";
import { Link } from "react-router-dom";

function MovieCard({
  movie,
  currentUser,
  base_url,
  isLargeRow,
  bookmarkThis,
  removeBookmark,
  fetchUrl,
  watchlist,
}) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="movieCard">
        <Link
          to={`/moviepage/${fetchUrl.indexOf("tv") > 1 ? "tv" : "movie"}/${
            movie.id
          }`}
          target="_blank"
          style={{ textDecoration: "none", color: "black" }}
        >
          <img
            key={movie.id}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={
              movie.name ||
              movie.original_name ||
              movie.title ||
              movie.original_title
            }
          />
        </Link>
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
