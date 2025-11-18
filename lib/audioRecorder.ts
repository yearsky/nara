import RecordRTC from 'recordrtc';

type RecordRTCMimeType =
  | 'audio/webm'
  | 'audio/webm;codecs=pcm'
  | 'video/mp4'
  | 'video/webm'
  | 'video/webm;codecs=vp9'
  | 'video/webm;codecs=vp8'
  | 'video/webm;codecs=h264'
  | 'video/x-matroska;codecs=avc1'
  | 'video/mpeg'
  | 'audio/wav'
  | 'audio/ogg';

export interface AudioRecorderConfig {
  onDataAvailable?: (blob: Blob) => void;
  onError?: (error: Error) => void;
  mimeType?: RecordRTCMimeType;
  sampleRate?: number;
}

export class AudioRecorder {
  private mediaStream: MediaStream | null = null;
  private recorder: RecordRTC | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private animationFrameId: number | null = null;
  private startTime: number = 0;
  private config: AudioRecorderConfig;

  constructor(config: AudioRecorderConfig = {}) {
    this.config = {
      mimeType: 'audio/webm',
      sampleRate: 44100,
      ...config,
    };
  }

  /**
   * Request microphone permission and initialize the recorder
   */
  async initialize(): Promise<void> {
    try {
      // Request microphone access
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: this.config.sampleRate,
        },
      });

      // Initialize audio context for visualization
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = this.audioContext.createMediaStreamSource(this.mediaStream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      source.connect(this.analyser);

      // Initialize RecordRTC
      this.recorder = new RecordRTC(this.mediaStream, {
        type: 'audio',
        mimeType: this.config.mimeType,
        recorderType: RecordRTC.StereoAudioRecorder,
        numberOfAudioChannels: 1,
        desiredSampRate: this.config.sampleRate,
      });
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to initialize recorder');
      this.config.onError?.(err);
      throw err;
    }
  }

  /**
   * Start recording audio
   */
  startRecording(): void {
    if (!this.recorder) {
      throw new Error('Recorder not initialized. Call initialize() first.');
    }

    this.startTime = Date.now();
    this.recorder.startRecording();
  }

  /**
   * Stop recording and get the audio blob
   */
  async stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.recorder) {
        reject(new Error('Recorder not initialized'));
        return;
      }

      this.recorder.stopRecording(() => {
        const blob = this.recorder!.getBlob();
        this.config.onDataAvailable?.(blob);
        resolve(blob);
      });
    });
  }

  /**
   * Get current recording duration in milliseconds
   */
  getDuration(): number {
    if (this.startTime === 0) {
      return 0;
    }
    return Date.now() - this.startTime;
  }

  /**
   * Get audio frequency data for waveform visualization
   */
  getFrequencyData(): Uint8Array {
    if (!this.analyser) {
      return new Uint8Array(0);
    }

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }

  /**
   * Get audio time domain data for waveform visualization
   */
  getTimeDomainData(): Uint8Array {
    if (!this.analyser) {
      return new Uint8Array(0);
    }

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteTimeDomainData(dataArray);
    return dataArray;
  }

  /**
   * Get current audio volume level (0-100)
   */
  getVolume(): number {
    const dataArray = this.getTimeDomainData();
    if (dataArray.length === 0) {
      return 0;
    }

    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      const normalized = (dataArray[i] - 128) / 128;
      sum += normalized * normalized;
    }
    const rms = Math.sqrt(sum / dataArray.length);
    return Math.min(100, rms * 100 * 5); // Amplify by 5 for better visibility
  }

  /**
   * Check if browser supports audio recording
   */
  static isSupported(): boolean {
    return !!(
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === 'function' &&
      (window.AudioContext || (window as any).webkitAudioContext)
    );
  }

  /**
   * Check if microphone permission is granted
   */
  static async checkPermission(): Promise<PermissionState> {
    try {
      const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      return result.state;
    } catch (error) {
      // Some browsers don't support permission query
      return 'prompt';
    }
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.recorder) {
      this.recorder.destroy();
      this.recorder = null;
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    this.analyser = null;
    this.startTime = 0;
  }
}

/**
 * Convert audio blob to base64 string
 */
export async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      resolve(base64.split(',')[1]); // Remove data:audio/webm;base64, prefix
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Format duration in seconds to MM:SS format
 */
export function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
