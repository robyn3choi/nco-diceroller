import clsx from "clsx"

export default function DiceNumberSelect({ label, value, isGood, onChange }) {
  function decrement() {
    const min = isGood ? 1 : 0
    if (value > min) {
      onChange(value - 1)
    }
  }

  function increment() {
    onChange(value + 1)
  }

  return (
    <div className="text-xl sm:text-2xl w-[198px]">
      <label htmlFor={label}>{label}</label>
      <div className="flex items-center justify-center">
        <button onClick={decrement} className="w-16 text-3xl p-4 hover:text-white">
          -
        </button>
        <input
          id={label}
          type="number"
          className={clsx(
            isGood ? "bg-pink text-darkblue" : "bg-transparent",
            "appearance-none w-16 text-center border-2 border-pink p-1"
          )}
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || "")}
        />
        <button onClick={increment} className="w-16 text-3xl p-4 hover:text-white">
          +
        </button>
      </div>
    </div>
  )
}
