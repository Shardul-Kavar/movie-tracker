import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate, useParams } from "react-router";
import "../CommonComponents/CCstyles/MovieCard.css";

export default function MoviePage() {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const params = useParams();
  const navigate = useNavigate();
  const [thisMovie, setThisMovie] = useState({});

  useEffect(() => {
    !localStorage.getItem("currentUser") && navigate("/login");
  }, [navigate]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${params.type}/${params.movieId}?api_key=ed03bffe513a5d137b3a0965c3b0d9c0`
    ).then((response) => response.json().then((data) => setThisMovie(data)));
  }, []);
  console.log(thisMovie);

  return (
    <Card
      sx={{ maxWidth: 1 / 1 }}
      className="moviecard"
      style={{ padding: " 10px 200px 200px 200px" }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            M
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={thisMovie.original_title}
        subheader={`release date : ${
          thisMovie?.first_air_date || thisMovie?.release_date
        }`}
      />
      <div className="moviecard__contents">
        <div>
          <CardMedia
            component="img"
            height="auto"
            image={`${base_url}${
              thisMovie.poster_path || thisMovie.backdrop_path
            }`}
            alt={thisMovie.original_name}
          />
        </div>
        <div style={{ padding: "20px" }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {thisMovie.overview}
            </Typography>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
