import VendorCard from "../components/VendorCard.jsx";
import RecentlyViewed from "../components/RecentlyViewed.jsx";
import { Loading, ErrorMessage } from "../components/Status.jsx";
import { useVendors } from "../hooks/useVendors.js";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed.js";

function HomePage() {
  const { vendors, loading, error, reload } = useVendors();
  const { vendorIds, itemIds, addVendor, clear } = useRecentlyViewed();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  // Turn saved ids back into objects (derived, not stored)
  const allItems = vendors.flatMap((v) =>
    v.menu.map((i) => ({ ...i, vendorId: v.id })),
  );
  const recentVendors = vendorIds
    .map((id) => vendors.find((v) => v.id === id))
    .filter(Boolean);
  const recentItems = itemIds
    .map((id) => allItems.find((i) => i.id === id))
    .filter(Boolean);

  return (
    <>
      <RecentlyViewed
        vendors={recentVendors}
        items={recentItems}
        onClear={clear}
      />

      <section>
        <h2 className="section-title">Choose a vendor</h2>
        <div className="grid">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} onVisit={addVendor} />
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;
