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
}

export const Note: React.FC<NoteProps> = ({ note }) => {
  const tokens = getColorTokens(note.color);

  return (
    <article
      className="group relative flex lg:min-h-80 min-h-60 cursor-pointer flex-col gap-2.5 overflow-hidden rounded-[18px] p-[22px_20px_16px] backdrop-blur-[12px] backdrop-saturate-[1.4] transition-all duration-[0.22s] cubic-bezier-[0.34,1.56,0.64,1] hover:-translate-y-[3px] hover:scale-[1.013]"
      style={{
        background: tokens.glass,
        border: `1.5px solid ${tokens.border}`,
        boxShadow: `0 2px 12px ${tokens.bg}66, 0 1px 4px rgba(0,0,0,0.04)`,
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .note-card-${note.id}:hover {
          box-shadow: 0 8px 32px ${tokens.bg}88, 0 2px 8px rgba(0,0,0,0.07) !important;
        }
      `}} />

      <span 
        className="absolute top-[14px] right-[16px] h-[9px] w-[9px] rounded-full opacity-75"
        style={{ background: tokens.accent }}
      />

      <h3 className="m-0 line-clamp-2 pr-[18px] font-sans text-[1rem] font-bold leading-[1.25] tracking-tight text-[#501453]">
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
          {note.categories.length > 2 && (
            <span className="font-sans text-[0.65rem] text-gray-400">
              +{note.categories.length - 2}
            </span>
          )}
        </div>

        <span className="whitespace-nowrap font-sans text-[0.68rem] text-purple-950">
          {formatDate(note.updatedAt)}
        </span>
      </div>

      <div className="pointer-events-none absolute inset-0 h-[38%] w-[60%] rounded-[18px_0_0_0] bg-gradient-to-br from-white/38 to-transparent" />
    </article>
  );
};