import css from "./LoadMoreBtn.module.css";

// import React from "react";

const LoadMoreBtn = ({ onClickBtn }) => {
  return (
    <div className={css["load-box"]}>
      <button type="button" onClick={onClickBtn} className={css["load-btn"]}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
