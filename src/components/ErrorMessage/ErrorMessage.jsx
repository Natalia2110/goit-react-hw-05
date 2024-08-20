import css from "./ErrorMessage.module.css";
// import React from "react";

const ErrorMessage = ({ onError }) => {
  return (
    <div className={css["error-box"]}>
      <p className={css.text}>
        за вашим запитом &quot;{onError}&quot; не знайдено жодного фільму.
      </p>
    </div>
  );
};

export default ErrorMessage;
