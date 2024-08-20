// import React from "react";
// import css from "./SearchMoviesForm.module.css";

// const SearchMoviesForm = () => {
//   return (
//     <div>
//       <form>
//         <input
//           name="input"
//           className={css.input}
//           type="text"
//           autoComplete="off"
//           autoFocus
//           placeholder="Search mowies"
//         />
//         <button>Search</button>
//       </form>
//     </div>
//   );
// };

// export default SearchMoviesForm;

import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import css from "./SearchMoviesForm.module.css";
import toast, { Toaster } from "react-hot-toast";

const SearchMoviesForm = ({ onSubmit }) => {
  const [notification, setNotification] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(event.currentTarget.elements.input.value);

    if (event.currentTarget.elements.input.value.trim() === "") {
      setNotification(true);
    } else {
      setNotification(false);
      const form = event.target;
      const inputValue = form.input.value.trim();
      onSubmit(inputValue);
      form.reset();
    }
  };

  const notify = () =>
    // toast.dismiss();
    toast.error("Введіть текст для пошуку фільмів", {
      duration: 2000,
    });

  return (
    <div className={css["form-box"]}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          name="input"
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button type="submit" className={css.btn} onClick={notify}>
          <IoSearchOutline size="24" className={css["search-icon"]} />
          Search
        </button>
      </form>
      {notification && (
        <Toaster
          toastOptions={{
            position: "top-right",
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
          }}
        />
      )}
    </div>
  );
};

export default SearchMoviesForm;
