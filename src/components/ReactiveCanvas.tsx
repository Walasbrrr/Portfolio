import { useEffect, useRef } from "react";

/**
 * ReactiveCanvas (Layer 0):
 * High-performance 2D dot-matrix grid with mouse proximity illumination,
 * elastic magnetic distortion, and smooth radial aura.
 */
export default function ReactiveCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;
        let dpr = 1;

        // Pointer state with smooth lerping
        const pointer = {
            targetX: -9999,
            targetY: -9999,
            x: -9999,
            y: -9999,
            active: false,
        };

        const SPACING = 32;
        const RADIUS = 180;
        const RADIUS_SQ = RADIUS * RADIUS;

        const reduceMotion =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        function resize() {
            if (!canvas || !ctx) return;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);
        }

        resize();
        window.addEventListener("resize", resize, { passive: true });

        const handlePointerMove = (e: MouseEvent | TouchEvent) => {
            pointer.active = true;
            if ("touches" in e && e.touches.length > 0) {
                pointer.targetX = e.touches[0].clientX;
                pointer.targetY = e.touches[0].clientY;
            } else if ("clientX" in e) {
                pointer.targetX = e.clientX;
                pointer.targetY = e.clientY;
            }
        };

        const handlePointerLeave = () => {
            pointer.active = false;
        };

        window.addEventListener("mousemove", handlePointerMove, { passive: true });
        window.addEventListener("touchstart", handlePointerMove, { passive: true });
        window.addEventListener("touchmove", handlePointerMove, { passive: true });
        document.addEventListener("mouseleave", handlePointerLeave);

        let lastTime = performance.now();

        function render(now: number) {
            if (!ctx) return;
            const dt = Math.min((now - lastTime) / 1000, 0.1);
            lastTime = now;

            // Smooth pointer lerp
            if (pointer.active) {
                pointer.x += (pointer.targetX - pointer.x) * Math.min(dt * 12, 1);
                pointer.y += (pointer.targetY - pointer.y) * Math.min(dt * 12, 1);
            } else {
                pointer.x += (-9999 - pointer.x) * Math.min(dt * 4, 1);
                pointer.y += (-9999 - pointer.y) * Math.min(dt * 4, 1);
            }

            ctx.clearRect(0, 0, width, height);

            const startX = Math.floor(0 / SPACING) * SPACING;
            const startY = Math.floor(0 / SPACING) * SPACING;

            for (let x = startX; x <= width + SPACING; x += SPACING) {
                for (let y = startY; y <= height + SPACING; y += SPACING) {
                    const dx = pointer.x - x;
                    const dy = pointer.y - y;
                    const distSq = dx * dx + dy * dy;

                    let px = x;
                    let py = y;
                    let dotAlpha = 0.05;
                    let dotRadius = 1.0;

                    if (pointer.active && distSq < RADIUS_SQ) {
                        const dist = Math.sqrt(distSq);
                        const factor = 1 - dist / RADIUS; // 0..1
                        // Subtle displacement
                        const push = factor * 4;
                        px -= (dx / (dist || 1)) * push;
                        py -= (dy / (dist || 1)) * push;

                        dotAlpha = 0.05 + factor * 0.28;
                        dotRadius = 1.0 + factor * 1.2;

                        ctx.fillStyle = `rgba(255, 255, 255, ${dotAlpha})`;
                    } else {
                        ctx.fillStyle = `rgba(255, 255, 255, ${dotAlpha})`;
                    }

                    ctx.beginPath();
                    ctx.arc(px, py, dotRadius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            if (!reduceMotion) {
                animationFrameId = requestAnimationFrame(render);
            }
        }

        if (reduceMotion) {
            // Static single draw
            pointer.active = false;
            render(performance.now());
        } else {
            animationFrameId = requestAnimationFrame(render);
        }

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handlePointerMove);
            window.removeEventListener("touchstart", handlePointerMove);
            window.removeEventListener("touchmove", handlePointerMove);
            document.removeEventListener("mouseleave", handlePointerLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70 transition-opacity duration-700"
        />
    );
}
