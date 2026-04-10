export interface RegisterRequest {
  name: string;
  username: string;
  password?: string; 
}

export interface AuthResponse {
  token: string;
}

export interface LoginRequest {
  username: string;
  password?: string;
}

export interface CategoryDTO {
  id: number;
  category: string;
}

export interface NotesDTO {
  id: number;
  title: string;
  content: string;
  color: string;
  isActive: boolean;
  updatedAt: string; 
  categories: CategoryDTO[];
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  color: string;
  categories: CategoryDTO[];
}

export interface UpdateNoteRequest {
  title: string;
  content: string;
  color: string;
  isActive: boolean;
  categories: CategoryDTO[];
}

export interface NotesDTO {
  id: number;
  title: string;
  content: string;
  color: string;
  updatedAt: string;
  isActive: boolean;
  categories: CategoryDTO[];
} 