import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <p>NotFound page</p>
      <Link to="/">back to home page</Link>
    </div>
  );
};

export default NotFoundPage;
