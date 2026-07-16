import React from 'react';

/**
 * AmbientBackground
 * A fixed, non-interactive layer behind all content (z-0), themed
 * black / white / red:
 *   - slow-drifting red aurora glows (radial gradients, no blur filter)
 *   - a subtle moving grid
 *   - a faint film-grain overlay
 *   - a vignette for depth
 *
 * Performance notes:
 *   - The glows are pure radial-gradients (already soft), so there is NO
 *     expensive `filter: blur()` and NO `scale` animation — only `translate`,
 *     which the compositor can move without re-rasterizing.
 *   - Each animated layer is promoted with `will-change: transform` +
 *     `translateZ(0)` so it lives on its own GPU layer.
 *   - The grain is a plain, static overlay (no `mix-blend`), so nothing has
 *     to re-blend the whole screen every frame.
 *   - All motion pauses under `prefers-reduced-motion`.
 */
const AmbientBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none bg-black"
    >
      {/* Drifting red aurora glows (radial gradients — soft by nature) */}
      <div
        className="ambient-animated absolute -top-[20%] -left-[15%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] opacity-45"
        style={{
          background:
            'radial-gradient(circle at center, rgba(239,68,68,0.5) 0%, rgba(239,68,68,0.18) 35%, rgba(239,68,68,0) 68%)',
          animation: 'ambient-drift-a 26s ease-in-out infinite',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      />
      <div
        className="ambient-animated absolute -bottom-[25%] -right-[15%] w-[65vw] h-[65vw] max-w-[820px] max-h-[820px] opacity-35"
        style={{
          background:
            'radial-gradient(circle at center, rgba(153,27,27,0.55) 0%, rgba(153,27,27,0.2) 35%, rgba(153,27,27,0) 68%)',
          animation: 'ambient-drift-b 32s ease-in-out infinite',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      />
      {/* Center pulse — opacity only, kept centered by its base transform */}
      <div
        className="ambient-animated absolute top-1/2 left-1/2 w-[55vw] h-[55vw] max-w-[620px] max-h-[620px]"
        style={{
          background:
            'radial-gradient(circle at center, rgba(220,38,38,0.32) 0%, rgba(220,38,38,0) 65%)',
          transform: 'translate(-50%, -50%) translateZ(0)',
          animation: 'ambient-pulse 18s ease-in-out infinite',
        }}
      />

      {/* Subtle moving grid, faded toward the center */}
      <div
        className="ambient-animated absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 90%)',
          animation: 'ambient-grid-pan 8s linear infinite',
          willChange: 'transform',
        }}
      />

      {/* Slow-moving red scanline */}
      <div
        className="ambient-animated absolute inset-x-0 top-0 h-px opacity-40"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(239,68,68,0.8), transparent)',
          animation: 'ambient-scanline 10s linear infinite',
          willChange: 'transform',
        }}
      />

      {/* Static film grain (plain overlay — no per-frame blend) */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Vignette to keep edges deep black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.85) 100%)',
        }}
      />
    </div>
  );
};

export default AmbientBackground;
