function VendorCard({ vendor, isSelected, onSelect }) {
  return (
    <button
      type="button"
      className={isSelected ? "card vendor-card selected" : "card vendor-card"}
      onClick={() => onSelect(vendor.id)}
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
    </button>
  );
}

export default VendorCard;
