import "./style.css";
const Jumbotron = ({
  title,
  description,
  image_link = "",
  height,
  width,
  children,
  style = {},
}) => {
  return (
    <div
      className="Jumbotron"
      style={Object.assign(
        {
          height: height,
          width: width,
          background: image_link ? `url("${image_link}")` : "",
        },
        style
      )}
    >
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </div>
  );
};

export default Jumbotron;
