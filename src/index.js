import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import StarRating from "./StarRating";

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <StarRating color="blue" onSetRating={setMovieRating} />
//       <p>This movie was rated {movieRating} stars</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={5} color="red" size="48" />
    <StarRating
      maxRating={5}
      size="52"
      messages={["Terrible", "Bad", "Okay", "Good", "Awesome"]}
    />
    <StarRating defaultRating={3} />
    <Test /> */}
  </React.StrictMode>
);
