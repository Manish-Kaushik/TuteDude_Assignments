# ReactJS Context API - Task 28

## Project
ShoeMart is a simple React shoe store that uses the React Context API to manage shopping-cart state.

## Required Features
- React Context API for cart state management
- Add shoes to cart
- Increase/decrease quantity
- Remove items from cart
- Cart total calculation
- Proceed to Payment button
- Payment page
- Cart data remains available on the payment page through Context API
- Return to shopping button
- Credit/debit card payment form
- Responsive layout

## Routes
- `/` - Shoe store and shopping cart
- `/payment` - Payment and order summary

## Run
1. Open the project in VS Code.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open the local Vite URL in the browser.

## Implementation Overview
`CartContext.jsx` contains the shared cart state and functions. `main.jsx` consumes the context from both the shopping page and payment page, so the same cart data is available across the application.
