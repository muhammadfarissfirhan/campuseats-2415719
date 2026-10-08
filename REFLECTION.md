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
