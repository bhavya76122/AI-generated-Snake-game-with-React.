/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { Terminal } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#00ffff] font-sans selection:bg-[#ff00ff] selection:text-[#050505] overflow-hidden relative crt-flicker">
      {/* Overlays */}
      <div className="scanlines" />
      <div className="static-noise" />

      <main className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col screen-tear">
        {/* Header */}
        <header className="flex flex-col items-center justify-center gap-2 mb-12 border-b-4 border-[#ff00ff] pb-4">
          <div className="flex items-center gap-4">
            <Terminal className="w-12 h-12 text-[#ff00ff]" />
            <h1 className="text-5xl md:text-7xl font-mono font-black tracking-tighter uppercase glitch" data-text="SYS.OP.SNAKE">
              SYS.OP.SNAKE
            </h1>
          </div>
          <p className="text-[#00ffff] text-xl tracking-[0.3em] uppercase">
            [ NEURAL_LINK_ESTABLISHED ]
          </p>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col xl:flex-row items-start justify-center gap-12 xl:gap-24 w-full max-w-7xl mx-auto">
          {/* Game Container */}
          <div className="w-full xl:w-2/3 flex-shrink-0 flex justify-center">
            <SnakeGame />
          </div>

          {/* Music Player Container */}
          <div className="w-full xl:w-1/3 flex-shrink-0 flex flex-col items-center xl:items-start">
            <div className="mb-4 w-full border-b-2 border-[#00ffff] pb-2">
              <h2 className="text-3xl font-mono font-bold text-[#ff00ff] uppercase glitch" data-text="AUDIO_UPLINK">
                AUDIO_UPLINK
              </h2>
              <p className="text-[#00ffff] font-sans text-lg mt-1 uppercase">
                &gt; DECRYPTING_AUDIO_STREAM...
              </p>
            </div>
            <MusicPlayer />
          </div>
        </div>
      </main>
    </div>
  );
}
