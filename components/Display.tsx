export const Display = ({ name }: { name: string }) => {
  return (
    <div className="border border-slate-400 w-40 h-20">
      <div className="flex justify-center h-full items-center">{name}</div>
    </div>
  )
}
