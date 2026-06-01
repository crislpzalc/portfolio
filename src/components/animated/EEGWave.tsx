"use client";

import { useEffect, useRef } from "react";

interface Spike {
  virtualX: number;
  startTime: number;
  amplitude: number;
}

export default function EEGWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let nextSpikeTime = performance.now() + 3000 + Math.random() * 4000;
    const spikes: Spike[] = [];
    const dims = { w: 0, h: 0, dpr: 1 };

    const scrollSpeed = 40;
    const spikeDuration = 1200;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      dims.w = width;
      dims.h = height;
      dims.dpr = dpr;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const waveY = (vx: number): number =>
      Math.sin(vx * 0.012) * 22 +
      Math.sin(vx * 0.007 + 1.5) * 28 +
      Math.sin(vx * 0.022 + 3.0) * 12 +
      Math.sin(vx * 0.003 + 0.7) * 18 +
      Math.sin(vx * 0.035 + 2.1) * 7;

    const spikeContribution = (
      vx: number,
      spike: Spike,
      now: number
    ): number => {
      const dist = Math.abs(vx - spike.virtualX);
      if (dist > 80) return 0;
      const progress = (now - spike.startTime) / spikeDuration;
      const fade =
        progress < 0.15
          ? progress / 0.15
          : Math.max(0, 1 - (progress - 0.15) / 0.85);
      const spatial = Math.exp(-(dist * dist) / 500);
      return spike.amplitude * fade * spatial;
    };

    const layers = [
      { scale: 1.0, opacity: 0.18, width: 1.8 },
      { scale: 0.6, opacity: 0.1, width: 1.2 },
      { scale: 0.35, opacity: 0.06, width: 0.8 },
    ];

    const animate = (time: number) => {
      const { w, h, dpr } = dims;
      const now = performance.now();
      const offset = (time * scrollSpeed) / 1000;
      const centerY = h * 0.5;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      if (now >= nextSpikeTime) {
        spikes.push({
          virtualX: offset + w * (0.3 + Math.random() * 0.4),
          startTime: now,
          amplitude: 35 + Math.random() * 30,
        });
        nextSpikeTime = now + 3000 + Math.random() * 4000;
      }

      for (let i = spikes.length - 1; i >= 0; i--) {
        if (now - spikes[i].startTime > spikeDuration) spikes.splice(i, 1);
      }

      for (const layer of layers) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(232, 180, 188, ${layer.opacity})`;
        ctx.lineWidth = layer.width;
        ctx.lineJoin = "round";

        const step = 2;
        for (let px = 0; px <= w; px += step) {
          const vx = px + offset;
          let y = centerY + waveY(vx) * layer.scale;

          for (const spike of spikes) {
            y -= spikeContribution(vx, spike, now) * layer.scale;
          }

          if (px === 0) ctx.moveTo(px, y);
          else ctx.lineTo(px, y);
        }

        ctx.stroke();
      }

      for (const spike of spikes) {
        const screenX = spike.virtualX - offset;
        if (screenX < -120 || screenX > w + 120) continue;

        const progress = (now - spike.startTime) / spikeDuration;
        const fade =
          progress < 0.15
            ? progress / 0.15
            : Math.max(0, 1 - (progress - 0.15) / 0.85);

        const gradient = ctx.createRadialGradient(
          screenX,
          centerY,
          0,
          screenX,
          centerY,
          100
        );
        gradient.addColorStop(0, `rgba(200, 182, 226, ${0.2 * fade})`);
        gradient.addColorStop(1, "rgba(200, 182, 226, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(screenX - 100, centerY - 100, 200, 200);
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
