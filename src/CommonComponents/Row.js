import React, { useEffect, useState } from "react";
// import YouTube from "react-youtube";
import axios from "./axios";
import "./CCstyles/Row.css";
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
  bookmarkThis,
  removeBookmark,
  watchlist,
}) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
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
      <h2 className="row__title">{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <MovieCard
            currentUser={currentUser}
            bookmarkThis={bookmarkThis}
            removeBookmark={removeBookmark}
            fetchUrl={fetchUrl}
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
