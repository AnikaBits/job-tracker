


### 1. Difference between getElementById, getElementsByClassName, querySelector and querySelectorAll

getElementById selects an element using is uniqe id.

getElementsByClassName selects elements using class name.

querySelector selects the first matching css selector.

querySelectorAll selects all matching css selector.

### 2. How do you create and insert a new element into the DOM?

We can use document.createElement() to create a new element.

Then we c use appendChild() or append() to insert it into the DOM.

Example:

const heading = document.createElement("h2");
heading.textContent = "New Job";
document.body.append(heading);

### 3. What is Event Bubbling?

Event Bubbling means an event starts from the target element and moves upward to its parent elements.

For example, clicking a button inside a card triggers the button event first, then the parent element.

### 4. What is Event Delegation? Why is it useful?

Event Delegation means adding one event listener to a parent element instead of adding separate listeners to every child.

It reduces event listeners and also works for dynamically created elements.

## 5. Difference between preventDefault() and stopPropagation()

preventDefault() prevents the browser's default action.
stopPropagation() stops an event from moving to parent element.


