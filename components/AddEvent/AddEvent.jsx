import style from "./Style.module.css";
import Form from "../Form/Form";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { createTheme, ThemeProvider } from "@mui/material";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const CreateItem = ({ showForm }) => {
  const [value, setValue] = useState(new Date("2014-08-18T21:11:54"));
  const [formType, setFormType] = useState("Event");
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className={style["overlay"]}></div>
      <div className={style["createItem"]}>
        <button className={style["close"]} onClick={() => showForm(false)}>
          x
        </button>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "2rem",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          <img
            src="/event.png"
            onClick={() => setFormType("Event")}
            className={style["formType"]}
          />
          <img
            src="/marketplace.png"
            onClick={() => setFormType("Market")}
            className={style["formType"]}
          />
        </div>
        <h1>{formType === "Event" ? "Create Event" : "Create Item"}</h1>
        <ThemeProvider theme={darkTheme}>
          {formType == "Event" ? (
            <Form
              fields={{
                "Event Name": {},
                "Event Description": { textarea: true },
              }}
            />
          ) : (
            <Form
              fields={{
                "Market Item Name": {},
                "Market Item Description": { textarea: true },
              }}
            />
          )}
          {formType === "Event" ? <h2>When is it taking place?</h2> : null}
          {formType === "Event" ? (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Date&Time picker"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
                style={{
                  marginTop: "2rem",
                  color: "white",
                  borderColor: "white",
                }}
              />
            </LocalizationProvider>
          ) : (
            <Form
              fields={{
                Cost: {},
              }}
            />
          )}

          <Button
            variant="outlined"
            onClick={() => {
              if (is_read === 0) {
                use_state({ is_read: 1, message_status: "Reading Post" });
              }
            }}
            style={{ marginTop: "2rem", color: "white", borderColor: "white" }}
          >
            Post
          </Button>
        </ThemeProvider>
      </div>
    </>
  );
};
export default CreateItem;
