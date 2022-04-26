import style from "./Style.module.css";
import Form from "../Form/Form";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { createTheme, ThemeProvider } from "@mui/material";
import is_sensitive from "../../scripts/Tensorflow/Toxicity";
import PopUpAlert from "../PopUpAlert/PopUpAlert";
import { getCurrentUser } from "../../scripts/common/API";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const CreateItem = ({ showForm }) => {
  const [date, setDate] = useState(new Date("2014-08-18T21:11:54"));
  const [formType, setFormType] = useState("Event");
  const [submission, submit] = useState(null);
  const [alert, setAlert] = useState(null);
  const handleChange = (newValue) => {
    setDate(newValue);
  };
  return (
    <>
      <PopUpAlert error={alert} setError={setAlert} />
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
            onClick={() => setFormType("Market Item")}
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
                id="date_picker"
                label="Choose a date"
                value={date}
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
              const name = document.getElementById(`${formType} Name`).value;
              const description = document.getElementById(
                `${formType} Description`
              ).value;
              const options =
                formType === "Event"
                  ? date
                  : document.getElementById("Cost").value;
              submit_format(formType, name, description, options, setAlert);
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
//move to API.js
const submit_format = async (type, name, description, options, setAlert) => {
  const data = {
    type: type,
    name: name,
    description: description,
    options: options,
    author: (await getCurrentUser()).uid,
  };
  console.log(data.author);
  const composite_string = name + " " + description;
  setAlert("Reading content... Checking for no no's.");

  const should_block = await is_sensitive(composite_string);
  setAlert(
    should_block ? "Post has no no's!" : "We're good to go, submitting post!"
  );
  if (!should_block)
    fetch(
      `http://localhost:3000/api/${
        type === "Event" ? "newEvent" : "newMarketPlaceItem"
      }`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
};
export default CreateItem;
