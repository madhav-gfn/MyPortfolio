import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiX, HiPaperAirplane, HiChat, HiDownload, HiExternalLink } from 'react-icons/hi';
import { getMadhavReply, GREETING, INITIAL_SUGGESTIONS } from '../data/madhavKnowledge';

/** Small red monogram avatar used in the launcher and bot bubbles. */
const Avatar = ({ size = 'md' }) => {
  const dim = size === 'sm' ? 'w-7 h-7 text-xs' : 'w-10 h-10 text-sm';
  return (
    <div
      className={`${dim} flex-shrink-0 rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white font-display font-bold flex items-center justify-center shadow-md`}
    >
      M
    </div>
  );
};

/** Renders an action link that may be internal (to), external (href) or a download. */
const ActionLink = ({ link, onNavigate }) => {
  const base =
    'cursor-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200';
  const icon = link.download ? <HiDownload className="w-3.5 h-3.5" /> : link.href ? <HiExternalLink className="w-3.5 h-3.5" /> : null;

  if (link.to) {
    return (
      <Link to={link.to} onClick={onNavigate} className={base}>
        {link.label}
      </Link>
    );
  }
  return (
    <a
      href={link.href}
      download={link.download || undefined}
      target={link.href?.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className={base}
    >
      {icon}
      {link.label}
    </a>
  );
};

const TypingDots = () => (
  <div className="flex items-center gap-1 px-1 py-1">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-gray-400"
        animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

const AskMadhav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const idRef = useRef(0);
  const nextId = () => ++idRef.current;

  // Seed the greeting the first time the panel is opened.
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: nextId(), from: 'bot', ...GREETING }]);
    }
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 250);
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-scroll to the newest message / typing indicator.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  // Close on Escape.
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Show a one-time "Ask me anything" nudge shortly after load, auto-hiding.
  useEffect(() => {
    const show = setTimeout(() => setShowTip(true), 1400);
    const hide = setTimeout(() => setShowTip(false), 8000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  // Hide the nudge as soon as the chat is opened.
  useEffect(() => {
    if (isOpen) setShowTip(false);
  }, [isOpen]);

  const send = useCallback((raw) => {
    const text = (raw ?? '').trim();
    if (!text) return;
    setInput('');
    setMessages((m) => [...m, { id: nextId(), from: 'user', text }]);
    setIsTyping(true);
    // Small human-like delay before replying.
    const delay = 450 + Math.min(text.length * 12, 500);
    setTimeout(() => {
      const reply = getMadhavReply(text);
      setMessages((m) => [...m, { id: nextId(), from: 'bot', ...reply }]);
      setIsTyping(false);
    }, delay);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  return (
    <div className="fixed right-4 md:right-24 bottom-24 md:bottom-6 z-[9990] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            style={{ transformOrigin: 'bottom right' }}
            className="w-[92vw] sm:w-[380px] h-[520px] max-h-[70vh] flex flex-col rounded-2xl overflow-hidden border border-white/15 bg-black/95 backdrop-blur-xl shadow-2xl shadow-red-900/20"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-gradient-to-r from-red-950/40 to-transparent">
              <div className="relative">
                <Avatar />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm leading-tight">Ask Madhav</h3>
                <p className="text-gray-400 text-xs">Usually replies instantly</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="cursor-target p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.from === 'bot' && <Avatar size="sm" />}
                  <div className={`max-w-[80%] ${msg.from === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                        msg.from === 'user'
                          ? 'bg-red-500 text-white rounded-br-sm'
                          : 'bg-white/10 text-gray-100 rounded-bl-sm'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {msg.links?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {msg.links.map((link, i) => (
                          <ActionLink key={i} link={link} onNavigate={() => setIsOpen(false)} />
                        ))}
                      </div>
                    )}

                    {msg.chips?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {msg.chips.map((chip, i) => (
                          <button
                            key={i}
                            onClick={() => send(chip)}
                            className="cursor-target px-3 py-1.5 rounded-full text-xs text-gray-300 border border-white/15 hover:border-red-500/60 hover:text-white transition-all duration-200"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2 justify-start">
                  <Avatar size="sm" />
                  <div className="bg-white/10 rounded-2xl rounded-bl-sm">
                    <TypingDots />
                  </div>
                </div>
              )}

              {/* Starter suggestions before any user input */}
              {messages.length === 1 && !isTyping && (
                <div className="flex flex-wrap gap-2 pl-9">
                  {INITIAL_SUGGESTIONS.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => send(s)}
                      className="cursor-target px-3 py-1.5 rounded-full text-xs text-gray-300 border border-white/15 hover:border-red-500/60 hover:text-white transition-all duration-200"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about Madhav…"
                className="flex-1 bg-white/5 border border-white/10 focus:border-red-500/60 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
                className="cursor-target w-10 h-10 flex items-center justify-center rounded-xl bg-red-500 text-white hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <HiPaperAirplane className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Close Ask Madhav chat' : 'Open Ask Madhav chat'}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="cursor-target relative w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white flex items-center justify-center shadow-lg shadow-red-900/40"
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-30" />
        )}
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <HiX className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <HiChat className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default AskMadhav;
