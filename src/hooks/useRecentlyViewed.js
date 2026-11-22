import { useEffect, useState } from "react";
import { useAuth } from "./useAuth.js";
import {
  subscribeToRecent,
  recordRecentVendor,
  recordRecentItem,
  clearRecent,
} from "../services/recent.js";

export function useRecentlyViewed() {
  const { user } = useAuth();
  const [recent, setRecent] = useState({ vendors: [], items: [] });

  useEffect(() => {
    if (!user) {
      setRecent({ vendors: [], items: [] });
      return;
    }
    const unsubscribe = subscribeToRecent(user.uid, setRecent, (err) =>
      console.error("Recent listener error:", err),
    );
    return unsubscribe;
  }, [user]);

  function addVendor(vendor) {
    if (!user) return;
    recordRecentVendor(user.uid, vendor);
  }

  function addItem(item) {
    if (!user) return;
    recordRecentItem(user.uid, item);
  }

  function clear() {
    if (!user) return;
    clearRecent(user.uid);
  }

  return {
    recentVendors: recent.vendors,
    recentItems: recent.items,
    addVendor,
    addItem,
    clear,
  };
}
