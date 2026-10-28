// Shows the last vendors and menu items the user looked at, with a Clear button.
function RecentlyViewed({ vendors, items, onSelectVendor, onClear }) {
  if (vendors.length === 0 && items.length === 0) return null;

  return (
    <section className="recent">
      <div className="recent-head">
        <h2 className="section-title">Recently viewed</h2>
        <button type="button" className="link-dark" onClick={onClear}>
          Clear
        </button>
      </div>

      {vendors.length > 0 && (
        <div className="chips">
          <span className="muted">Vendors:</span>
          {vendors.map((v) => (
            <button
              key={v.id}
              type="button"
              className="chip chip-button"
              onClick={() => onSelectVendor(v.id)}
            >
              {v.name}
            </button>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className="chips">
          <span className="muted">Items:</span>
          {items.map((item) => (
            <span key={item.id} className="chip">
              {item.name} · RM {item.price.toFixed(2)}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}

export default RecentlyViewed;
