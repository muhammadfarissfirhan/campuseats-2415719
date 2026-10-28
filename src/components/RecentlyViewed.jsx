import { Link } from "react-router";

// Shows recently viewed vendors and items as links, with a Clear button.
function RecentlyViewed({ vendors, items, onClear }) {
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
            <Link key={v.id} to={`/vendor/${v.id}`} className="chip">
              {v.name}
            </Link>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className="chips">
          <span className="muted">Items:</span>
          {items.map((item) => (
            <Link
              key={item.id}
              to={`/vendor/${item.vendorId}`}
              className="chip"
            >
              {item.name} · RM {item.price.toFixed(2)}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default RecentlyViewed;
