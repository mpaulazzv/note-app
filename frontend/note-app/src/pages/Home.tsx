import { NoteGrid } from "../components/NoteGrid";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#fcf1ff]">
      <div className="text-center w-screen screen">
        <header className="my-8 text-center">
          <h1 className="font-sans text-5xl font-bold tracking-tight text-black">
            My Notes
          </h1>
          <p className="mt-3 font-sans text-lg text-black/50">
            Easily organize your ideas
          </p>
        </header>
        <NoteGrid></NoteGrid>
      </div>
    </main>
  );
};

export default Home;