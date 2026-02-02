'use client'
import { MiniKit, VerificationLevel } from '@worldcoin/minikit-js'
import { useState } from 'react'

export default function Home() {
  const [status, setStatus] = useState("A wild Pokémon appeared!")

  const handleCatch = async () => {
    // 1. Game Logic: 50% chance to catch
    const isCaught = Math.random() > 0.5
    
    if (!isCaught) {
      setStatus("Oh no! The Pokémon fled. Try again!")
      return
    }

    setStatus("You caught it! Verify to claim your Pokécoin...")

    // 2. World ID Logic: Prove you are a human to get the coin
    if (!MiniKit.isInstalled()) {
      setStatus("Please open this in the World App")
      return
    }

    const { finalPayload } = await MiniKit.commandsAsync.verify({
      action: process.env.NEXT_PUBLIC_ACTION!, 
      signal: "",
      verification_level: VerificationLevel.Orb,
    })

    if (finalPayload.status === 'success') {
      setStatus("GOTCHA! 1 Pokécoin added to your bag! 🪙")
    } else {
      setStatus("Verification failed. Try again!")
    }
  }

  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '20px', backgroundColor: '#f0f0f0', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#333' }}>Daily Pokécoin</h1>
      <div style={{ fontSize: '50px' }}>📦</div>
      <p style={{ fontWeight: 'bold', color: '#555' }}>{status}</p>
      
      <button 
        onClick={handleCatch}
        style={{ backgroundColor: '#ff1f1f', color: 'white', padding: '15px 30px', border: 'none', borderRadius: '50px', fontSize: '20px', cursor: 'pointer', boxShadow: '0 4px #990000' }}
      >
        THROW POKÉBALL
      </button>
    </main>
  )
}