'use client'
import { MiniKit, VerificationLevel } from '@worldcoin/minikit-js'
import { useState, useEffect } from 'react'

export default function Home() {
  const [status, setStatus] = useState("A wild Pokémon appeared!")
  const [pokemonId, setPokemonId] = useState(1)

  // Picks a new Pokémon every time the page loads
  useEffect(() => {
    setPokemonId(Math.floor(Math.random() * 151) + 1)
  }, [])

  const handleCatch = async () => {
    const isCaught = Math.random() > 0.5
    if (!isCaught) {
      setStatus("Oh no! The Pokémon fled. Try again!")
      return
    }

    setStatus("You caught it! Verify to claim your Pokécoin...")

    if (!MiniKit.isInstalled()) {
      setStatus("Please open this in the World App")
      return
    }

    await MiniKit.commandsAsync.verify({
      action: process.env.NEXT_PUBLIC_ACTION!,
      signal: "",
      verification_level: VerificationLevel.Orb,
    })
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Daily Pokécoin</h1>
      
      {/* Dynamic Pokémon Image */}
      <img 
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
        alt="Wild Pokémon"
        className="w-48 h-48 mb-4"
      />

      <p className="mb-6 text-center font-medium">{status}</p>

      <button 
        onClick={handleCatch}
        className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors"
      >
        THROW POKÉBALL
      </button>
    </main>
  )
}