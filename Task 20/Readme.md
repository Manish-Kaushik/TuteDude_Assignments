# Task 20 - JavaScript Mini Project
## Laundry Services Web App

### Files
- index.html
- style.css
- script.js
- Readme.md

### Features
- Responsive navigation bar
- Hero section with booking button
- Service achievement section
- Laundry service list
- Add Item and Remove Now functionality
- Dynamic cart
- Dynamic total amount
- Booking form for name, email and phone
- EmailJS integration code for booking confirmation
- Quality description section
- Newsletter subscription section
- Footer with important links and social icons
- Responsive mobile layout

### Run
Open `index.html` in a browser.

### EmailJS setup
The project contains the required EmailJS logic. For real email delivery:

1. Create an EmailJS account.
2. Create an Email Service.
3. Create an Email Template.
4. Replace these values in `script.js`:
   - YOUR_EMAILJS_PUBLIC_KEY
   - YOUR_EMAILJS_SERVICE_ID
   - YOUR_EMAILJS_TEMPLATE_ID

Suggested EmailJS template variables:
- {{name}}
- {{email}}
- {{phone}}
- {{services}}
- {{total}}

Without EmailJS credentials, the booking still works locally and displays the confirmation message, but no real email is sent.
