// import React from "react";
import clsx from "clsx";

import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <nav className={css.nav}>
        <NavLink
          className={({ isActive }) => clsx(css.link, isActive && css.active)}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => clsx(css.link, isActive && css.active)}
          to="/movies"
        >
          Movies
        </NavLink>
      </nav>
    </div>
  );
};

export default Navigation;
