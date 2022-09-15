import clsx from "clsx"

export default function Die({ num, isGood }) {
  return (
    <div
      className={clsx(
        isGood && "bg-pink text-blue",
        "flex justify-center items-center text-[2.5rem] w-20 h-20 border-2 border-pink rounded-lg"
      )}
    >
      {num}
    </div>
  )
}
