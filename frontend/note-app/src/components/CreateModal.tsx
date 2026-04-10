import { useState } from "react";
import type { CategoryDTO, CreateNoteRequest, NotesDTO } from "../types";

const COLORS = [
    { key: 'yellow', bg: '#fef08a', border: '#fde047' },
    { key: 'blue', bg: '#bfdbfe', border: '#93c5fd' },
    { key: 'pink', bg: '#fbcfe8', border: '#f9a8d4' },
    { key: 'purple', bg: '#e9d5ff', border: '#d8b4fe' },
];

const CreateModal: React.FC<{ onClose: () => void; onCreate: (req: CreateNoteRequest) => Promise<void> }> = ({ onClose, onCreate }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [color, setColor] = useState('yellow');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [categoryInput, setCategoryInput] = useState('');
    const [categories, setCategories] = useState<Partial<NotesDTO['categories']>>([]);

    const addCategory = () => {
        const name = categoryInput.trim().toLowerCase();
        if (name && !categories.find(c => c?.category === name)) {
            const newCategory = {
                id: Math.random(), 
                category: name
            };

            setCategories([...categories, newCategory]);
            setCategoryInput('');
        }
    };

    const removeCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

    const selectedColor = COLORS.find(c => c.key === color)!;

    async function handleSubmit() {
        if (!title.trim()) { setError('Title cant be blank'); return; }
        setSaving(true);
        setError(null);
        try {
            await onCreate({ title: title.trim(), content, color, categories: categories as CategoryDTO[] });
            onClose();
        } catch {
            setError('Failed to create note. Please try again.');
        } finally {
            setSaving(false);
        }
    }

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0f0a1e]/45 backdrop-blur-sm animate-in fade-in duration-200"
        >
            <div
                onClick={e => e.stopPropagation()}
                className="flex w-[min(440px,92vw)] flex-col gap-4 rounded-[24px] p-[28px_26px_22px] shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-6 duration-300 ease-out"
                style={{ background: selectedColor.bg, border: `1.5px solid ${selectedColor.border}` }}
            >
                <h2 className="m-0 font-sans font-bold text-[1.3rem] text-[#1e1b2e]">New Note</h2>

                <div className="flex gap-2">
                    {COLORS.map(c => (
                        <button
                            key={c.key}
                            onClick={() => setColor(c.key)}
                            className={`h-[26px] w-[26px] rounded-full transition-transform cursor-pointer ${color === c.key ? 'scale-120' : 'scale-100'}`}
                            style={{
                                background: c.bg,
                                border: color === c.key ? `2.5px solid #1e1b2e` : `1.5px solid ${c.border}`
                            }}
                        />
                    ))}
                </div>

                <input
                    autoFocus
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Title"
                    maxLength={120}
                    className="rounded-lg border bg-white/50 px-[14px] py-[10px] font-sans text-[0.95rem] font-semibold text-[#1e1b2e] outline-none"
                    style={{ borderColor: selectedColor.border }}
                />

                <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Type something..."
                    rows={5}
                    className="resize-y rounded-lg border bg-white/40 px-[14px] py-[10px] font-sans text-[0.85rem] leading-relaxed text-[#3a354f] outline-none"
                    style={{ borderColor: selectedColor.border }}
                />

                {error && <p className="m-0 font-sans text-[0.78rem] text-red-500">{error}</p>}

                <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs font-bold uppercase tracking-wider text-[#1e1b2e]/60 px-1">
                        Categories
                    </label>

                    <div className="flex flex-wrap gap-2 mb-1">
                        {categories.map((cat, i) => (
                            <span
                                key={i}
                                className="flex items-center gap-1 rounded-full bg-white/40 px-3 py-1 font-sans text-xs font-semibold text-[#1e1b2e] border border-white/20"
                            >
                                {cat?.category}
                                <button onClick={() => removeCategory(i)} className="hover:text-red-500">
                                    x
                                </button>
                            </span>
                        ))}
                    </div>

                    <div className="relative flex items-center">
                        <input
                            value={categoryInput}
                            onChange={(e) => setCategoryInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
                            placeholder="Ex: work, personal, health..."
                            className="w-full rounded-lg border bg-white/50 px-3 py-2 font-sans text-sm outline-none pr-10"
                            style={{ borderColor: selectedColor.border }}
                        />
                        <button
                            onClick={addCategory}
                            className="absolute right-2 p-1 text-[#1e1b2e] hover:bg-white/30 rounded-md transition-colors"
                        >

                        </button>
                    </div>
                </div>

                <div className="flex justify-end gap-[10px]">
                    <button
                        onClick={onClose}
                        className="cursor-pointer rounded-lg border bg-transparent px-[18px] py-2 font-sans text-[0.83rem] font-semibold text-gray-500"
                        style={{ borderColor: selectedColor.border }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className={`rounded-lg bg-[#1e1b2e] px-[22px] py-2 font-sans text-[0.83rem] font-bold text-white transition-opacity ${saving ? 'cursor-not-allowed opacity-70' : 'cursor-pointer opacity-100'}`}
                    >
                        {saving ? 'Saving…' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateModal;