import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div>
        <p class="p-6">Welcome to my page!</p>
      </div>

      <div className="relative flex place-items-center border rounded-lg p-4 border-black">
        <div class="max-w-screen-lg mx-auto flex items-center">
          <div class="mr-8">
            <h1 class="text-4xl font-bold mb-4">Dexter Balino</h1>
            <h2 class="text-xl font-medium text-gray-600">Software Developer</h2>
          </div>
          <div>
            <img src="dexter.jpg" alt="dex<3" class="w-36 h-auto rounded-full"></img>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-medium p-12">Projects</h2>
      </div>

      <div class="flex justify-center space-x-6">

        <Link href={`/headsortails`}>
          <div class="border rounded-lg p-9 border-black flex flex-col items-center hover:bg-gray-500">
            <img src="coin.jpg" class="w-40 h-auto rounded-lg"></img>
            <p>Heads or Tails Game</p>
          </div>
        </Link>

        <Link href={`/fact-generator`}>
          <div class="border rounded-lg p-9 border-black flex flex-col items-center hover:bg-gray-500">
            <img src="Wikipedia-logo-v2.svg" class="w-40 h-auto rounded-lg"></img>
            <p>Fact Generator</p>
          </div>
        </Link>

      </div>
    </main>
  );
}
