import { useEffect } from "react";

export function useKey(callback, key) {
  useEffect(
    function () {
      function cleanupCallback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) callback();
      }
      document.addEventListener("keydown", cleanupCallback);

      // cleanup function
      return function () {
        document.removeEventListener("keydown", cleanupCallback);
      };
    },
    [callback, key]
  );
}
