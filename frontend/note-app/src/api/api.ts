const API_BASE_URL = 'http://localhost:8080/api';

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  const headers = new Headers();


  headers.append('Content-Type', 'application/json');

  console.log('token:', token);

  if (token) {
    console.log('setting token')
    headers.append('Authorization', `Bearer ${token}`);
  }


  console.log(headers.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  }));

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string>),
    },
  });

  let data;
  try {
    data = await response.json();
  } catch (err) {
    data = null;
  }

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');

      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    const errorMessage = data?.message || data?.error || `Error: ${response.status}`;

    throw new Error(errorMessage);
  }

  return data;
};