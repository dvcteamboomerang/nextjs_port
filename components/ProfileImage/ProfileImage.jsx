import style from "./Style.module.css";
const ProfileImage = ({ img_link }) => {
  return (
    <div className={style["containers"]}>
      <img src={img_link} className={style["profile_image"]} />
      <div className={style["descriptionContainer"]}></div>
    </div>
  );
};

export default ProfileImage;
