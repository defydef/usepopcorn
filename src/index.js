import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={5} color="red" size="48" />
    <StarRating
      maxRating={5}
      size="52"
      messages={["Terrible", "Bad", "Okay", "Good", "Awesome"]}
    />
    <StarRating />
  </React.StrictMode>
);
