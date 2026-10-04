import { FiFileText, FiLayers, FiImage, FiUsers, FiPlus } from 'react-icons/fi';

export default function DashboardHome() {
  const stats = [
    { title: 'Total Posts', value: '12', icon: <FiFileText className="w-6 h-6 text-blue-400" />, bg: 'bg-blue-500/10' },
    { title: 'Total Pages', value: '5', icon: <FiLayers className="w-6 h-6 text-purple-400" />, bg: 'bg-purple-500/10' },
    { title: 'Media Files', value: '48', icon: <FiImage className="w-6 h-6 text-emerald-400" />, bg: 'bg-emerald-500/10' },
    { title: 'Active Users', value: '3', icon: <FiUsers className="w-6 h-6 text-orange-400" />, bg: 'bg-orange-500/10' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-400">Welcome to your website's control center.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 p-6 rounded-3xl hover:border-slate-700 transition-colors shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 font-medium">{stat.title}</h3>
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                {stat.icon}
              </div>
            </div>
            <p className="text-4xl font-bold text-white tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 p-8 rounded-3xl shadow-xl mt-8">
        <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20">
            <FiPlus className="w-5 h-5" />
            Create New Post
          </button>
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-medium transition-colors border border-slate-700 hover:border-slate-600">
            <FiImage className="w-5 h-5" />
            Upload Media
          </button>
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-medium transition-colors border border-slate-700 hover:border-slate-600">
            <FiUsers className="w-5 h-5" />
            Manage Users
          </button>
        </div>
      </div>
    </div>
  );
}
