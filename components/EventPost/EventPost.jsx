import "./style.css";
const EventPost = ({
  height,
  width,
  title,
  description,
  attendees,
  image,
  tags,
  emoji,
  type,

  order,
}) => {
  const Tags = tags.map((tag) => {
    const random_tag_color = Math.random() * 360;
    return <p>#{tag}</p>;
  });
  return (
    <div
      className="EventPost"
      style={{
        height: height,
        width: width,
        backdropFilter: `brightness(${1 - 0.2 * (order % 2)})`,
      }}
    >
      <div className="EventPost_Context">
        <h1>{title}</h1>
        <p style={{ color: type === "item" ? "rgb(0,255,0)" : "" }}>
          {attendees}
          {type === "item" ? (attendees == "Free" ? "🏆" : "💵") : "👥"}
        </p>
      </div>
      <div className="EventPost_Description">
        <p>{description}</p>
        <div className="EventTags">{Tags}</div>
      </div>
      <img className="EventPost_Image" src={image} />
      <p
        style={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          margin: "0",
          fontSize: "1.8rem",
          backdropFilter: "blur(7px)",
          borderRadius: "100%",
          height: "2.7rem",
          width: "2.7rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {emoji}
      </p>
    </div>
  );
};
export default EventPost;
