import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <nav className='bg-[#06142B] px-10 flex items-center justify-between h-16 relative overflow-hidden'>

            
                <div className='absolute w-40 h-40 bg-teal-400 rounded-full opacity-40 blur-3xl -top-10 -right-10 pointer-events-none' />
                <div className='absolute w-32 h-32 bg-pink-500 rounded-full opacity-40 blur-3xl -bottom-10 right-40 pointer-events-none' />

            
                <span className='text-white font-bold text-xl z-10'>ClientHub</span>

        
                <div className='flex gap-8 z-10'>
                    <Link to={'/'} className='text-gray-300 hover:text-white py-2 transition-colors cursor-pointer'>Home</Link>
                    <Link to={'/registeration'} className='text-gray-300 hover:text-white py-2 transition-colors cursor-pointer'>Registration</Link>
                    <Link to={'/login'} className='text-gray-300 hover:text-white py-2 transition-colors cursor-pointer'>Login</Link>
                    <Link to={'/dashboard'} className='text-gray-300 hover:text-white py-2 transition-colors cursor-pointer'>Dashboard</Link>
                </div>

            </nav>
        </>
    )
}

export default Navbar