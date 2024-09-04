import Image from "next/image"

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-zinc">
      <a href="/game">
        <button className="border border-black rounded w-40 h-20 bg-white">
          Play Game
        </button>
      </a>
    </div>
  )
}
