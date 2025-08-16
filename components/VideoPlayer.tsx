import React, { useState, useRef, useEffect } from 'react';

type VideoSource = {
  src: string;
  type: string;
};

type VideoPlayerProps = {
  sources: VideoSource[];
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  alt?: string;
  fallbackMessage?: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  sources,
  poster,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
  alt = 'Video content',
  fallbackMessage = 'Failed to load video.',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasError) return;

    const tryPlay = () => {
      video.play().catch((err) => {
        console.warn("Autoplay blocked:", err);
        if (!controls) {
          video.controls = true;
        }
      });
    };

    video.addEventListener('loadeddata', tryPlay);

    return () => {
      video.removeEventListener('loadeddata', tryPlay);
    };
  }, [autoPlay, hasError, controls]);

  const handleVideoError = () => {
    setHasError(true);
  };

  const handleRetry = () => {
    setHasError(false);
    const video = videoRef.current;
    if (video) {
      video.load();
      if (autoPlay && muted) {
        video.play().catch(() => {});
      }
    }
  };

  if (!sources.length) {
    return <p className="text-red-500">No video sources provided.</p>;
  }

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {!hasError ? (
        <video
          ref={videoRef}
          poster={poster}
          autoPlay={autoPlay && muted}
          loop={loop}
          muted={muted}
          controls={controls}
          playsInline
          preload="auto"
          onError={handleVideoError}
          className="w-full h-auto object-cover"
          aria-label={alt}
        >
          {sources.map((source, index) => (
            <source key={index} src={source.src} type={source.type} />
          ))}
          <p className="text-white text-center p-4 bg-black">
            Your browser does not support video.
          </p>
        </video>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white p-6 text-center">
          <div>
            <p>{fallbackMessage}</p>
            <button
              onClick={handleRetry}
              className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;