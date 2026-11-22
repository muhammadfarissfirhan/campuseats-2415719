# Week 1 reflection

1. What is the difference between building a UI imperatively (plain DOM code) and
   declaratively (React)?
   Imperative (plain DOM) means telling the browser every step and updating the screen manually by hand. Declarative (React) means describing what the screen should look like based on your data, and React automatically updates the page when the data changes.

2. Why must a component name start with a capital letter?
   React treats lowercase letter as regular HTML elements while capital letter tells React that it is a custom component.

3. What does a fragment <>...</> do, and why not just use a <div>?
   A fragment groups multiple elements into a single root element, which JSX requires. <div> fragment does not add an extra, unnecessary wrapper box to the actual HTML page.

4. Name one benefit of splitting the UI into small components.
   Because you can reuse the small components at multiple places or for multiple data items.

# Week 6

1. When I click Place order in CheckoutForm, it triggers handlePlaceOrder(details) inside CartPage.jsx. This handler calls placeOrders(user, cart, details) in src/services/orders.js, which groups the cart items by vendorId using a Map and uses writeBatch() and batch.set() to save one order document per vendor into the Firestore orders collection with serverTimestamp(). Once await placeOrders(...) succeeds, handlePlaceOrder calls clearCart() to empty the cart and navigate('/orders') to open OrdersPage. When OrdersPage mounts, the useMyOrders() hook runs subscribeToMyOrders(user.uid, ...) inside useEffect, which attaches an onSnapshot() listener filtered with where('studentUid', '==', uid). Because onSnapshot() automatically fires whenever Firestore detects a new or updated document matching that query and calls setOrders(orders) inside the hook's callback, I never have to call setOrders manually after placing an order.

2. Making orders a top-level collection instead of nesting it under individual vendors or users makes it much easier to query across the entire system, for example, a student can fetch all their orders across multiple shops in one query using where('studentUid', '==', uid), and a vendor can query all orders for their shop using vendorId. In NoSQL databases like Firestore, copying fields like vendorName, item name, and price into each order document (denormalization) avoids having to make extra database reads to look up vendor and menu documents every time the Orders page loads. More importantly, copying the item name and price acts as a historical receipt snapshot. If a vendor later changes a menu item's price or deletes the item from their menu subcollection, past orders still accurately record what the student actually ordered and paid at the time of checkout.

3. My personal feature is Recently viewed, and its data is stored in Firestore at the document path recent/{uid} (where {uid} is the logged-in student's Firebase Auth user ID). Inside that document, two array fields vendors and items store objects containing the item or shop id, name, vendorId, vendorName, and price (capped at 5 items, newest first). In src/services/recent.js, the live listener reads this document using onSnapshot inside subscribeToRecent

## Bug I Encountered Today

What happened: After migrating vendors and menus to Firestore, HomePage.jsx crashed with a blank screen and TypeError: Cannot read properties of undefined (reading 'map').

Cause: HomePage.jsx was trying to map over allItems / vendor.menu, which no longer existed on vendor documents because menus moved into a vendors/{vendorId}/menu subcollection.

Fix: Updated src/services/recent.js and useRecentlyViewed.js to store the full item details (name, price, vendorId) directly inside recent/{uid} and read them via onSnapshot so HomePage.jsx no longer relies on a local allItems array.
