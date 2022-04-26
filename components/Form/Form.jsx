import { useEffect, useState } from "react";
import is_sensitive from "../../scripts/Tensorflow/Toxicity";
import TextField from "@mui/material/TextField";
const Form = ({ fields }) => {
  const [{ is_read, message_status }, use_state] = useState({
    is_read: 0,
  });
  const Fields = Object.entries(fields).map(([field_name, field_attribute]) => {
    return (
      <Field title={field_name} textarea={field_attribute.textarea ?? false} />
    );
  });
  useEffect(() => {
    if (is_read) {
      const composite_text = Array.from(
        document.getElementsByClassName("input_field")
      ).reduce((cur_element, next_element) => {
        return cur_element.value + " " + next_element.value;
      }, "");
      is_sensitive(composite_text).then((status) => {
        if (status)
          use_state({
            is_read: 2,
            message_status: "Post is too toxic--Post blocked",
          });
        else {
          use_state({
            is_read: 0,
            message_status: "Create a new post",
          });
        }
      });
    }
  });
  return (
    <div>
      <p style={{ color: is_read === 2 ? "red" : "black" }}>{message_status}</p>
      {Fields}
    </div>
  );
};

const Field = ({ title, textarea }) => {
  console.log(title, textarea);
  return (
    <div>
      <h2>{title}</h2>
      <TextField
        id={title}
        label={title}
        placeholder="Placeholder"
        multiline={textarea}
      />
    </div>
  );
};
export default Form;
