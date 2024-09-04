export const Button = ({
  type,
  onClick,
}: {
  type: string
  onClick: () => void
}) => {
  return (
    <div>
      <button onClick={onClick} className="border border-slate-400 w-40 h-20">
        {type}
      </button>
    </div>
  )
}
