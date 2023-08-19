import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, itemName) {
  const [itemStored, setItemStored] = useState(function () {
    const storedValue = localStorage.getItem(itemName);
    return storedValue ? JSON.parse(storedValue) : initialState;
    // initialize values in state using callback function that get values from local storage. this only executes on initial render
  });
  useEffect(
    function () {
      localStorage.setItem(itemName, JSON.stringify(itemStored));
    },
    [itemStored, itemName]
  );

  return [itemStored, setItemStored];
}
