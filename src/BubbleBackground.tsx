import React, { useEffect, useRef } from 'react';
import './BubbleBackground.css';

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
      const numBubbles = 8; // Number of bubbles

      for (let i = 0; i < numBubbles; i++) {
        bubbles.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 120 + 80, // 80-200px
          speedX: (Math.random() - 0.5) * 0.5, // -0.25 to 0.25
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.3 + 0.1 // 0.1 to 0.4
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
        if (bubble.x - bubble.size / 2 <= 0 || bubble.x + bubble.size / 2 >= canvas.width) {
          bubble.speedX *= -1;
        }
        if (bubble.y - bubble.size / 2 <= 0 || bubble.y + bubble.size / 2 >= canvas.height) {
          bubble.speedY *= -1;
        }

        // Keep bubbles within bounds
        bubble.x = Math.max(bubble.size / 2, Math.min(canvas.width - bubble.size / 2, bubble.x));
        bubble.y = Math.max(bubble.size / 2, Math.min(canvas.height - bubble.size / 2, bubble.y));

        // Draw bubble
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(128, 128, 128, ${bubble.opacity})`;
        ctx.fill();

        // Add subtle gradient effect
        const gradient = ctx.createRadialGradient(
          bubble.x - bubble.size / 4, 
          bubble.y - bubble.size / 4, 
          0,
          bubble.x, 
          bubble.y, 
          bubble.size / 2
        );
        gradient.addColorStop(0, `rgba(180, 180, 180, ${bubble.opacity * 0.8})`);
        gradient.addColorStop(1, `rgba(80, 80, 80, ${bubble.opacity * 0.3})`);
        
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
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
      className="bubble-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1
      }}
    />
  );
}

export default BubbleBackground; 