import style from "./Style.module.css";
const AddItem = ({ showForm }) => {
  return (
    <p
      onClick={() => {
        console.log("clicked");
        showForm(true);
      }}
      className={style["addItem"]}
    >
      +
    </p>
  );
};
export default AddItem;
