const AddNoteSlot: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Nueva nota"
      className="group flex min-h-[180px] flex-col items-center justify-center gap-2 rounded-[18px] border-2 border-dashed border-[#d1c4e9] bg-white/35 backdrop-blur-md transition-all duration-200 hover:scale-[1.02] hover:border-[#a78bfa] hover:bg-[#a78bfa]/10 cursor-pointer"
    >
      <svg 
        width="32" height="32" viewBox="0 0 32 32" fill="none" 
        className="opacity-45 transition-opacity group-hover:opacity-100"
      >
        <circle cx="16" cy="16" r="15" className="stroke-[#9ca3af] group-hover:stroke-[#a78bfa]" strokeWidth="1.5"/>
        <path d="M16 9v14M9 16h14" className="stroke-[#9ca3af] group-hover:stroke-[#a78bfa]" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <span className="font-sans text-[0.75rem] font-semibold tracking-wider text-[#9ca3af] group-hover:text-[#a78bfa]">
        New note
      </span>
    </button>
  );
};

export default AddNoteSlot;