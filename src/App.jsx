import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import VendorCard from "./components/VendorCard.jsx";
import MenuList from "./components/MenuList.jsx";
import Footer from "./components/Footer.jsx";
import CartPage from "./components/CartPage.jsx";

function App() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("menu");
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    // Start the 600ms delay
    const timeoutId = setTimeout(() => {
      fetch("/api/vendors.json", { signal: controller.signal })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data) => {
          setVendors(data);
          if (data.length > 0) setSelectedVendorId(data[0].id);
        })
        .catch((err) => {
          if (err.name !== "AbortError") setError(err.message);
        })
        .finally(() => {
          if (!controller.signal.aborted) setLoading(false);
        });
    }, 600); // 600ms timer

    // Cleanup function clears the timeout AND aborts the fetch
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [reloadKey]);

  function handleAddToCart(item) {
    setCart((prevCart) => {
      const existingLine = prevCart.find((line) => line.item.id === item.id);
      if (existingLine) {
        // Increase qty if already in cart
        return prevCart.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line,
        );
      }
      // Add new item with qty 1
      return [...prevCart, { item, qty: 1 }];
    });
  }

  function handleChangeQty(itemId, delta) {
    setCart(
      (prevCart) =>
        prevCart
          .map((line) =>
            line.item.id === itemId ? { ...line, qty: line.qty + delta } : line,
          )
          .filter((line) => line.qty > 0), // Disappears if qty reaches 0
    );
  }

  function handleRemove(itemId) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId));
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

  // Calculate the total quantity for the header badge
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);
  const selectedVendor = vendors.find((v) => v.id === selectedVendorId);

  // Choose what to show based on the view state
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
        <h2>Order Confirmed!</h2>
        {lastOrder && (
          <>
            <p>
              Thank you, <strong>{lastOrder.name}</strong>.
            </p>
            <p>
              Your order total is{" "}
              <strong>RM {lastOrder.total.toFixed(2)}</strong>.
            </p>
            <p>
              Pickup time: <strong>{lastOrder.pickupTime}</strong>
            </p>
            <button
              onClick={() => setView("menu")}
              style={{ marginTop: "1rem" }}
            >
              Start New Order
            </button>
          </>
        )}
      </div>
    );
  } else if (loading) {
    content = (
      <section>
        <h2
          className="section-title"
          style={{
            color: "transparent",
            backgroundColor: "#e4e7eb",
            width: "150px",
            borderRadius: "4px",
          }}
        >
          Loading
        </h2>
        <div className="vendor-grid">
          {/* Skeleton Cards */}
          <div
            className="card"
            style={{ height: "140px", backgroundColor: "#e4e7eb" }}
          ></div>
          <div
            className="card"
            style={{ height: "140px", backgroundColor: "#e4e7eb" }}
          ></div>
          <div
            className="card"
            style={{ height: "140px", backgroundColor: "#e4e7eb" }}
          ></div>
        </div>
      </section>
    );
  } else if (error) {
    content = (
      <main className="container">
        <p>Error loading vendors: {error}</p>
        <button onClick={() => setReloadKey((k) => k + 1)}>Try again</button>
      </main>
    );
  } else {
    // This is your standard menu view
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>
        {selectedVendor && (
          <section>
            <h2 className="section-title">Menu: {selectedVendor.name}</h2>
            <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
          </section>
        )}
      </>
    );
  }

  // The Main Return Block
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
