import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useLocation } from "react-router";
import "./CCstyles/MovieCard.css";
import { BookmarkAdd, BookmarkAdded } from "@mui/icons-material";

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

export default function MoviePage() {
  const [expanded, setExpanded] = React.useState(false);
  // const { state } = useLocation();
  const { state } = useLocation();
  const [bookmarked, setBookmarked] = React.useState(false);
  // console.log(state.movie);
  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  function toggleBookmark() {
    console.log(state.movie.id);
    setBookmarked(!bookmarked);
  }

  return (
    <Card sx={{ maxWidth: 1 / 1 }} className="moviecard">
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
          state.movie.name ||
          state.movie.original_name ||
          state.movie.title ||
          state.movie.original_title
        }
        subheader={`release date : ${
          state.movie.first_air_date || state.movie.release_date
        }`}
      />
      <div className="moviecard__contents">
        <div>
          <CardMedia
            component="img"
            height="auto"
            image={`${state.base_url}${
              state.movie.poster_path || state.movie.backdrop_path
            }`}
            alt={state.movie.original_name}
          />
        </div>
        <div style={{ padding: "20px" }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {state.movie.overview}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton aria-label="add to favorites">
              {bookmarked ? (
                <BookmarkAdd onClick={() => toggleBookmark()} />
              ) : (
                <BookmarkAdded onClick={() => toggleBookmark()} />
              )}
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}{" "}
          </CardActions>
        </div>
      </div>
    </Card>
  );
}
