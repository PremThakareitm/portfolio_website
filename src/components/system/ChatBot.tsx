import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, Mic, Send, Square, X } from "lucide-react";
import { answerQuestion, suggestedPrompts, type ChatTurn } from "@/data/chat";
import { useAudio } from "@/hooks/useExperience";
import { getSpeechRecognitionCtor, voiceInputSupported } from "@/lib/speech";

const welcome: ChatTurn = {
  role: "bot",
  text: "Hi — ask about Prem's work, CampusPe, skills, education, or how to reach him. Type, or tap the mic. Answers stay in this chat.",
};

export function ChatBot() {
  const { play } = useAudio();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<ChatTurn[]>([welcome]);
  const [listening, setListening] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const [live, setLive] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recRef = useRef<{ stop: () => void; abort: () => void } | null>(null);
  const canVoice = voiceInputSupported();

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [turns, open]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        recRef.current?.abort();
        setListening(false);
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    return () => recRef.current?.abort();
  }, []);

  function ask(text: string) {
    const q = text.trim();
    if (!q) return;
    play("click");
    const answer = answerQuestion(q);
    setTurns((prev) => [...prev, { role: "user", text: q }, { role: "bot", text: answer }]);
    setLive(answer);
    setInput("");
  }

  function toggleListen() {
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) {
      setVoiceError("Voice input needs Chrome, Edge, or Safari.");
      return;
    }
    if (listening) {
      recRef.current?.stop();
      setListening(false);
      return;
    }
    setVoiceError("");
    const rec = new Ctor();
    rec.lang = "en-IN";
    rec.continuous = false;
    rec.interimResults = false;
    rec.onresult = (event) => {
      const said = event.results[0]?.[0]?.transcript ?? "";
      setListening(false);
      recRef.current = null;
      if (said) ask(said);
    };
    rec.onerror = (event) => {
      setListening(false);
      recRef.current = null;
      if (event.error === "not-allowed") {
        setVoiceError("Microphone permission was blocked. Allow it in the browser, then try again.");
        return;
      }
      if (event.error !== "aborted") {
        setVoiceError("I couldn't hear that. Try again, or type the question.");
      }
    };
    rec.onend = () => {
      setListening(false);
      recRef.current = null;
    };
    recRef.current = rec;
    try {
      rec.start();
      setListening(true);
      play("click");
    } catch {
      setVoiceError("Microphone could not start. Type instead.");
    }
  }

  return (
    <div
      id="site-chat"
      className="fixed right-4 z-[110] flex flex-col items-end gap-3 max-sm:right-3"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <div className="sr-only" aria-live="polite">
        {live}
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-title"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong flex h-[min(68dvh,480px)] w-[min(calc(100vw-1.5rem),360px)] flex-col overflow-hidden rounded-[24px] shadow-lift sm:h-[min(72vh,520px)] sm:rounded-[28px]"
          >
            <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
              <div>
                <p className="label-xs text-muted-foreground">Guide</p>
                <p id="chat-title" className="text-sm text-foreground">
                  Ask about Prem
                </p>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => {
                  recRef.current?.abort();
                  setListening(false);
                  setOpen(false);
                }}
                className="grid size-11 min-h-11 place-items-center rounded-full text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <div
              ref={scroller}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
              aria-label="Conversation"
            >
              {turns.map((turn, i) => (
                <div
                  key={`${turn.role}-${i}`}
                  className={turn.role === "user" ? "ml-6 text-right sm:ml-8" : "mr-4 sm:mr-6"}
                >
                  <p
                    className={
                      turn.role === "user"
                        ? "inline-block rounded-[18px] bg-foreground px-3 py-2 text-left text-[0.8rem] leading-relaxed text-background"
                        : "inline-block rounded-[18px] border border-hairline bg-background/40 px-3 py-2 text-[0.8rem] leading-relaxed text-foreground"
                    }
                  >
                    {turn.text}
                  </p>
                </div>
              ))}
              {listening ? (
                <p className="text-xs text-muted-foreground">Listening…</p>
              ) : null}
            </div>

            <div className="border-t border-hairline px-3 py-3">
              <div className="mb-2 flex flex-wrap gap-1.5">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => ask(prompt)}
                    className="min-h-8 rounded-full border border-hairline px-2.5 py-1 text-[0.65rem] text-muted-foreground hover:text-foreground"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              {voiceError ? (
                <p className="mb-2 text-xs text-destructive" role="alert">
                  {voiceError}
                </p>
              ) : null}
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  ask(input);
                }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a question…"
                  aria-label="Question about Prem"
                  className="h-11 min-w-0 flex-1 rounded-full border border-hairline bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
                {canVoice ? (
                  <button
                    type="button"
                    aria-pressed={listening}
                    aria-label={listening ? "Stop listening" : "Speak a question"}
                    onClick={toggleListen}
                    className={
                      listening
                        ? "grid size-11 min-h-11 shrink-0 place-items-center rounded-full bg-foreground text-background"
                        : "glass grid size-11 min-h-11 shrink-0 place-items-center rounded-full text-foreground"
                    }
                  >
                    {listening ? <Square className="size-4" /> : <Mic className="size-4" />}
                  </button>
                ) : null}
                <button
                  type="submit"
                  aria-label="Send question"
                  className="grid size-11 min-h-11 shrink-0 place-items-center rounded-full bg-foreground text-background"
                >
                  <Send className="size-4" />
                </button>
              </form>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-expanded={open}
        aria-controls="site-chat"
        aria-label={open ? "Close guide" : "Open guide — type or speak"}
        onClick={() => {
          play("click");
          if (open) {
            recRef.current?.abort();
            setListening(false);
          }
          setOpen((v) => !v);
        }}
        whileTap={{ scale: 0.97 }}
        className="grid size-12 min-h-12 place-items-center rounded-full bg-foreground text-background shadow-lift sm:size-14 sm:min-h-14"
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
      </motion.button>
    </div>
  );
}
