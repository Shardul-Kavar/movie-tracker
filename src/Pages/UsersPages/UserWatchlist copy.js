import { BookmarkAdded, KeyboardReturn } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Nav from "../../CommonComponents/Nav";
import Sidebar from "../../CommonComponents/Sidebar";
import "../PagesStyles/Watchlist.css";

function UserWatchlist() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [watchlist, setWatchlist] = useState([]);
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [removeMovie, setRemoveMovie] = useState();

  function removeBookmark(movie) {
    // console.log(movie)
    setWatchlist(
      watchlist.filter((m) => {
        return m.movieId !== movie.movieDetail.id;
      })
    );
    fetch(
      `http://localhost:3001/watchlist/?userid=${currentUser.id}&movieId=${movie.MovieId}`
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
  // console.log("===>", watchlist);
  // console.log(state);
  useEffect(() => {
    !JSON.parse(localStorage.getItem("currentUser"))
      ? navigate("/login")
      : setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  useEffect(() => {
    currentUser &&
      fetch(`http://localhost:3001/watchlist/?userid=${currentUser.id}`)
        .then((response) => response.json())
        .then((data) => setWatchlist(data));
  }, [currentUser]);

  const handleClick = (movie) => {
    navigate("/moviepage", { state: { movie, base_url } });
    // console.log(movie);
  };
  return (
    <div>
      <div className="watchlist">
        <Nav currentUser={currentUser} />
        <div className="watchlist__container">
          <Sidebar currentUser={currentUser} />
          <div className="watchlist__content">
            <h1>My watchlist</h1>
            <div className="watchlist__movieCards">
              {watchlist.map((movie) => (
                // <Link
                //   to={{ pathname: "/moviecard", state: { movie } }}
                //   style={{ textDecoration: "none", color: "black" }}
                // ></Link>
                <div className="watchlist__movieCard">
                  <img
                    style={{ cursor: "pointer" }}
                    key={movie.id}
                    onClick={() => handleClick(movie.movieDetail)}
                    className="watchlist__image"
                    src={`${base_url}${movie.movieDetail.poster_path}`}
                    alt={movie.movieDetail.name}
                  />
                  <div className="watchlist__movieCardFooter">
                    <p>
                      {movie.movieDetail.name ||
                        movie.movieDetail.original_name ||
                        movie.movieDetail.title ||
                        movie.movieDetail.original_title}
                    </p>
                    <BookmarkAdded onClick={() => removeBookmark(movie)} />
                  </div>
                  {/* {bookmarked ? (
              <BookmarkAdded onClick={() => toggleBookmark(movie)} />
            ) : (
              <BookmarkAdd onClick={() => toggleBookmark(movie)} />
            )} */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserWatchlist;
