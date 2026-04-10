const API_BASE_URL = 'http://localhost:8080/api';

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  const headers = new Headers(options.headers);

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers, 
  });

  // 1. Intentamos obtener el JSON tanto si hay error como si no
  // Usamos una variable para el cuerpo para no perder la info del backend
  let data;
  try {
    data = await response.json();
  } catch (err) {
    data = null; // Si no es JSON (ej. un error 500 fatal), lo manejamos como null
  }

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      // Solo redirigir si no estamos ya en el login para evitar bucles
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    // 2. Extraemos el mensaje del backend. 
    // Los backends suelen enviar { message: "..." } o { error: "..." }
    const errorMessage = data?.message || data?.error || `Error: ${response.status}`;
    
    // Lanzamos un error con el mensaje real
    throw new Error(errorMessage);
  }

  return data;
};