import style from "./PopUpAlert.module.css";
import { useEffect } from "react";
const PopUpAlert = ({ error, setError }) => {
  let message = error;
  useEffect(() => {
    console.log("rerender");
    let debounce = true;
    const onMouseMove = (event) => {
      let mouse = { clientX: event.clientX, clientY: event.clientY };
      let Alert = document.getElementsByClassName(style["DisplayAlert"])[0];
      if (message && Alert) {
        Alert.style.top = mouse.clientY + "px";
        Alert.style.left = mouse.clientX + "px";
        if (debounce) {
          Alert.style.opacity = 1.0;
          debounce = false;
          setTimeout(
            () => {
              setTimeout(
                () => {
                  Alert.style.opacity = 0;

                  setTimeout(
                    () => {
                      if (message && mouse.clientX && mouse.clientY) {
                        message = null;
                        setError(null);
                      }
                      debounce = false;
                    },
                    2000,
                    style,
                    mouse,
                    message,
                    setError
                  );
                },
                2000,
                style,
                mouse,
                message,
                setError
              );
            },
            2000,
            style,
            mouse,
            message,
            setError
          );
        }
      }
    };
    document.addEventListener("mousemove", onMouseMove);
  }, [style, error, setError]);
  return message ? (
    <p on className={style["DisplayAlert"]}>
      {message}
    </p>
  ) : null;
};

export default PopUpAlert;
