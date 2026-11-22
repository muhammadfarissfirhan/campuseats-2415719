# AI usage log

## Week 1

- Tool(s): Gemini
- What I asked for: why I cannot run "npm create vite@latest hello-react -- --template react".
- What I kept, changed or rejected, and why: Ai told me to changed the command to "npx create-vite@latest hello-react --template react".
- One thing the AI got wrong and how I fixed it:

## Week 2

- Tool(s): Gemini
- What I asked for: explanation about reflection questions.
- What I kept, changed or rejected, and why: I kept all the explanations and answer the reflection questions.
- One thing the AI got wrong and how I fixed it:

## Week 3

- no AI usage

## Week 4

- Tool(s): Claude
- What I asked for: how to add the recently viewed feature
- What I kept, changed or rejected, and why: I kept the answer AI give to me and follow all the instructions. The website works with recently view feature successfully added.
- One thing the AI got wrong and how I fixed it:

## Week 5

- Tool(s): Claude
- What I asked for: guide me with the lab 4 instructions and explain it.
- What I kept, changed or rejected, and why: I kept the answer AI give to me and follow all the instructions. The website works following the lab 4 instructions.
- One thing the AI got wrong and how I fixed it:

## Week 6

- Tool(s): Gemini
- What I asked for: help me to do the "recently viewed items" feature, debugging the log out function and adding the "forgot password" stretch task.
- What I kept, changed or rejected, and why: I kept the updated useLocalStorage logic that requires explicit saving (setValue) rather than relying on automatic useEffect triggers. I also kept the dynamic storage keys (like "campuseats-cart-" + user.uid). This was necessary because Firebase's slight loading delay was causing the original Week 4 hook to accidentally overwrite user data with guest data
- One thing the AI got wrong and how I fixed it:

## Week 7

- Tool(s): Gemini
- What I asked for:
  - Updating `CartPage.jsx`, `CheckoutForm.jsx`, and `OrdersPage.jsx` to work with Firestore (`placeOrders`, `useMyOrders`, and `cancelOrder`).
  - Troubleshooting runtime and build errors, including a missing export in `src/services/orders.js`, an undefined `orders` reference in `CartProvider.jsx`, and a blank screen crash on `HomePage.jsx` caused by `allItems` no longer existing after moving menus into Firestore subcollections.
  - Migrating my personal feature (**Recently viewed**, digit 9) from `localStorage` to Firestore (`recent/{uid}`) using `setDoc` with `{ merge: true }` and `onSnapshot`, plus fixing CSS styling for `.order-list` and `.status-steps`.
  - Reviewing the M2 preparation questions for `REFLECTION.md` and verifying the required Firestore screenshots.
- What I kept, changed or rejected, and why:
  - Kept the Firestore service functions (`src/services/orders.js` and `src/services/recent.js`), the updated `useRecentlyViewed` hook, and the CSS fixes for `.order-list` and `.status-steps` because they cleanly kept all Firestore SDK imports inside `src/services/` and updated the UI in real time.
  - Adjusted the `RecentlyViewed` integration so it preserved my existing `RecentlyViewed.jsx` chip layout (tracking both recently viewed `vendors` and `items`) instead of creating a brand-new `useRecent.js` hook and plain bullet list.
- One thing the AI got wrong and how I fixed it:
  - When helping me wire up item tracking in `VendorPage.jsx`, the AI initially passed the prop as `onViewItem={addItem}` to `MenuList`, even though my `MenuList.jsx` expected the prop to be named `onView`. I fixed this by changing the prop in `VendorPage.jsx` to `onView={addItem}` so clicking menu items properly recorded them in `recent/{uid}`.
