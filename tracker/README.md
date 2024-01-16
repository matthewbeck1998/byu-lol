# byu-lol-tracker

The [BYU LoL Tracker](https://byu-lol-tracker.vercel.app/) website tracks BYU LoL player rankings over time in a chart format. The Tracker uses the History spreadsheet as its data source.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## How It Works

The Tracker is built using the [Next.js](https://nextjs.org/) framework. The frontend utilizes the [Highcharts](https://www.highcharts.com/) library to create the actual chart. The backend utilizes the [Google Sheets API](https://developers.google.com/sheets/api/guides/concepts) to fetch data from the History spreadsheet.

1. The frontend (`app/page.tsx`) will fetch data from our Next.js backend using a `GET /api` request.

2. Our Next.js backend (`app/api/route.ts`) will use the Google Sheets API to fetch data from the History spreadsheet. It will first call `getSheetDates()` to determine what dates have data associated with them (i.e. all of the different sheet names).

3. `getSheetDates()` will then, for each date found, call `getRowsWithDate()` to query the spreadsheet and fetch data for all sheet rows associated with that date. All of those row objects will then be augmented with its associated date.

4. Using the augmented row objects in step 3, the backend will then aggregate summoner information and group data for each summoner by name. The aggregated summoner data will then be sent back to the frontend.

5. The frontend will transform the aggregated summoner data into lines and points for each summoner to be plotted on the chart.

6. Finally, the transformed lines and plots can be passed into the [Highcharts React](https://github.com/highcharts/highcharts-react) library to create a lovely chart.

7. To make things easy, the Tracker uses [Vercel](https://vercel.com/) to deploy the application to the [website](https://byu-lol-tracker.vercel.app/). There's a lot of [DevOps magic](https://vercel.com/blog/what-is-vercel) happening under the hood here that we're not going to get into here, but it's cool stuff that I highly recommend looking into if you're so inclined.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
