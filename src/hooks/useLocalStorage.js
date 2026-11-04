import { useState } from "react";

function readValue(key, initialValue) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch {
    return initialValue; // bad JSON or storage blocked
  }
}

export function useLocalStorage(key, initialValue) {
  // Keep the key together with the value, so we know which key the value belongs to
  const [state, setState] = useState(() => ({
    key,
    value: readValue(key, initialValue),
  }));

  // If the key changes (e.g. guest -> logged in), read the new key's data straight away.
  // Doing this while rendering (not in useEffect) avoids an extra render with old data.
  let current = state;
  if (state.key !== key) {
    current = { key, value: readValue(key, initialValue) };
    setState(current);
  }

  // Updates state AND saves to storage at the same time, like useState's setter
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(current.value) : value;
      setState({ key, value: valueToStore });

      if (valueToStore === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [current.value, setValue];
}
