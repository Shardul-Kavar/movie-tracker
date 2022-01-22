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

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
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

  useEffect(() => {
    currentUser &&
      fetch(`http://localhost:3001/watchlist/?userid=${currentUser.id}`)
        .then((response) => response.json())
        .then((data) => setWatchlist(data));
  }, [currentUser]);

  function bookmarkThis(movie) {
    fetch("http://localhost:3001/watchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: currentUser.id,
        movieDetail: movie,
        movieId: movie.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("success", data))
      .error((error) => console.log(error));
  }

  function removeBookmark(movie) {
    setWatchlist(
      watchlist.filter((m) => {
        return m.movieId !== movie.movieDetail.id;
      })
    );
    fetch(
      `http://localhost:3001/watchlist/?userid=${currentUser.id}&movieId=${movie.movieDetail.id}`
    )
      .then((response) => response.json())
      .then((data) =>
        data.map((m) => {
          fetch(`http://localhost:3001/watchlist/${m.id}`, {
            method: "DELETE",
          });
        })
      );
  }

  const handleClick = (movie) => {
    navigate("/moviepage", { state: { movie, base_url } });
    // window.open(
    //   "https://www.themoviedb.org/" +
    //     movie.media_type +
    //     "/" +
    //     movie.id +
    //     "-" +
    //     movie.title.replace(/\s+/g, "-").toLowerCase()
    // );
    // console.log(
    //   "https://www.themoviedb.org/" +
    //     movie.media_type +
    //     "/" +
    //     movie.id +
    //     "-" +
    //     movie.title.replace(/\s+/g, "-").toLowerCase()
    // );
    // if (trailerUrl) {
    //   setTrailerUrl("");
    // } else {
    //   movieTrailer(movie?.name || movie?.original_name || movie?.original_title)
    //     .then((url) => {
    //       const urlPrams = new URLSearchParams(new URL(url).search);
    //       setTrailerUrl(urlPrams.get("v"));
    //     })
    //     .catch((error) => console.error());
    // }
  };

  function checkBookmark(movie) {
    console.log(
      watchlist.filter((m) => {
        return m.movieDetail.id === movie.id;
      }).length
    );
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          // <Link
          //   to={{ pathname: "/moviecard", state: { movie } }}
          //   style={{ textDecoration: "none", color: "black" }}
          // ></Link>
          <div>
            <img
              style={{ cursor: "pointer" }}
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
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
              <p>
                {movie.name ||
                  movie.original_name ||
                  movie.title ||
                  movie.original_title}
              </p>
            </div>
            {watchlist.filter((m) => {
              return m.movieDetail.id === movie.id;
            }).length !== 0 ? (
              <BookmarkAdded onClick={() => removeBookmark(movie)} />
            ) : (
              <BookmarkAdd onClick={() => bookmarkThis(movie)} />
            )}
          </div>
        ))}
      </div>
      {/* {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} */}
    </div>
  );
}

export default Row;
