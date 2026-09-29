import { media } from "@/config/media";

/** Soft UI ticks plus looping background score. Never speaks. */

let ctx: AudioContext | null = null;
let bed: {
  el: HTMLAudioElement;
  source: MediaElementAudioSourceNode;
  gain: GainNode;
} | null = null;

function audioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(
  c: AudioContext,
  frequency: number,
  duration: number,
  volume: number,
  type: OscillatorType = "sine",
) {
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(volume, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + duration + 0.02);
}

export function playUiSound(name: "click" | "transition") {
  const c = audioContext();
  if (!c) return;
  if (name === "click") {
    tone(c, 720, 0.05, 0.02);
    return;
  }
  tone(c, 380, 0.12, 0.016, "triangle");
}

export function startAmbient() {
  const c = audioContext();
  if (!c || typeof Audio === "undefined") return;
  if (bed) {
    void bed.el.play().catch(() => undefined);
    const t = c.currentTime;
    bed.gain.gain.cancelScheduledValues(t);
    bed.gain.gain.setValueAtTime(bed.gain.gain.value, t);
    bed.gain.gain.linearRampToValueAtTime(0.14, t + 1.8);
    return;
  }
  const el = new Audio(media.audio.ambient);
  el.loop = true;
  el.preload = "auto";
  el.crossOrigin = "anonymous";
  const source = c.createMediaElementSource(el);
  const filter = c.createBiquadFilter();
  const gain = c.createGain();
  filter.type = "lowpass";
  filter.frequency.value = 2400;
  gain.gain.value = 0;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(c.destination);
  bed = { el, source, gain };
  void el.play().then(() => {
    const t = c.currentTime;
    gain.gain.linearRampToValueAtTime(0.14, t + 2.4);
  }).catch(() => undefined);
}

export function stopAmbient() {
  if (!ctx || !bed) return;
  const { el, gain } = bed;
  const t = ctx.currentTime;
  gain.gain.cancelScheduledValues(t);
  gain.gain.setValueAtTime(gain.gain.value, t);
  gain.gain.linearRampToValueAtTime(0, t + 0.7);
  window.setTimeout(() => {
    el.pause();
  }, 720);
}

export function stopSpeech() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
}
