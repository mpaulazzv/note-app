import React from 'react';
import type { NotesDTO } from '../types';

const COLOR_MAP: Record<string, { bg: string; glass: string; border: string; accent: string }> = {
  blue:   { bg: '#bfdbfe', glass: 'rgba(191,219,254,0.55)', border: 'rgba(147,197,253,0.6)', accent: '#3b82f6' },
  pink:   { bg: '#fbcfe8', glass: 'rgba(251,207,232,0.55)', border: 'rgba(249,168,212,0.6)', accent: '#ec4899' },
  purple: { bg: '#e9d5ff', glass: 'rgba(233,213,255,0.55)', border: 'rgba(216,180,254,0.6)', accent: '#a855f7' },
  yellow: { bg: '#fef08a', glass: 'rgba(254,240,138,0.55)', border: 'rgba(253,224,71,0.6)',  accent: '#eab308' },
};

const DEFAULT_COLOR = COLOR_MAP['yellow'];

function getColorTokens(color: string) {
  return COLOR_MAP[color.toLowerCase()] ?? DEFAULT_COLOR;
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit', month: 'short', year: 'numeric',
  }).format(new Date(iso));
}

interface NoteProps {
  note: NotesDTO;
  onClick?: () => void;
  onDelete?: (id: number) => void;
}

export const Note: React.FC<NoteProps> = ({ note, onClick, onDelete }) => {
  const tokens = getColorTokens(note.color);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) onDelete(note.id);
  };

  return (
    <article onClick={onClick}
      className="group relative flex lg:min-h-80 min-h-60 cursor-pointer flex-col gap-2.5 overflow-hidden rounded-[18px] p-[22px_20px_16px] backdrop-blur-[12px] backdrop-saturate-[1.4] transition-all duration-[0.22s] cubic-bezier-[0.34,1.56,0.64,1] hover:-translate-y-[3px] hover:scale-[1.013]"
      style={{
        background: tokens.glass,
        border: `1.5px solid ${tokens.border}`,
        boxShadow: `0 2px 12px ${tokens.bg}66, 0 1px 4px rgba(0,0,0,0.04)`,
      }}
    >
      <button 
        onClick={handleDelete}
        className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-black/40 opacity-0 transition-opacity hover:bg-red-500 hover:text-white group-hover:opacity-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/>
        </svg>
      </button>

      <h3 className="m-0 line-clamp-2 pr-[24px] font-sans text-[1rem] font-bold leading-[1.25] tracking-tight text-[#501453]">
        {note.title}
      </h3>

      <p className="m-0 flex-1 line-clamp-4 font-sans text-[0.82rem] leading-[1.55] text-[#3a354f]">
        {note.content}
      </p>

      <div className="mt-1 flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {note.categories.slice(0, 2).map(cat => (
            <span 
              key={cat.id} 
              className="rounded-[20px] border px-2 py-[2px] font-sans text-[0.65rem] font-semibold lowercase tracking-wide"
              style={{ 
                background: `${tokens.accent}22`, 
                color: tokens.accent, 
                borderColor: `${tokens.accent}44` 
              }}
            >
              {cat.category}
            </span>
          ))}
        </div>

        <span className="whitespace-nowrap font-sans text-[0.68rem] text-purple-950">
          {formatDate(note.updatedAt)}
        </span>
      </div>

      <div className="pointer-events-none absolute inset-0 h-[38%] w-[60%] rounded-[18px_0_0_0] bg-gradient-to-br from-white/38 to-transparent" />
    </article>
  );
};