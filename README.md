# Experience rating

This web app is for make ratings of different areas and topics, based on the data from the list in globals.ts.

There are 3 modes available:

1. Individual rating on each topic
2. Add rating multiple times, and an average of the previously added ratings will be calculated on each topic
3. Show the total average results of each area (calculation based on all the added scores on topics in previous step)

## Tech stack

- **React** - a beloved js framework
- **TypeScript** - for robust code and proper type safety
- **Vite** - for bundling and running a dev server
- **chart.js** - a modern charting library
- **react-chartjs-2** - providing React components for Chart.js

## Development

Install dependencies:

```sh
npm i
```

Run the dev server with Vite (supporting HMR):

```sh
npm start
```

The web app is set up with a GitHub workflow (action) and automatically deployed to **Vercel** when changes are pushed to the `main` branch in GitHub.
