import React, { useEffect, useState } from 'react';
import { Note } from './Note';
import { notesService } from '../services/notes.service';
import type { NotesDTO, UpdateNoteRequest } from '../types';
import AddNoteSlot from './AddNoteSlot';
import NoteModal from './NoteModal';


export const NoteGrid: React.FC = () => {
  const [notes, setNotes] = useState<NotesDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [selectedNote, setSelectedNote] = useState<NotesDTO | null>(null);

  // Handler de update
  async function handleUpdate(id: number, req: UpdateNoteRequest) {
    const updated = await notesService.updateNote(id, req);
    setNotes(prev =>
      updated.isActive
        ? prev.map(n => n.id === id ? updated : n)
        : prev.filter(n => n.id !== id)   // si se archivó, sale del grid
    );
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    setLoading(true);
    setError(null);
    try {
      const data = await notesService.getUserNotes();
      setNotes(data.filter((n: NotesDTO) => n.isActive));
    } catch {
      setError('No se pudieron cargar las notas.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-[18px] padding-[24px] w-full">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="min-h-[180px] animate-pulse rounded-[18px] bg-[#d1c4e9]/25" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-5 py-[60px] text-center font-sans text-gray-400">
        <p className="text-[0.9rem]">{error}</p>
        <button onClick={fetchNotes} className="mt-3 cursor-pointer rounded-lg border border-[#d8b4fe] bg-transparent px-5 py-2 font-sans font-semibold text-purple-500">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-[18px] p-6">
        <AddNoteSlot onClick={() => setShowModal(true)} />
        {notes.map(note => <Note key={note.id} note={note} onClick={() => setSelectedNote(note)} />)}
      </div>

      {(showModal || selectedNote) && (
    <NoteModal
        onClose={() => { setShowModal(false); setSelectedNote(null); }}
        {...(selectedNote
            ? { note: selectedNote, onUpdate: handleUpdate }
            : { onCreate: async (req) => {
                    const newNote = await notesService.createNote(req);
                    setNotes(prev => [newNote, ...prev]);
                }
              }
        )}
    />
)}
    </>
  );
};