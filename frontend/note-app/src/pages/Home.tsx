import { useNavigate } from 'react-router-dom';
import { NoteGrid } from '../components/NoteGrid';
import { LogOut } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#fcf1ff] overflow-x-hidden">
      <div className="text-center w-full relative">
        <button
          onClick={handleLogout}
          className="absolute top-8 right-8 flex items-center gap-2 rounded-full bg-white/50 px-4 py-2 font-sans text-sm font-semibold text-purple-900 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>

        <header className="my-8 text-center">
          <h1 className="font-sans text-5xl font-bold tracking-tight text-black">
            My Notes
          </h1>
          <p className="mt-3 font-sans text-lg text-black/50">
            Easily organize your ideas
          </p>
        </header>

        <NoteGrid />
      </div>
    </main>
  );
};

export default Home;