import { BookmarkAdded, KeyboardReturn } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Nav from "../CommonComponents/Nav";
import Sidebar from "../CommonComponents/Sidebar";
import "./PagesStyles/Watchlist.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function UserWatchlist() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [watchlist, setWatchlist] = useState([]);
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [removeMovie, setRemoveMovie] = useState();
  const [thisUser, setThisUser] = useState({ username: "user" });
  const { state } = useLocation();
  console.log(state);

  useEffect(() => {
    !JSON.parse(localStorage.getItem("currentUser"))
      ? navigate("/login")
      : setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));

    fetch(`http://localhost:3001/watchlist/?userid=${state}`)
      .then((response) => response.json())
      .then((data) => setWatchlist(data));
    fetch(`http://localhost:3001/users/?id=${state}`)
      .then((response) => response.json())
      .then((data) => setThisUser(data[0]));
  }, []);

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
            <h1>{thisUser.username}'s watchlist</h1>
            <div className="watchlist__movieCards">
              {watchlist.map((movie) => {
                return (
                  <Card sx={{ maxWidth: 345 }} className="watchlist__movieCard">
                    <CardMedia
                      component="img"
                      height="140"
                      key={movie.id}
                      onClick={() => handleClick(movie.movieDetail)}
                      className="watchlist__poster"
                      src={`${base_url}${movie.movieDetail.poster_path}`}
                      alt={movie.movieDetail.name}
                      style={{ cursor: "pointer" }}
                    />
                    <div className="watchlist__movieCard__textContent">
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {movie.movieDetail.name ||
                            movie.movieDetail.original_name ||
                            movie.movieDetail.title ||
                            movie.movieDetail.original_title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          className="watchlsit__movieCard__overview"
                        >
                          {movie.movieDetail.overview}
                        </Typography>
                      </CardContent>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserWatchlist;
