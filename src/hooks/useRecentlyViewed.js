import { useLocalStorage } from "./useLocalStorage.js";

// Newest first, no duplicates, keep only `max` ids
function addRecent(list, id, max) {
  return [id, ...list.filter((x) => x !== id)].slice(0, max);
}

// Personal feature (digit 9): saved in localStorage so it survives refresh.
export function useRecentlyViewed() {
  const [vendorIds, setVendorIds] = useLocalStorage(
    "campuseats-recent-vendors",
    [],
  );
  const [itemIds, setItemIds] = useLocalStorage("campuseats-recent-items", []);

  function addVendor(id) {
    setVendorIds((prev) => addRecent(prev, id, 3));
  }

  function addItem(id) {
    setItemIds((prev) => addRecent(prev, id, 5));
  }

  function clear() {
    setVendorIds([]);
    setItemIds([]);
  }

  return { vendorIds, itemIds, addVendor, addItem, clear };
}
