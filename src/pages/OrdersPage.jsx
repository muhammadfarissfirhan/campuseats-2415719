import { useCart } from "../hooks/useCart.js";

function OrdersPage() {
  const { orders } = useCart();

  if (orders.length === 0) {
    return <p className="muted">You have no orders yet.</p>;
  }

  return (
    <>
      <h2 className="section-title">My orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="card order">
          <p>
            <strong>{order.name}</strong> · Mahallah {order.mahallah} · Pickup{" "}
            {order.pickupTime}
          </p>
          <ul>
            {order.lines.map((line) => (
              <li key={line.item.id}>
                {line.qty} × {line.item.name}
              </li>
            ))}
          </ul>
          <p className="cart-total">Total: RM {order.total.toFixed(2)}</p>
        </div>
      ))}
    </>
  );
}

export default OrdersPage;
