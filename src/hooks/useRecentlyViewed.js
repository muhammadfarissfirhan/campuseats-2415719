import { useLocalStorage } from "./useLocalStorage.js";
import { useAuth } from "./useAuth.js"; // 1. Import useAuth

// Newest first, no duplicates, keep only `max` ids
function addRecent(list, id, max) {
  return [id, ...list.filter((x) => x !== id)].slice(0, max);
}

// Personal feature (digit 9): saved in localStorage so it survives refresh.
export function useRecentlyViewed() {
  const { user } = useAuth(); // 2. Get the current user

  // 3. Create dynamic keys based on the user's ID, as required by the lab sheet
  const itemKey = user ? "ce-recent-" + user.uid : "ce-recent-guest";
  const vendorKey = user
    ? "ce-recent-vendors-" + user.uid
    : "ce-recent-vendors-guest";

  const [vendorIds, setVendorIds] = useLocalStorage(vendorKey, []);
  const [itemIds, setItemIds] = useLocalStorage(itemKey, []);

  function addVendor(id) {
    if (!user) return; // 4. Guests do not save
    setVendorIds((prev) => addRecent(prev, id, 3));
  }

  function addItem(id) {
    if (!user) return; // 4. Guests do not save
    setItemIds((prev) => addRecent(prev, id, 5));
  }

  function clear() {
    setVendorIds([]);
    setItemIds([]);
  }

  return { vendorIds, itemIds, addVendor, addItem, clear };
}
