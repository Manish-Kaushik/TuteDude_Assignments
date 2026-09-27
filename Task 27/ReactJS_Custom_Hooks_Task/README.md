# ReactJS Custom Hooks - useFetch

## Overview
A simple React application demonstrating a custom `useFetch` hook for fetching data from an API.

## Requirements covered
- Custom hook named `useFetch`.
- Accepts a URL parameter.
- Fetches API data using JavaScript `fetch`.
- Returns `data`, `loading`, and `error`.
- Displays fetched photo data in a responsive grid.
- Shows a loading message while the request is running.
- Shows an error message if the request fails.
- Uses AbortController to safely cancel the request when the component unmounts.

## How to run
1. Open the folder in VS Code.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open the Vite URL shown in the terminal.

## API used
JSONPlaceholder Photos API:
https://jsonplaceholder.typicode.com/photos?_limit=8

## Decisions
The implementation keeps the task simple by putting all API logic inside `useFetch.js`. The component only consumes the returned `data`, `loading`, and `error` values.
