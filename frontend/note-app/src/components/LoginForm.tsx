import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authService.login(formData);
      localStorage.setItem('token', response.token);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Error al registrar el usuario');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-purple-950/30 backdrop-blur-md border border-purple-400/20 rounded-3xl p-8 shadow-xl">

      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-white tracking-tight">Welcome to Note App</h2>
        <p className="text-purple-200/60 text-base mt-1">Log in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {error && (
          <div className="bg-red-500/15 border border-red-400/30 text-red-300 text-sm px-4 py-3 rounded-2xl">
            {error}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-purple-100/80 pl-1">
            Username
          </label>
          <input
            name="username"
            type="text"
            required
            placeholder="@username"
            value={formData.username}
            onChange={handleChange}
            className="w-full bg-white/5 border border-purple-300/20 text-white placeholder-purple-300/30 rounded-2xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-purple-400/60 focus:bg-white/10 focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-purple-100/80 pl-1">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-white/5 border border-purple-300/20 text-white placeholder-purple-300/30 rounded-2xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-purple-400/60 focus:bg-white/10 focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 bg-purple-500/80 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] text-sm tracking-wide"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Registrando...
            </span>
          ) : (
            'Create Account'
          )}
        </button>

        <p className="text-center text-sm text-purple-200/50 pt-1">
          You don't have an account?{' '}
          <Link
            to="/register"
            className="text-purple-300/80 hover:text-purple-200 transition-colors font-medium underline underline-offset-2"
          >
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;