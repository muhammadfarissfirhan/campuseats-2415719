import MenuItemCard from "./MenuItemCard.jsx";
import { useCart } from "../hooks/useCart.js";

function MenuList({ items, onView }) {
  const { addToCart } = useCart();

  if (items.length === 0) {
    return <p className="muted">No items on this menu yet.</p>;
  }

  return (
    <div className="grid">
      {items.map((item) => (
        <MenuItemCard
          key={item.id}
          item={item}
          onAdd={addToCart}
          onView={onView}
        />
      ))}
    </div>
  );
}

export default MenuList;
