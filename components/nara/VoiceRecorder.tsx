'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, StopCircle, X, Send, Loader2, AlertCircle } from 'lucide-react';
import { AudioRecorder, formatDuration } from '@/lib/audioRecorder';
import AudioWaveform from './AudioWaveform';

interface VoiceRecorderProps {
  /**
   * Callback when recording is complete and ready to send
   */
  onRecordingComplete?: (blob: Blob, duration: number) => void;
  /**
   * Callback when recording is cancelled
   */
  onCancel?: () => void;
  /**
   * Whether to show the recorder inline or as a modal
   */
  variant?: 'inline' | 'modal';
  /**
   * Custom class name
   */
  className?: string;
}

type RecordingState = 'idle' | 'requesting-permission' | 'recording' | 'stopped' | 'error';

export default function VoiceRecorder({
  onRecordingComplete,
  onCancel,
  variant = 'inline',
  className = '',
}: VoiceRecorderProps) {
  const [state, setState] = useState<RecordingState>('idle');
  const [duration, setDuration] = useState(0);
  const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(0));
  const [error, setError] = useState<string>('');
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

  const recorderRef = useRef<AudioRecorder | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const durationIntervalRef = useRef<number | null>(null);

  /**
   * Check if browser supports audio recording
   */
  const isSupported = AudioRecorder.isSupported();

  /**
   * Update audio visualization data
   */
  const updateVisualization = useCallback(() => {
    if (recorderRef.current && state === 'recording') {
      const data = recorderRef.current.getTimeDomainData();
      setAudioData(data);
      animationFrameRef.current = requestAnimationFrame(updateVisualization);
    }
  }, [state]);

  /**
   * Start recording
   */
  const startRecording = async () => {
    try {
      setState('requesting-permission');
      setError('');

      // Create new recorder instance
      const recorder = new AudioRecorder({
        onError: (err) => {
          setError(err.message);
          setState('error');
        },
      });

      // Initialize and start recording
      await recorder.initialize();
      recorder.startRecording();

      recorderRef.current = recorder;
      setState('recording');

      // Start duration timer
      durationIntervalRef.current = window.setInterval(() => {
        if (recorderRef.current) {
          setDuration(recorderRef.current.getDuration());
        }
      }, 100);

      // Start visualization
      updateVisualization();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start recording';
      setError(errorMessage);
      setState('error');
      console.error('Recording error:', err);
    }
  };

  /**
   * Stop recording
   */
  const stopRecording = async () => {
    if (!recorderRef.current) return;

    try {
      const blob = await recorderRef.current.stopRecording();
      setRecordedBlob(blob);
      setState('stopped');

      // Clear intervals and animations
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = null;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to stop recording';
      setError(errorMessage);
      setState('error');
      console.error('Stop recording error:', err);
    }
  };

  /**
   * Cancel recording
   */
  const cancelRecording = () => {
    cleanup();
    setState('idle');
    setDuration(0);
    setAudioData(new Uint8Array(0));
    setRecordedBlob(null);
    setError('');
    onCancel?.();
  };

  /**
   * Send recording
   */
  const sendRecording = () => {
    if (recordedBlob && onRecordingComplete) {
      onRecordingComplete(recordedBlob, duration);
      cleanup();
      setState('idle');
      setDuration(0);
      setAudioData(new Uint8Array(0));
      setRecordedBlob(null);
    }
  };

  /**
   * Cleanup resources
   */
  const cleanup = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }
    if (recorderRef.current) {
      recorderRef.current.destroy();
      recorderRef.current = null;
    }
  };

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  /**
   * Handle keyboard shortcuts
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state === 'recording' && e.key === 'Escape') {
        cancelRecording();
      } else if (state === 'stopped' && e.key === 'Enter') {
        sendRecording();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state, recordedBlob]);

  if (!isSupported) {
    return (
      <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg">
        <AlertCircle className="w-5 h-5" />
        <p className="text-sm">Browser Anda tidak mendukung perekaman audio.</p>
      </div>
    );
  }

  if (error && state === 'error') {
    return (
      <div className="flex flex-col gap-3 p-4 bg-red-50 text-red-600 rounded-lg">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm font-medium">Error: {error}</p>
        </div>
        <button
          onClick={() => {
            setState('idle');
            setError('');
          }}
          className="self-start px-4 py-2 bg-white border border-red-200 rounded-lg text-sm hover:bg-red-50 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  // Idle state - show mic button
  if (state === 'idle') {
    return (
      <button
        onClick={startRecording}
        className={`flex items-center justify-center gap-2 p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg ${className}`}
        title="Rekam suara (Klik untuk mulai)"
      >
        <Mic className="w-5 h-5" />
      </button>
    );
  }

  // Requesting permission state
  if (state === 'requesting-permission') {
    return (
      <div className="flex items-center gap-2 p-4 bg-orange-50 text-orange-700 rounded-lg">
        <Loader2 className="w-5 h-5 animate-spin" />
        <p className="text-sm">Meminta izin mikrofon...</p>
      </div>
    );
  }

  // Recording or stopped state - show full controls
  return (
    <div className={`flex flex-col gap-3 p-4 bg-white border-2 border-orange-200 rounded-xl shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {state === 'recording' && (
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          )}
          <span className="text-sm font-medium text-gray-700">
            {state === 'recording' ? 'Merekam...' : 'Rekaman Selesai'}
          </span>
        </div>
        <span className="text-lg font-mono font-bold text-orange-600">
          {formatDuration(duration)}
        </span>
      </div>

      {/* Waveform visualization */}
      <div className="flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3">
        <AudioWaveform
          audioData={audioData}
          width={280}
          height={60}
          color="#EA580C"
          type="bars"
          barCount={40}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        {state === 'recording' ? (
          <>
            {/* Cancel button */}
            <button
              onClick={cancelRecording}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              title="Batalkan (ESC)"
            >
              <X className="w-4 h-4" />
              <span className="text-sm font-medium">Batal</span>
            </button>

            {/* Stop button */}
            <button
              onClick={stopRecording}
              className="flex items-center gap-2 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-md"
              title="Stop rekaman"
            >
              <StopCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Stop</span>
            </button>
          </>
        ) : (
          <>
            {/* Cancel button */}
            <button
              onClick={cancelRecording}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              title="Batalkan"
            >
              <X className="w-4 h-4" />
              <span className="text-sm font-medium">Batal</span>
            </button>

            {/* Send button */}
            <button
              onClick={sendRecording}
              className="flex items-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors shadow-md"
              title="Kirim rekaman (Enter)"
            >
              <Send className="w-4 h-4" />
              <span className="text-sm font-medium">Kirim</span>
            </button>
          </>
        )}
      </div>

      {/* Help text */}
      <p className="text-xs text-gray-500 text-center">
        {state === 'recording'
          ? 'Tekan ESC untuk membatalkan'
          : 'Tekan Enter untuk mengirim atau Batal untuk mengulang'}
      </p>
    </div>
  );
}
