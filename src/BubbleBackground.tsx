import React, { useRef, useEffect } from 'react';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

function BubbleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create initial bubbles
    const createBubbles = () => {
      const bubbles: Bubble[] = [];
      const isMobile = window.innerWidth < 768;
      const numBubbles = isMobile ? 6 : 8; // 6 bubbles on mobile, 8 on desktop

      for (let i = 0; i < numBubbles; i++) {
        bubbles.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: isMobile ? 
            Math.random() * 60 + 40 : // 40-100px on mobile (smaller)
            Math.random() * 120 + 80, // 80-200px on desktop
          speedX: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5), // Slower on mobile
          speedY: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
          opacity: Math.random() * 0.2 + 0.1 // 0.1 to 0.3 (less opaque)
        });
      }
      return bubbles;
    };

    bubblesRef.current = createBubbles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubblesRef.current.forEach(bubble => {
        // Update position
        bubble.x += bubble.speedX;
        bubble.y += bubble.speedY;

        // Bounce off edges
        if (bubble.x <= 0 || bubble.x >= canvas.width) {
          bubble.speedX *= -1;
        }
        if (bubble.y <= 0 || bubble.y >= canvas.height) {
          bubble.speedY *= -1;
        }

        // Keep bubbles within bounds
        bubble.x = Math.max(0, Math.min(canvas.width, bubble.x));
        bubble.y = Math.max(0, Math.min(canvas.height, bubble.y));

        // Draw bubble
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
}

export default BubbleBackground;