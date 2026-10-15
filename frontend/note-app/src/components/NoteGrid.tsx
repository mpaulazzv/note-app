import React, { useEffect, useState, useCallback } from 'react';
import { Note } from './Note';
import { notesService } from '../services/notes.service';
import type { NotesDTO, UpdateNoteRequest } from '../types';
import AddNoteSlot from './AddNoteSlot';
import NoteModal from './NoteModal';
import Swal from 'sweetalert2';

export const NoteGrid: React.FC = () => {
  const [notes, setNotes] = useState<NotesDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<NotesDTO | null>(null);
  const [filterActive, setFilterActive] = useState(true);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await notesService.getFilteredNotes(filterActive);
      setNotes(data);
    } catch {
      setError('Could not load notes.');
    } finally {
      setLoading(false);
    }
  }, [filterActive]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  async function handleUpdate(id: number, req: UpdateNoteRequest) {
    const updated = await notesService.updateNote(id, req);
    setNotes(prev =>
      updated.isActive === filterActive
        ? prev.map(n => (n.id === id ? updated : n))
        : prev.filter(n => n.id !== id)
    );
  }

  const handleDeleteSuccess = () => {
  Swal.fire({
    title: '¡Eliminada!',
    text: 'Tu nota ha sido eliminada.',
    icon: 'success', // This triggers the checkmark animation
    confirmButtonColor: '#a855f7',
  });
};

const confirmDelete = (id: number) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¡No podrás revertir esta acción!',
    icon: 'warning', // This triggers the warning animation
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Sí, eliminarla',
    cancelButtonText: 'Cancelar'
  }).then(async (result) => {
    if (result.isConfirmed) {
      await handleDelete(id);
    }
    handleDeleteSuccess();
  });
};

  async function handleDelete(id: number) {
    try {
      await notesService.deleteNote(id);
      setNotes(prev => prev.filter(n => n.id !== id));
    } catch {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar la nota.',
        icon: 'error',
        confirmButtonColor: '#a855f7',
      });
    }
  
}

  if (loading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-[18px] p-6 w-full">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="min-h-[180px] animate-pulse rounded-[18px] bg-[#d1c4e9]/25" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setFilterActive(true)}
          className={`px-4 py-2 rounded-full font-sans transition ${
            filterActive ? 'bg-purple-500 text-white' : 'bg-white text-purple-500 border border-purple-500'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilterActive(false)}
          className={`px-4 py-2 rounded-full font-sans transition ${
            !filterActive ? 'bg-purple-500 text-white' : 'bg-white text-purple-500 border border-purple-500'
          }`}
        >
          Archived
        </button>
      </div>

      {error ? (
        <div className="px-5 py-[60px] text-center font-sans text-gray-400">
          <p className="text-[0.9rem]">{error}</p>
          <button onClick={fetchNotes} className="mt-3 cursor-pointer rounded-lg border border-[#d8b4fe] bg-transparent px-5 py-2 font-sans font-semibold text-purple-500">
            Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-[18px] p-6">
          {filterActive && <AddNoteSlot onClick={() => setShowModal(true)} />}
          {notes.map(note => (
            <Note key={note.id} note={note} onClick={() => setSelectedNote(note)} onDelete={confirmDelete} />
          ))}
        </div>
      )}

      {(showModal || selectedNote) && (
        <NoteModal
          onClose={() => {
            setShowModal(false);
            setSelectedNote(null);
          }}
          {...(selectedNote
            ? { note: selectedNote, onUpdate: handleUpdate }
            : {
                onCreate: async (req) => {
                  const newNote = await notesService.createNote(req);
                  if (filterActive) setNotes(prev => [newNote, ...prev]);
                  setShowModal(false);
                },
              })}
        />
      )}
    </>
  );
};