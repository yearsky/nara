'use client';

import { useEffect, useRef } from 'react';

interface AudioWaveformProps {
  /**
   * Array of audio data values (0-255)
   */
  audioData: Uint8Array;
  /**
   * Width of the canvas
   */
  width?: number;
  /**
   * Height of the canvas
   */
  height?: number;
  /**
   * Color of the waveform
   */
  color?: string;
  /**
   * Background color
   */
  backgroundColor?: string;
  /**
   * Whether to show bars or smooth line
   */
  type?: 'bars' | 'line';
  /**
   * Number of bars to display (only for bars type)
   */
  barCount?: number;
}

export default function AudioWaveform({
  audioData,
  width = 300,
  height = 80,
  color = '#EA580C',
  backgroundColor = 'transparent',
  type = 'bars',
  barCount = 50,
}: AudioWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    if (audioData.length === 0) {
      // Show flat line when no data
      drawFlatLine(ctx, width, height, color);
      return;
    }

    if (type === 'bars') {
      drawBars(ctx, audioData, width, height, color, barCount);
    } else {
      drawLine(ctx, audioData, width, height, color);
    }
  }, [audioData, width, height, color, backgroundColor, type, barCount]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="rounded-lg"
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
}

/**
 * Draw vertical bars waveform
 */
function drawBars(
  ctx: CanvasRenderingContext2D,
  audioData: Uint8Array,
  width: number,
  height: number,
  color: string,
  barCount: number
) {
  const barWidth = width / barCount;
  const gap = barWidth * 0.2; // 20% gap between bars
  const actualBarWidth = barWidth - gap;

  // Sample the audio data to match bar count
  const step = Math.floor(audioData.length / barCount);

  for (let i = 0; i < barCount; i++) {
    const dataIndex = i * step;
    const value = audioData[dataIndex] || 0;

    // Normalize value to height (with minimum height)
    const barHeight = Math.max(4, (value / 255) * height);

    // Center the bars vertically
    const x = i * barWidth;
    const y = (height - barHeight) / 2;

    // Create gradient for each bar
    const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, adjustColorOpacity(color, 0.6));

    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, actualBarWidth, barHeight);
  }
}

/**
 * Draw smooth line waveform
 */
function drawLine(
  ctx: CanvasRenderingContext2D,
  audioData: Uint8Array,
  width: number,
  height: number,
  color: string
) {
  const sliceWidth = width / audioData.length;
  let x = 0;

  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.beginPath();

  for (let i = 0; i < audioData.length; i++) {
    const value = audioData[i] / 255.0;
    const y = (height / 2) + ((value - 0.5) * height);

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  ctx.stroke();
}

/**
 * Draw flat line when no audio data
 */
function drawFlatLine(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  color: string
) {
  ctx.strokeStyle = adjustColorOpacity(color, 0.3);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();
}

/**
 * Adjust color opacity
 */
function adjustColorOpacity(color: string, opacity: number): string {
  // Simple implementation - assumes hex color
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
}
