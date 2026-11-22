import VendorCard from "../components/VendorCard.jsx";
import RecentlyViewed from "../components/RecentlyViewed.jsx";
import { Loading, ErrorMessage } from "../components/Status.jsx";
import { useVendors } from "../hooks/useVendors.js";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed.js";

function HomePage() {
  const { vendors, loading, error, reload } = useVendors();
  const { recentVendors, recentItems, addVendor, clear } = useRecentlyViewed();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

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
