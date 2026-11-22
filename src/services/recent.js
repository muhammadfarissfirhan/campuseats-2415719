import { doc, onSnapshot, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";

// Live listener for recent/{uid}
export function subscribeToRecent(uid, onData, onError) {
  return onSnapshot(
    doc(db, "recent", uid),
    (snap) => {
      if (!snap.exists()) {
        onData({ vendors: [], items: [] });
        return;
      }
      const data = snap.data();
      onData({
        vendors: data.vendors ?? [],
        items: data.items ?? [],
      });
    },
    onError,
  );
}

// Add a visited vendor: newest first, no duplicates, max 5
export async function recordRecentVendor(uid, vendor) {
  const ref = doc(db, "recent", uid);
  const snap = await getDoc(ref);
  const existing = snap.exists() ? (snap.data().vendors ?? []) : [];

  const filtered = existing.filter((v) => v.id !== vendor.id);
  const updated = [
    { id: vendor.id, name: vendor.name, location: vendor.location ?? "" },
    ...filtered,
  ].slice(0, 5);

  await setDoc(ref, { vendors: updated }, { merge: true });
}

// Add a viewed item: newest first, no duplicates, max 5
export async function recordRecentItem(uid, item) {
  const ref = doc(db, "recent", uid);
  const snap = await getDoc(ref);
  const existing = snap.exists() ? (snap.data().items ?? []) : [];

  const filtered = existing.filter((i) => i.id !== item.id);
  const updated = [
    {
      id: item.id,
      vendorId: item.vendorId,
      vendorName: item.vendorName ?? "",
      name: item.name,
      price: item.price,
    },
    ...filtered,
  ].slice(0, 5);

  await setDoc(ref, { items: updated }, { merge: true });
}

// Clear both lists in Firestore
export async function clearRecent(uid) {
  await setDoc(
    doc(db, "recent", uid),
    { vendors: [], items: [] },
    { merge: true },
  );
}
