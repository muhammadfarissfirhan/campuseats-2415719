function MenuItemCard({ item, onAdd, onView }) {
  return (
    <div className="card item-card" onClick={() => onView(item)}>
      <div className="thumb">{item.name.charAt(0)}</div>
      <span className="tag">{item.category}</span>
      <h3 className="item-name">{item.name}</h3>
      <p className="muted">{item.description}</p>
      <p className="price">RM {item.price.toFixed(2)}</p>
      <button
        type="button"
        className="btn"
        disabled={!item.available}
        onClick={() => onAdd(item)}
      >
        {item.available ? "Add to cart" : "Sold out"}
      </button>
    </div>
  );
}

export default MenuItemCard;
