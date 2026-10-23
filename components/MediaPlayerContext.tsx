"use client";
import { createContext, useContext, useState, useRef, useEffect } from "react";

interface AudioInfo {
  audio_url: string;
  title?: string;
  artist?: string;
  cover_image?: string;
}

interface MediaItem {
  audio_info: AudioInfo;
}

interface MediaPlayerContextValue {
  mediaItem: MediaItem | null;
  setMediaItem: (item: MediaItem | null) => void;
  previousMediaItem: MediaItem | null;
  setPreviousMediaItem: (item: MediaItem | null) => void;
  nextMediaItem: MediaItem | null;
  setNextMediaItem: (item: MediaItem | null) => void;
}

const MediaPlayerContext = createContext<MediaPlayerContextValue>({
  mediaItem: null,
  setMediaItem: () => {},
  previousMediaItem: null,
  setPreviousMediaItem: () => {},
  nextMediaItem: null,
  setNextMediaItem: () => {},
});

export function MediaPlayerProvider({ children }: { children: React.ReactNode }) {
  const [mediaItem, setMediaItem] = useState<MediaItem | null>(null);
  const [previousMediaItem, setPreviousMediaItem] = useState<MediaItem | null>(null);
  const [nextMediaItem, setNextMediaItem] = useState<MediaItem | null>(null);

  return (
    <MediaPlayerContext.Provider
      value={{
        mediaItem,
        setMediaItem,
        previousMediaItem,
        setPreviousMediaItem,
        nextMediaItem,
        setNextMediaItem,
      }}
    >
      {children}
      <PersistentMediaPlayer />
    </MediaPlayerContext.Provider>
  );
}

export function useMediaPlayer() {
  return useContext(MediaPlayerContext);
}

function PersistentMediaPlayer() {
  const { mediaItem, setMediaItem, previousMediaItem, nextMediaItem, setNextMediaItem, setPreviousMediaItem } =
    useMediaPlayer();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (mediaItem?.audio_info.audio_url && audioRef.current) {
      audioRef.current.src = mediaItem.audio_info.audio_url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [mediaItem]);

  if (!mediaItem?.audio_info?.audio_url) return null;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const seek = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-4 bg-[#F8E9EA] px-4 py-3 shadow-lg">
      <audio
        ref={audioRef}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={() => {
          setIsPlaying(false);
          if (nextMediaItem) {
            setPreviousMediaItem(mediaItem);
            setMediaItem(nextMediaItem);
            setNextMediaItem(null);
          }
        }}
      />
      {mediaItem.audio_info.cover_image && (
        <img
          src={mediaItem.audio_info.cover_image}
          alt="cover"
          className="h-12 w-12 rounded object-cover"
        />
      )}
      <div className="flex flex-1 flex-col">
        <span className="text-sm font-semibold text-gray-800 line-clamp-1">
          {mediaItem.audio_info.title ?? "Now Playing"}
        </span>
        {mediaItem.audio_info.artist && (
          <span className="text-xs text-gray-500">{mediaItem.audio_info.artist}</span>
        )}
        <div className="mt-1 h-1 w-full rounded bg-gray-300">
          <div
            className="h-1 rounded bg-cciRed"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => seek(-10)}
          className="rounded-full p-1 hover:bg-gray-200"
          aria-label="Rewind 10s"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
            <text x="9" y="17" fontSize="6" fontWeight="bold">10</text>
          </svg>
        </button>
        <button
          onClick={togglePlay}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-cciRed text-white hover:bg-burnt-red"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button
          onClick={() => seek(10)}
          className="rounded-full p-1 hover:bg-gray-200"
          aria-label="Forward 10s"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 13c0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6v4l5-5-5-5v4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8h-2z" />
            <text x="9" y="17" fontSize="6" fontWeight="bold">10</text>
          </svg>
        </button>
        <button
          onClick={() => setMediaItem(null)}
          className="rounded-full p-1 hover:bg-gray-200"
          aria-label="Close player"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
