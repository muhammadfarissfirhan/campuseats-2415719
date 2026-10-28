import { Link, useParams } from "react-router";
import MenuList from "../components/MenuList.jsx";
import { Loading, ErrorMessage } from "../components/Status.jsx";
import { useVendors } from "../hooks/useVendors.js";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed.js";

function VendorPage() {
  const { id } = useParams();
  const { vendors, loading, error, reload } = useVendors();
  const { addItem } = useRecentlyViewed();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  const vendor = vendors.find((v) => v.id === id);
  if (!vendor) {
    return (
      <div className="card">
        <h2>Vendor not found</h2>
        <p className="muted">There is no vendor with the id "{id}".</p>
        <Link to="/">Back to vendors</Link>
      </div>
    );
  }

  return (
    <section>
      <h2 className="section-title">Menu: {vendor.name}</h2>
      <MenuList items={vendor.menu} onView={(item) => addItem(item.id)} />
    </section>
  );
}

export default VendorPage;
