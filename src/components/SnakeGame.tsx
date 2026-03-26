import React, { useEffect, useRef } from 'react';
import { useSnakeGame } from '../hooks/useSnakeGame';

export const SnakeGame: React.FC = () => {
  const {
    snake,
    food,
    score,
    gameOver,
    isPaused,
    gridSize,
    resetGame,
    setIsPaused,
  } = useSnakeGame();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = canvas.width / gridSize;

    // Clear canvas
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines (harsh magenta)
    ctx.strokeStyle = '#ff00ff33';
    ctx.lineWidth = 1;
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    // Draw food (Magenta block)
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);

    // Draw snake (Cyan blocks)
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#ffffff' : '#00ffff';
      ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
      
      // Add a harsh inner border to snake segments
      ctx.strokeStyle = '#050505';
      ctx.lineWidth = 2;
      ctx.strokeRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
    });

  }, [snake, food, gridSize]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl">
      <div className="flex justify-between w-full mb-4 items-end border-b-4 border-[#00ffff] pb-2">
        <div className="text-3xl font-mono text-[#00ffff] uppercase">
          DATA_EXTRACTED: <span className="text-[#ff00ff]">{score.toString().padStart(4, '0')}</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="px-4 py-1 bg-[#050505] text-[#00ffff] border-2 border-[#00ffff] font-mono uppercase hover:bg-[#00ffff] hover:text-[#050505] transition-none"
          >
            {isPaused ? '[ RESUME ]' : '[ HALT ]'}
          </button>
          <button
            onClick={resetGame}
            className="px-4 py-1 bg-[#050505] text-[#ff00ff] border-2 border-[#ff00ff] font-mono uppercase hover:bg-[#ff00ff] hover:text-[#050505] transition-none"
          >
            [ PURGE ]
          </button>
        </div>
      </div>

      <div className="relative jarring-border bg-[#050505] w-full aspect-square max-w-[500px]">
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          className="block w-full h-full"
        />

        {gameOver && (
          <div className="absolute inset-0 bg-[#050505]/90 flex flex-col items-center justify-center z-10">
            <h2 className="text-5xl font-mono font-bold text-[#ff00ff] mb-4 uppercase glitch" data-text="SYSTEM_FAILURE">
              SYSTEM_FAILURE
            </h2>
            <p className="text-2xl text-[#00ffff] mb-8 font-mono uppercase">
              &gt; FINAL_YIELD: {score}
            </p>
            <button
              onClick={resetGame}
              className="px-8 py-4 bg-[#ff00ff] text-[#050505] border-4 border-[#00ffff] font-mono text-2xl uppercase hover:bg-[#00ffff] hover:text-[#050505] hover:border-[#ff00ff] transition-none"
            >
              [ REBOOT_SEQUENCE ]
            </button>
          </div>
        )}

        {isPaused && !gameOver && (
          <div className="absolute inset-0 bg-[#00ffff]/20 flex items-center justify-center z-10">
            <div className="bg-[#050505] border-4 border-[#ff00ff] p-6">
              <h2 className="text-4xl font-mono font-bold text-[#00ffff] uppercase glitch" data-text="SEQUENCE_HALTED">
                SEQUENCE_HALTED
              </h2>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6 text-[#ff00ff] font-mono text-lg text-center uppercase bg-[#050505] border-2 border-[#ff00ff] p-4 w-full max-w-[500px]">
        &gt; INPUT_REQ: <span className="text-[#00ffff]">W A S D</span> || <span className="text-[#00ffff]">ARROWS</span><br/>
        &gt; INTERRUPT: <span className="text-[#00ffff]">SPACE</span>
      </div>
    </div>
  );
};
