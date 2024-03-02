# byu-lol-spinner

The [BYU LoL Spinner](https://byu-lol-spinner.vercel.app/) website facilitates role selection for League of Legends in-house custom games.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## How To Use It

1. First, add players to the player list using the input provided in sidebar to the right.
2. When all players are present in the player list, use the Spin button to randomly choose a player from the list.
3. The chosen player will then need to select a role by clicking on the corresponding role's icon.
4. Repeat this process for all players until there are either no players left or both teams are completely filled.

## Helpful Tips

- You can add as many players to the list as you want. This is helpful in cases where you have more than 10 players that want to play in a given game.
- To unselect a player from a role, click their name to choose the player and select their role as in step 3.
- You can swap two players in the same role by clicking the Swap button.
- Once you are satisfied with your teams, you can copy the team assignments to your clipboard by clicking the Copy button.

### Copy Example

```
Top: Blue Top - Red Top
Jungle: Blue Jungle - Red Jungle
Mid: Blue Mid - Red Mid
Bot: Blue Bot - Red Bot
Support: Blue Support - Red Support
```

## How It Works

The Spinner is built using the [Next.js](https://nextjs.org/) framework.

The user interface utilizes [Material Base UI](https://mui.com/base-ui/getting-started/) library components using [Tailwind CSS](https://tailwindcss.com/docs/installation) for styling.

To make things easy, the Spinner uses [Vercel](https://vercel.com/) to deploy the application to the [website](https://byu-lol-spinner.vercel.app/). There's a lot of [DevOps magic](https://vercel.com/blog/what-is-vercel) happening under the hood here that we're not going to get into here, but it's cool stuff that I highly recommend looking into if you're so inclined.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
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
