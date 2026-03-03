import { useState } from 'react';

const gradientMapping = {
  blue:   'linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))',
  purple: 'linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))',
  red:    'linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))',
  indigo: 'linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))',
  orange: 'linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))',
  green:  'linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))',
};

function GlassIcon({ icon, color, label, onClick }) {
  const [hovered, setHovered] = useState(false);

  const bg = gradientMapping[color] || color;

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: 'transparent',
        outline: 'none',
        border: 'none',
        cursor: 'pointer',
        width: '4.5em',
        height: '4.5em',
        perspective: '24em',
        transformStyle: 'preserve-3d',
        WebkitTapHighlightColor: 'transparent',
        fontSize: '1rem',
      }}
    >
      {/* Back layer */}
      <span style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        borderRadius: '1.25em',
        display: 'block',
        background: bg,
        boxShadow: '0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.15)',
        transformOrigin: '100% 100%',
        transition: 'transform 0.3s cubic-bezier(0.83,0,0.17,1)',
        transform: hovered ? 'rotate(25deg) translate3d(-0.5em,-0.5em,0.5em)' : 'rotate(15deg)',
        willChange: 'transform',
      }} />

      {/* Front glass layer */}
      <span style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        borderRadius: '1.25em',
        background: 'hsla(0,0%,100%,0.15)',
        backdropFilter: 'blur(0.75em)',
        WebkitBackdropFilter: 'blur(0.75em)',
        boxShadow: '0 0 0 0.1em hsla(0,0%,100%,0.3) inset',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transformOrigin: '80% 50%',
        transition: 'transform 0.3s cubic-bezier(0.83,0,0.17,1)',
        transform: hovered ? 'translate3d(0,0,2em)' : 'none',
        willChange: 'transform',
        color: '#fff',
      }}>
        <span style={{ width: '1.5em', height: '1.5em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </span>
      </span>

      {/* Label */}
      <span style={{
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: hovered ? 'translateX(-50%) translateY(20%)' : 'translateX(-50%) translateY(0)',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        lineHeight: 2,
        fontSize: '0.85rem',
        color: '#fff',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s cubic-bezier(0.83,0,0.17,1), transform 0.3s cubic-bezier(0.83,0,0.17,1)',
        pointerEvents: 'none',
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: '0.05em',
      }}>
        {label}
      </span>
    </button>
  );
}

export default function GlassIcons({ items, className }) {
  return (
    <div style={{
      display: 'grid',
      gap: '5em',
      gridTemplateColumns: `repeat(${items.length}, auto)`,
      margin: '0 auto',
      padding: '3em 0',
      overflow: 'visible',
    }} className={className || ''}>
      {items.map((item, index) => (
        <GlassIcon key={index} {...item} />
      ))}
    </div>
  );
}