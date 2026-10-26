import { useState } from "react";

function CheckoutForm({ onPlaceOrder }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickupTime: "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field being typed in
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.pickupTime)
      newErrors.pickupTime = "Please select a pickup time.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onPlaceOrder(formData);
  }

  return (
    <div className="card">
      <h3>Checkout</h3>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? "error" : ""}
        />
        {errors.name && <p className="field-error">{errors.name}</p>}

        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? "error" : ""}
        />
        {errors.phone && <p className="field-error">{errors.phone}</p>}

        <label htmlFor="pickupTime">Pickup Time</label>
        <select
          id="pickupTime"
          name="pickupTime"
          value={formData.pickupTime}
          onChange={handleChange}
          className={errors.pickupTime ? "error" : ""}
        >
          <option value="">Select a time</option>
          <option value="ASAP">As soon as possible</option>
          <option value="12:00 PM">12:00 PM</option>
          <option value="1:00 PM">1:00 PM</option>
          <option value="6:00 PM">6:00 PM</option>
        </select>
        {errors.pickupTime && (
          <p className="field-error">{errors.pickupTime}</p>
        )}

        <button type="submit" style={{ marginTop: "1rem" }}>
          Place Order
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
