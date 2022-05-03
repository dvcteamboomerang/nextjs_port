import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActions } from "@mui/material";
function FeaturedPost(props) {
  const { title, description, img_link, author, date } = props;
  console.log(props);
  return (
    <CardActionArea component="a" href="#">
      <Card sx={{ width: "15rem", height: "20rem" }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="100%"
          image={img_link}
        />
        <CardMedia
          component="img"
          alt="green iguana"
          image={img_link}
          sx={{
            top: 0,
            position: "absolute",
            width: "100%",
            height: "68%",
          }}
        />
        <CardContent
          sx={{
            flex: 1,
            position: "absolute",
            bottom: 0,
            color: "white",
            backdropFilter: "blur(7px) brightness(40%)",
            width: "100%",
            height: "32%",
          }}
        >
          <Typography variant="h5" component="div" sx={{ fontSize: "1rem" }}>
            {title}
          </Typography>
          <p style={{ fontSize: "0.7rem", margin: 0, marginLeft: "auto" }}>
            {author}
          </p>
          <Typography sx={{ fontSize: "0.7rem" }} variant="subtitle1">
            {new Date(date).toLocaleDateString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;
