# ReactJS Props - Card Task

## Overview
A simple React application demonstrating reusable components and Props.

## Features
- Card data is stored in an array of objects.
- A reusable `Card` component receives title, description and image through props.
- All cards are rendered using `.map()`.
- Cards have a gradient border as required.
- Responsive layout for desktop, tablet and mobile.

## How to run
1. Open the folder in VS Code.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open the local Vite URL in the browser.

## Decisions
The implementation keeps the task simple by using one reusable Card component and passing only the required data as props. The six cards are generated from a single array to demonstrate reusable React components.
