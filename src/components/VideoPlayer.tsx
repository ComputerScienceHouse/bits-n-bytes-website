import { useRef, useState, useEffect } from "react";
import video from "../assets/video.mp4";

export default function VideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const vid = videoRef.current;
    const container = containerRef.current;
    if (!vid || !container) return;

    // only play video if more than half is on screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // catch if video isn't loaded yet
          vid.play().catch(() => {});
        } else {
          container.style.filter = 'blur(40px);';
          vid.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const updateProgress = () => {
      if (vid.duration) {
        setProgress((vid.currentTime / vid.duration) * 100);
      }
    };
    vid.addEventListener("timeupdate", updateProgress);
    return () => vid.removeEventListener("timeupdate", updateProgress);
  }, []);

  const handleRestart = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.currentTime = 0;
    vid.play().catch(() => {});
  };

  return (
    <div ref={containerRef} className="mt-10 mx-auto md:ml-36 w-80">
      <video
        ref={videoRef}
        className="w-80 rounded-lg border overflow-hidden"
        muted loop playsInline
      >
        <source src={video} type="video/mp4" />
      </video>

      <div className="mt-2 flex items-center gap-2">
        <button
          onClick={handleRestart}
          className="p-1.5 rounded-full border hover:bg-gray-100 transition"
          aria-label="Restart video"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 4v6h6" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
        </button>

        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-[width] duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}