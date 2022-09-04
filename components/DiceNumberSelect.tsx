export default function DiceNumberSelect({ label, value, onChange }) {
  function decrement() {
    if (value > 1) {
      onChange(value - 1)
    }
  }

  function increment() {
    onChange(value + 1)
  }

  return (
    <>
      <label htmlFor={label}>{label}</label>
      <div className="flex items-center text-xl">
        <button onClick={decrement} className="text-lg">
          -
        </button>
        <input
          id={label}
          type="number"
          min="1"
          className="appearance-none w-24 text-center"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <button onClick={increment} className="n">
          +
        </button>
      </div>
    </>
  )
}
