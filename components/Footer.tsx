export default function Footer() {
  return (
    <div className="font-sans text-sm p-4 absolute bottom-0 text-center w-full">
      This is an online dice roller for{" "}
      <a
        className="underline hover:text-white"
        href="https://www.perilplanet.com/neon-city-overdrive/"
        target="_blank"
        rel="noreferrer"
      >
        Neon City Overdrive
      </a>
      , a tabletop roleplaying game by Nathan Russell. The design and dice roll logic are inspired by{" "}
      <a
        className="underline hover:text-white"
        href="https://p-dimi.github.io/Neon-City-Overdrive-dice-thrower/"
        target="_blank"
        rel="noreferrer"
      >
        p-dimi’s dice roller
      </a>
      .
    </div>
  )
}
