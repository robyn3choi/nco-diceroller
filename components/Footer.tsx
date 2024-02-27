export default function Footer() {
  return (
    <div className="font-sans text-sm p-4 absolute bottom-0 text-center w-full">
      <p>
        This is an online dice roller for{" "}
        <a
          className="underline hover:text-lightblue"
          href="https://www.perilplanet.com/neon-city-overdrive/"
          target="_blank"
          rel="noreferrer"
        >
          Neon City Overdrive
        </a>
        , a tabletop roleplaying game by Nathan Russell.
      </p>
      <p className="mt-0.5">
        The design and dice roll logic are inspired by{" "}
        <a
          className="underline hover:text-lightblue"
          href="https://p-dimi.github.io/Neon-City-Overdrive-dice-thrower/"
          target="_blank"
          rel="noreferrer"
        >
          p-dimi’s dice roller
        </a>
        .
      </p>
      <p className="mt-0.5">
        Created by{" "}
        <a
          className="underline hover:text-lightblue"
          href="https://linktr.ee/bitbirdy"
          target="_blank"
          rel="noreferrer"
        >
          Robyn Choi
        </a>
      </p>
    </div>
  )
}
