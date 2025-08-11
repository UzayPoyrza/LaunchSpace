import React, { useRef, useEffect } from 'react';

function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // iOS optimization settings
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.autoplay = true;
    
    // Set video properties for better iOS performance
    video.style.objectFit = 'cover';
    video.style.objectPosition = 'center';
    
    // Handle video loading
    const handleLoadedData = () => {
      video.play().catch(error => {
        console.log('Video autoplay failed:', error);
        // Fallback: try to play on user interaction
        const playOnInteraction = () => {
          video.play().catch(() => {});
          document.removeEventListener('touchstart', playOnInteraction);
          document.removeEventListener('click', playOnInteraction);
        };
        document.addEventListener('touchstart', playOnInteraction);
        document.addEventListener('click', playOnInteraction);
      });
    };

    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden'
    }}>
      <video
        ref={videoRef}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center'
        }}
        muted
        playsInline
        loop
        autoPlay
      >
        {/* You can add your video file here */}
        <source src="/videos/background.mp4" type="video/mp4" />
        <source src="/videos/background.webm" type="video/webm" />
        {/* Fallback: if video fails to load, show a gradient background */}
      </video>
      
      {/* Fallback gradient overlay in case video doesn't load */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(45deg, rgba(0,0,0,0.3), rgba(20,20,20,0.2))',
        pointerEvents: 'none'
      }} />
    </div>
  );
}

export default VideoBackground; 