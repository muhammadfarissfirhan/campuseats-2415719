import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  // 1. Helper function to read from local storage safely
  const readValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  };

  // 2. Set the initial state
  const [storedValue, setStoredValue] = useState(readValue);

  // 3. If the key changes (e.g., from Guest to Logged In), read the new data immediately
  useEffect(() => {
    setStoredValue(readValue());
  }, [key]);

  // 4. Custom setter function that updates state AND saves to storage at the exact same time
  const setValue = (value) => {
    try {
      // Allow value to be a function, just like standard useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      // Save it safely without a racing useEffect
      if (valueToStore === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
