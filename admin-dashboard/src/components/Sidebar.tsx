'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiFileText, FiLayers, FiImage, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi';

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/login';
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <FiHome className="w-5 h-5" /> },
    { name: 'Posts', path: '/posts', icon: <FiFileText className="w-5 h-5" /> },
    { name: 'Pages', path: '/pages', icon: <FiLayers className="w-5 h-5" /> },
    { name: 'Media Library', path: '/media', icon: <FiImage className="w-5 h-5" /> },
    { name: 'Users', path: '/users', icon: <FiUsers className="w-5 h-5" /> },
    { name: 'Settings', path: '/settings', icon: <FiSettings className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-72 flex flex-col bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 p-6 m-4 rounded-3xl shadow-2xl">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <span className="text-white font-bold text-xl">U</span>
        </div>
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
          Umiya CMS
        </h2>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.name} 
              href={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-blue-600/10 text-blue-400 shadow-[inset_4px_0_0_0_rgba(96,165,250,1)]' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800/50">
        <button 
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-red-400 font-medium transition-all hover:bg-red-500/10 hover:text-red-300"
        >
          <FiLogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
