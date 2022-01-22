import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AllMovies from "../../CommonComponents/AllMovies";
import Nav from "../../CommonComponents/Nav";
import Sidebar from "../../CommonComponents/Sidebar";
import "../PagesStyles/MoviesHome.css";

function MoviesHome() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    !JSON.parse(localStorage.getItem("currentUser"))
      ? navigate("/login")
      : setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);
  useEffect(() => {
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
      .then((data) => setWatchlist([...watchlist, data]))
      .error((error) => console.log(error));
  }

  function handleWatchlist(moviesInWl) {
    // console.log(moviesInWl);
  }

  function removeBookmark(movie) {
    setWatchlist(
      watchlist.filter((m) => {
        return m.movieId !== movie.id;
      })
    );
    fetch(
      `http://localhost:3001/watchlist/?userid=${currentUser.id}&movieId=${movie.id}`
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

  return (
    <div>
      <div className="moviesHome">
        <Nav currentUser={currentUser} />
        <div className="moviesHome__container">
          <Sidebar currentUser={currentUser} />
          <div className="moviesHome__content">
            <AllMovies
              handleWatchlist={handleWatchlist}
              bookmarkThis={bookmarkThis}
              removeBookmark={removeBookmark}
              watchlist={watchlist}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviesHome;
