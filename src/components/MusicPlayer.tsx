import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Radio } from 'lucide-react';

const TRACKS = [
  {
    id: 1,
    title: 'ERR_0x1A: NEON_DREAMS',
    artist: 'CYBER_SYNTH_V1',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: '6:12'
  },
  {
    id: 2,
    title: 'NULL_PTR: DIGITAL_HORIZON',
    artist: 'NEURAL_NET_V2',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: '7:05'
  },
  {
    id: 3,
    title: 'SYS_REQ: QUANTUM_PULSE',
    artist: 'ALGO_RHYTHM_V3',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: '5:44'
  }
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(console.error);
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleTrackEnd = () => {
    nextTrack();
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const percentage = x / bounds.width;
      audioRef.current.currentTime = percentage * audioRef.current.duration;
      setProgress(percentage * 100);
    }
  };

  return (
    <div className="w-full jarring-border-alt bg-[#050505] p-6 font-mono">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
      />
      
      <div className="flex items-start gap-4 mb-8">
        <div className="w-16 h-16 bg-[#ff00ff] flex items-center justify-center border-2 border-[#00ffff]">
          <Radio className="w-8 h-8 text-[#050505] animate-pulse" />
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="text-[#00ffff] font-bold text-xl truncate uppercase glitch" data-text={currentTrack.title}>
            {currentTrack.title}
          </h3>
          <p className="text-[#ff00ff] text-lg truncate uppercase mt-1">
            &gt; SRC: {currentTrack.artist}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div 
        className="h-4 bg-[#050505] border-2 border-[#00ffff] mb-8 cursor-pointer relative"
        onClick={handleProgressClick}
      >
        <div 
          className="h-full bg-[#ff00ff] transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
        {/* Decorative markers */}
        <div className="absolute top-0 bottom-0 left-1/4 w-0.5 bg-[#050505] opacity-50" />
        <div className="absolute top-0 bottom-0 left-2/4 w-0.5 bg-[#050505] opacity-50" />
        <div className="absolute top-0 bottom-0 left-3/4 w-0.5 bg-[#050505] opacity-50" />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between border-t-2 border-[#ff00ff] pt-6">
        <div className="flex items-center gap-2">
          <button onClick={() => setIsMuted(!isMuted)} className="text-[#00ffff] hover:text-[#ff00ff] transition-none">
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              setIsMuted(false);
            }}
            className="w-24 accent-[#ff00ff] bg-[#050505] border border-[#00ffff] h-2 appearance-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={prevTrack}
            className="p-2 text-[#ff00ff] border-2 border-transparent hover:border-[#00ffff] hover:bg-[#00ffff] hover:text-[#050505] transition-none"
          >
            <SkipBack className="w-6 h-6" />
          </button>
          
          <button 
            onClick={togglePlay}
            className="p-3 bg-[#00ffff] text-[#050505] border-2 border-[#ff00ff] hover:bg-[#ff00ff] hover:border-[#00ffff] transition-none"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8" />
            )}
          </button>
          
          <button 
            onClick={nextTrack}
            className="p-2 text-[#ff00ff] border-2 border-transparent hover:border-[#00ffff] hover:bg-[#00ffff] hover:text-[#050505] transition-none"
          >
            <SkipForward className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
