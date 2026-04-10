import { apiFetch } from '../api/api';
import type { NotesDTO, CreateNoteRequest, UpdateNoteRequest } from '../types';

export const notesService = {

  getUserNotes: async (): Promise<NotesDTO[]> => {
    return await apiFetch('/notes/');
  },

  createNote: async (request: CreateNoteRequest): Promise<NotesDTO> => {
    return await apiFetch('/notes/create', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

  updateNote: async (id: number, request: UpdateNoteRequest): Promise<NotesDTO> => {
    return await apiFetch(`/notes/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify(request),
    });
  },

  deleteNote: async (id: number): Promise<void> => {
    return await apiFetch(`/notes/delete/${id}`, {
      method: 'DELETE',
    });
  },
};