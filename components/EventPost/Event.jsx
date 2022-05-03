import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
function FeaturedPost(props) {
  const { title, description, img_link, author, date } = props;
  console.log(props);
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {img_link ? (
                <img
                  src={img_link}
                  style={{
                    height: "8rem",
                    width: "8rem",
                    borderRadius: "15px",
                  }}
                />
              ) : null}
            </div>
            <Typography component="h2" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary"></Typography>
            <Typography variant="subtitle1" paragraph>
              {description}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {author}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {new Date(date).toLocaleDateString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Join!
            </Typography>
          </CardContent>
          <CardMedia
          // component="img"
          // sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
          // image={post.image}
          // alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
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
