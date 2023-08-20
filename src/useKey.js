import { useEffect } from "react";

export function useKey(callback) {
  useEffect(
    function () {
      function cleanupCallback(e) {
        if (e.code === "Escape") callback();
      }

      document.addEventListener("keydown", cleanupCallback);

      // cleanup function
      return function () {
        document.removeEventListener("keydown", cleanupCallback);
      };
    },
    [callback]
  );
}
