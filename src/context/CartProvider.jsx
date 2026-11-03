import { CartContext } from "./cart-context.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { useAuth } from "../hooks/useAuth.js"; // 1. Import useAuth

function CartProvider({ children }) {
  const { user } = useAuth(); // 2. Get the logged-in user

  // 3. Create dynamic keys so every user has an isolated cart and order history
  const cartKey = user
    ? "campuseats-cart-" + user.uid
    : "campuseats-cart-guest";
  const ordersKey = user
    ? "campuseats-orders-" + user.uid
    : "campuseats-orders-guest";

  // 4. Pass the dynamic keys into your updated useLocalStorage hook
  const [cart, setCart] = useLocalStorage(cartKey, []);
  const [orders, setOrders] = useLocalStorage(ordersKey, []);

  // Derived values (not stored)
  const count = cart.reduce((sum, line) => sum + line.qty, 0);
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0);

  function addToCart(item) {
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

  function changeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line,
        )
        .filter((line) => line.qty > 0),
    );
  }

  function removeFromCart(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId));
  }

  function placeOrder(details) {
    const order = {
      id: Date.now(),
      ...details,
      lines: cart,
      total,
    };
    setOrders((prev) => [order, ...prev]);
    setCart([]);
  }

  const value = {
    cart,
    orders,
    count,
    total,
    addToCart,
    changeQty,
    removeFromCart,
    placeOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
