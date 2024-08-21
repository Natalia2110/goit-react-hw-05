import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import css from "./SearchMoviesForm.module.css";
import toast, { Toaster } from "react-hot-toast";

const SearchMoviesForm = ({ onSearch, defaultSearchValue }) => {
  const [notification, setNotification] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (event.currentTarget.elements.input.value.trim() === "") {
      setNotification(true);
    } else {
      setNotification(false);
      const form = event.target;
      const inputValue = form.input.value.trim();
      onSearch(inputValue);
      form.reset();
    }
  };

  const notify = () =>
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
          defaultValue={defaultSearchValue}
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

// import { ErrorMessage, Field, Form, Formik } from "formik";
// import * as Yup from "yup";

// import css from "./SearchPostsForm.module.css";

// const SearchPostsValidationSchema = Yup.object().shape({
//   searchTerm: Yup.string()
//     .required("Пошукове слово є обов'язковим")
//     .min(2, "Пошукове слово має бути мінімум в 2 символи")
//     .max(100, "Пошукове слово має бути меншим за 100 символів"),
// });

// const SearchMoviesForm = ({ onSubmit, defaultSearchValue }) => {
//   const INITIAL_VALUES = {
//     searchTerm: defaultSearchValue || "",
//   };

//   const handleSubmit = (values) => {
//     onSubmit(values.searchTerm);
//   };

//   return (
//     <Formik
//       initialValues={INITIAL_VALUES}
//       onSubmit={handleSubmit}
//       validationSchema={SearchPostsValidationSchema}
//     >
//       {({ errors }) => (
//         <Form className={css.form}>
//           <label className={css.label}>
//             <span>Знайти пости за заголовком:</span>
//             <Field type="text" name="searchTerm" placeholder="Love..." />
//             <ErrorMessage
//               className={css.errorText}
//               name="searchTerm"
//               component="span"
//             />
//           </label>

//           <button
//             disabled={Object.keys(errors).length > 0}
//             className={css.submitBtn}
//             type="submit"
//           >
//             🔍 Search Posts
//           </button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

export default SearchMoviesForm;
