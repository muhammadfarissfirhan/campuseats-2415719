import { useMyOrders } from "../hooks/useMyOrders.js";
import OrderStatus from "../components/OrderStatus.jsx";
import OrderActions from "../components/OrderActions.jsx";
import { Loading, ErrorMessage } from "../components/Status.jsx";

function OrdersPage() {
  const { orders, loading, error } = useMyOrders();

  if (loading) return <Loading />;
  if (error)
    return (
      <ErrorMessage message={error} onRetry={() => window.location.reload()} />
    );

  if (orders.length === 0) {
    return <p className="muted">You have no orders yet.</p>;
  }

  return (
    <>
      <h2 className="section-title">My orders</h2>
      <p className="muted">Status updates appear here live.</p>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="card">
            <p className="cart-name">
              {order.vendorName} · pickup {order.pickupTime}
            </p>
            <p className="muted">
              {order.items.map((i) => `${i.qty}x ${i.name}`).join(", ")}
            </p>
            <p className="muted">
              Placed{" "}
              {order.createdAt
                ? order.createdAt.toDate().toLocaleString("en-MY")
                : "just now"}
            </p>
            <p className="price">RM {order.total.toFixed(2)}</p>
            <OrderStatus status={order.status} />
            {order.status === "Received" && <OrderActions order={order} />}
          </li>
        ))}
      </ul>
    </>
  );
}

export default OrdersPage;
