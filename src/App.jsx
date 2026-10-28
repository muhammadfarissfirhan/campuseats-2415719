import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import VendorCard from "./components/VendorCard.jsx";
import MenuList from "./components/MenuList.jsx";
import RecentlyViewed from "./components/RecentlyViewed.jsx";
import CartPage from "./components/CartPage.jsx";
import { Loading, ErrorMessage } from "./components/Status.jsx";

function App() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [cart, setCart] = useState([]); // lines of { item, qty }
  const [view, setView] = useState("menu"); // 'menu' | 'cart' | 'done'
  const [lastOrder, setLastOrder] = useState(null);
  const [recentVendorIds, setRecentVendorIds] = useState([]); // newest first, max 3
  const [recentItemIds, setRecentItemIds] = useState([]); // newest first, max 5

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/vendors.json", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setVendors(data);
        // Select the first vendor once data arrives
        setSelectedVendorId(
          (current) => current ?? (data.length > 0 ? data[0].id : null),
        );
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [reloadKey]);

  function handleRetry() {
    setError(null);
    setLoading(true);
    setReloadKey((k) => k + 1);
  }

  // Newest first, no duplicates, keep only `max` ids
  function addRecent(list, id, max) {
    return [id, ...list.filter((x) => x !== id)].slice(0, max);
  }

  function handleSelectVendor(vendorId) {
    setSelectedVendorId(vendorId);
    setRecentVendorIds((prev) => addRecent(prev, vendorId, 3));
  }

  function handleViewItem(item) {
    setRecentItemIds((prev) => addRecent(prev, item.id, 5));
  }

  function handleClearRecent() {
    setRecentVendorIds([]);
    setRecentItemIds([]);
  }

  function handleAddToCart(item) {
    setCart((prev) => {
      const exists = prev.some((line) => line.item.id === item.id);
      if (exists) {
        return prev.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line,
        );
      }
      return [...prev, { item, qty: 1 }];
    });
  }

  function handleChangeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line,
        )
        .filter((line) => line.qty > 0),
    );
  }

  function handleRemove(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId));
  }

  function handlePlaceOrder(details) {
    const total = cart.reduce(
      (sum, line) => sum + line.item.price * line.qty,
      0,
    );
    setLastOrder({ ...details, total });
    setCart([]);
    setView("done");
  }

  // Derived values (not stored in state)
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);
  const selectedVendor = vendors.find((v) => v.id === selectedVendorId);
  const allItems = vendors.flatMap((v) => v.menu);
  const recentVendors = recentVendorIds
    .map((id) => vendors.find((v) => v.id === id))
    .filter(Boolean);
  const recentItems = recentItemIds
    .map((id) => allItems.find((i) => i.id === id))
    .filter(Boolean);

  let content;
  if (view === "cart") {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
      />
    );
  } else if (view === "done") {
    content = (
      <div className="card">
        <h2 className="section-title">Order placed</h2>
        <p>
          Thank you, {lastOrder.name}! Pick up your order at Mahallah{" "}
          {lastOrder.mahallah} at {lastOrder.pickupTime}.
        </p>
        <p className="cart-total">Total: RM {lastOrder.total.toFixed(2)}</p>
      </div>
    );
  } else if (loading) {
    content = <Loading />;
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={handleRetry} />;
  } else {
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={handleSelectVendor}
              />
            ))}
          </div>
        </section>

        <RecentlyViewed
          vendors={recentVendors}
          items={recentItems}
          onSelectVendor={handleSelectVendor}
          onClear={handleClearRecent}
        />

        {selectedVendor && (
          <section>
            <h2 className="section-title">Menu: {selectedVendor.name}</h2>
            <MenuList
              items={selectedVendor.menu}
              onAdd={handleAddToCart}
              onView={handleViewItem}
            />
          </section>
        )}
      </>
    );
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView("menu")}
        onShowCart={() => setView("cart")}
      />
      <main className="container">{content}</main>
      <Footer />
    </>
  );
}

export default App;
