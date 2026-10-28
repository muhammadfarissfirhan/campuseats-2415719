import { Link } from "react-router";

function VendorCard({ vendor, onVisit }) {
  return (
    <Link
      to={`/vendor/${vendor.id}`}
      className="card vendor-card"
      onClick={() => onVisit(vendor.id)}
    >
      <span className="thumb">{vendor.name.charAt(0)}</span>
      <span className="vendor-info">
        <span className="vendor-name">{vendor.name}</span>
        <span className="muted">{vendor.location}</span>
        <span className="muted">Open: {vendor.openHours}</span>
        <span className={vendor.isOpen ? "status open" : "status closed"}>
          {vendor.isOpen ? "Open now" : "Closed"}
        </span>
      </span>
    </Link>
  );
}

export default VendorCard;
