import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useLocation, useNavigate } from "react-router";
import "../CommonComponents/CCstyles/MovieCard.css";

export default function MoviePage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  !state && navigate("/loign");
  useEffect(() => {
    !localStorage.getItem("currentUser") && navigate("/login");
  }, [navigate, state]);

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
        title={
          state?.movie.name ||
          state?.movie.original_name ||
          state?.movie.title ||
          state?.movie.original_title
        }
        subheader={`release date : ${
          state?.movie.first_air_date || state?.movie.release_date
        }`}
      />
      <div className="moviecard__contents">
        <div>
          <CardMedia
            component="img"
            height="auto"
            image={`${state?.base_url}${
              state?.movie.poster_path || state?.movie.backdrop_path
            }`}
            alt={state?.movie.original_name}
          />
        </div>
        <div style={{ padding: "20px" }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {state?.movie.overview}
            </Typography>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
