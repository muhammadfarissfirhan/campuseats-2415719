import { useEffect, useState } from "react";
import { subscribeToVendor, subscribeToMenu } from "../services/vendors.js";

// One vendor plus its menu, both live. Two listeners, so two cleanups.
export function useVendor(vendorId) {
  const [vendor, setVendor] = useState(undefined); // undefined = loading, null = not found
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const stopVendor = subscribeToVendor(vendorId, setVendor, (err) =>
      setError(err.message),
    );
    const stopMenu = subscribeToMenu(vendorId, setMenu, (err) =>
      setError(err.message),
    );

    // TODO 2: return ONE cleanup function that calls stopVendor() and stopMenu()
    return () => {
      stopVendor();
      stopMenu();
    };
  }, [vendorId]);

  return { vendor, menu, loading: vendor === undefined && !error, error };
}
