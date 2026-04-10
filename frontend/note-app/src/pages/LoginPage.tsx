import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className='relative items-center justify-center flex h-screen w-screen overflow-hidden bg-[#0d0520]'>
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-700/30 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-800/25 blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[30%] right-[20%] w-[350px] h-[350px] rounded-full bg-violet-600/20 blur-[100px] animate-pulse delay-500" />
      </div>

      <LoginForm />
    </div>
  );
};

export default LoginPage;