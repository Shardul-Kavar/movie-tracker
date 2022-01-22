import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import YouTube from "react-youtube";
import axios from "./axios";
import "./Row.css";
// import movieTrailer from "movie-trailer";
import { useNavigate } from "react-router";
import {
  BookmarkAdd,
  BookmarkAdded,
  DataObjectOutlined,
} from "@mui/icons-material";
import MovieCard from "./MovieCard";

function Row({
  title,
  fetchUrl,
  isLargeRow,
  handleWatchlist,
  bookmarkThis,
  removeBookmark,
  watchlist,
}) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
  // const navigate = useNavigate();
  // const [trailerUrl, setTrailerUrl] = useState("");

  // snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <MovieCard
            currentUser={currentUser}
            handleWatchlist={handleWatchlist}
            bookmarkThis={bookmarkThis}
            removeBookmark={removeBookmark}
            base_url={base_url}
            watchlist={watchlist}
            movie={movie}
            isLargeRow={isLargeRow}
          />
        ))}
      </div>
      {/* {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} */}
    </div>
  );
}

export default Row;
