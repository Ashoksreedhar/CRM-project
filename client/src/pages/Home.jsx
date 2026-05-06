
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  return (
    <>

      <div className="bg-[#06142B] text-white min-h-screen relative overflow-hidden">

        
        <div className="absolute w-64 h-64 bg-teal-400 rounded-full opacity-65 blur-3xl -top-16 -right-16" />
        <div className="absolute w-56 h-56 bg-yellow-400 rounded-full opacity-65 blur-3xl -bottom-16 -left-16" />
        <div className="absolute w-56 h-56 bg-pink-500 rounded-full opacity-65 blur-3xl -bottom-16 -right-16" />

      
        <nav className="flex justify-between items-center px-10 py-6 relative z-10">
          <div className="text-xl font-bold">ClientHub</div>
          <ul className="hidden md:flex gap-8 text-gray-300 items-center">
            <li className="hover:text-white cursor-pointer transition-colors"
              onClick={() => navigate('/')}>Home</li>
            <li className="hover:text-white cursor-pointer transition-colors"
              onClick={() => navigate('/registeration')}>Registration</li>
            <li className="hover:text-white cursor-pointer transition-colors"
              onClick={() => navigate('/login')}>Login</li>
            <li className="hover:text-white cursor-pointer transition-colors"
              onClick={() => navigate('/dashboard')}>Dashboard</li>
          </ul>
        </nav>

        
        <div className="text-center px-6 mt-20 max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            About our company
          </h1>
          <p className="text-gray-400 mt-6 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ornare
            rhoncus nibh quis parturient quis at interdum nibh dolor integer
            eget adipiscing mauris.
          </p>
          <div className="mt-10 flex justify-center gap-6 flex-wrap">
            <button className="bg-blue-600 px-8 py-4 rounded-xl text-lg hover:bg-blue-700 transition">
              Join us ↗
            </button>
            <button className="border border-gray-400 px-8 py-4 rounded-xl text-lg hover:bg-white hover:text-black transition">
              Learn more
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default Home;