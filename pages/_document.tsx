import { Html, Head, Main, NextScript } from "next/document"

const description =
  "Roll your dice and see your fellow players’ rolls in this dice roller app for Neon City Overdrive, a tabletop roleplaying game by Peril Planet."

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* eslint-disable-next-line */}
        <title>NCO Dice Roller</title>
        <meta name="description" content={description} />
        <meta property="og:title" content="NCO Dice Roller" />
        <meta property="og:image" content="https://i.postimg.cc/HnzbyqjD/307995.jpg" />
        <meta property="og:description" content={description} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
