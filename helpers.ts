import { uniqueNamesGenerator, colors, animals, NumberDictionary } from "unique-names-generator"

export const cyberpunkAdjectives = [
  "artificial",
  "cyber",
  "futuristic",
  "dystopian",
  "utopian",
  "hardcore",
  "neuro",
  "sharp",
  "augmented",
  "simulated",
  "machine",
  "decaying",
  "metal",
  "hacked",
  "replicant",
  "synthetic",
  "cybernetic",
  "urban",
  "retro",
  "techno",
  "cyborg",
  "electro",
  "rebellious",
  "revolutionary",
]

export function getRoomName() {
  const numberDictionary = NumberDictionary.generate({ min: 2050, max: 9999 })
  const config = {
    dictionaries: [colors, cyberpunkAdjectives, animals, numberDictionary],
    separator: "-",
  }
  return uniqueNamesGenerator(config)
}
