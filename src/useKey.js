import { useEffect } from "react";

export function useKey(callback, inputRef) {
  useEffect(
    function () {
      function cleanupCallback(e) {
        if (e.code === "Escape") callback();
        if (e.code === "Enter") {
          if (inputRef) {
            if (document.activeElement === inputRef.current) return;
            inputRef.current.focus();
          }
          callback();
        }
      }
      document.addEventListener("keydown", cleanupCallback);

      // cleanup function
      return function () {
        document.removeEventListener("keydown", cleanupCallback);
      };
    },
    [callback, inputRef]
  );
}
