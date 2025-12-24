let audioContext: AudioContext | null = null;

function getContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

function playTone(
  frequency: number,
  durationMs: number,
  type: OscillatorType = "square",
  volume = 0.2
) {
  const ctx = getContext();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.value = volume;

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  const now = ctx.currentTime;
  const duration = durationMs / 1000;
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  oscillator.start(now);
  oscillator.stop(now + duration);
}

export function playCoin() {
  playTone(880, 90, "square", 0.25);
  setTimeout(() => playTone(1320, 90, "square", 0.2), 80);
}

export function playSelect() {
  playTone(520, 70, "square", 0.18);
}

export function playConfirm() {
  playTone(740, 80, "square", 0.2);
}

export function playEnding() {
  playTone(392, 120, "triangle", 0.2);
  setTimeout(() => playTone(523, 140, "triangle", 0.2), 120);
  setTimeout(() => playTone(659, 180, "triangle", 0.2), 260);
}
