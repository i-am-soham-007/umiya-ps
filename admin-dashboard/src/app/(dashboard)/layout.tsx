import type { Metadata } from 'next';
import '../globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'Admin Dashboard | CMS',
  description: 'Manage your website content',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans selection:bg-blue-500/30">
      <Sidebar />

      <main className="flex-1 flex flex-col p-4 pl-0 overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 mb-4 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-xl">
          <div className="font-semibold text-slate-300">
            Welcome, Super Admin
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
              <span className="text-sm font-bold">SA</span>
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
