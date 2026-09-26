import React, { useState, useEffect } from 'react';
import {
  Lock,
  LayoutDashboard,
  Layers,
  Image as ImageIcon,
  Video,
  MessageSquare,
  History,
  Users,
  Instagram,
  BarChart3,
  Calendar,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Search,
  Sparkles,
  Camera,
  Eye,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('umiya_admin_token'));
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('umiya2026!');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<
    'overview' | 'hero' | 'services' | 'portfolio' | 'videos' | 'testimonials' | 'timeline' | 'team' | 'instagram' | 'stats' | 'bookings' | 'messages'
  >('overview');

  // CMS State
  const [stats, setStats] = useState<any>({});
  const [heroSlides, setHeroSlides] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [instagram, setInstagram] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Edit Modals Item State
  const [editItem, setEditItem] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (token) {
      fetchAllCMSData();
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem('umiya_admin_token', data.token);
        setToken(data.token);
        showToast('Successfully authenticated as Master Admin!');
      } else {
        setLoginError(data.message || 'Invalid username or password');
      }
    } catch (err: any) {
      setLoginError('Server connection error. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('umiya_admin_token');
    setToken(null);
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const fetchAllCMSData = async () => {
    setDataLoading(true);
    try {
      const res = await fetch('/api/home');
      const json = await res.json();
      if (json.success && json.data) {
        setStats(json.data.stats || {});
        setHeroSlides(json.data.heroSlides || []);
        setTimeline(json.data.timeline || []);
        setServices(json.data.services || []);
        setPortfolio(json.data.portfolio || []);
        setVideos(json.data.videos || []);
        setTestimonials(json.data.testimonials || []);
        setInstagram(json.data.instagram || []);
      }

      // Fetch Bookings & Messages
      if (token) {
        const resB = await fetch('/api/admin/bookings', { headers: { Authorization: `Bearer ${token}` } });
        const jsonB = await resB.json();
        if (jsonB.success) setBookings(jsonB.data || []);

        const resM = await fetch('/api/admin/contact', { headers: { Authorization: `Bearer ${token}` } });
        const jsonM = await resM.json();
        if (jsonM.success) setMessages(jsonM.data || []);

        const resT = await fetch('/api/team');
        const jsonT = await resT.json();
        if (jsonT.success) setTeam(jsonT.data || []);
      }
    } catch (err) {
      console.error('Failed to load CMS data:', err);
    } finally {
      setDataLoading(false);
    }
  };

  // API Mutators
  const saveItem = async (endpoint: string, itemData: any, isEdit = false) => {
    try {
      const url = isEdit ? `/api/admin/${endpoint}/${itemData.id}` : `/api/admin/${endpoint}`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(itemData)
      });

      const json = await res.json();
      if (json.success) {
        showToast(`Item ${isEdit ? 'updated' : 'created'} successfully!`);
        setEditItem(null);
        setIsCreating(false);
        fetchAllCMSData();
      } else {
        alert(json.message || 'Operation failed');
      }
    } catch (err) {
      alert('Error saving data to server');
    }
  };

  const deleteItem = async (endpoint: string, id: string) => {
    if (!confirm('Are you sure you want to delete this CMS item?')) return;
    try {
      const res = await fetch(`/api/admin/${endpoint}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success) {
        showToast('Item deleted successfully');
        fetchAllCMSData();
      }
    } catch (err) {
      alert('Failed to delete item');
    }
  };

  const updateBookingStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const json = await res.json();
      if (json.success) {
        showToast(`Booking ${id} status updated to ${newStatus}`);
        fetchAllCMSData();
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const saveStats = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/stats', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(stats)
      });
      const json = await res.json();
      if (json.success) {
        showToast('Studio Statistics Updated Successfully!');
      }
    } catch (err) {
      alert('Failed to update stats');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex flex-col text-slate-100 font-sans overflow-hidden animate-in fade-in duration-200">
      {/* Top Banner Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#D62828] flex items-center justify-center font-serif font-bold text-lg text-white shadow-lg">
            U
          </div>
          <div>
            <h1 className="font-serif font-bold text-lg text-white flex items-center gap-2">
              <span>UMIYA STUDIO CMS Admin</span>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                v2.6 LIVE APIS
              </span>
            </h1>
            <p className="text-xs text-slate-400">Integrated REST API & SQLite Content Management Suite</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {token && (
            <button
              onClick={fetchAllCMSData}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${dataLoading ? 'animate-spin text-amber-400' : ''}`} />
              <span className="hidden sm:inline">Sync Data</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Live Website</span>
          </button>

          {token && (
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </header>

      {/* Toast Notification */}
      {notification && (
        <div className="absolute top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* LOGIN VIEW IF NOT AUTHENTICATED */}
      {!token ? (
        <div className="flex-1 flex items-center justify-center p-6 bg-slate-950">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-3xl bg-[#1E3A8A]/30 border border-[#1E3A8A] text-amber-400 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-white">Master Admin Login</h2>
              <p className="text-xs text-slate-400">Enter credentials to manage UMIYA STUDIO website content, services, and client bookings.</p>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1E3A8A]"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1E3A8A]"
                  required
                />
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] text-amber-300/80 space-y-1">
                <span className="font-bold uppercase tracking-wider block text-amber-400">Pre-filled Access:</span>
                <div>Username: <code className="bg-slate-800 px-1.5 py-0.5 rounded text-white">admin</code></div>
                <div>Password: <code className="bg-slate-800 px-1.5 py-0.5 rounded text-white">umiya2026!</code></div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-[#1E3A8A] hover:bg-[#D62828] text-white py-3.5 rounded-2xl font-bold text-sm shadow-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>{loginLoading ? 'Authenticating...' : 'Sign In to CMS Admin'}</span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* MAIN DASHBOARD LAYOUT */
        <div className="flex-1 flex overflow-hidden">
          {/* Left Navigation Sidebar */}
          <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4 space-y-2 overflow-y-auto hidden md:block">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 py-2">
              CMS Dynamic Modules
            </div>

            {[
              { id: 'overview', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: 'bookings', label: `Client Bookings (${bookings.length})`, icon: <Calendar className="w-4 h-4 text-emerald-400" /> },
              { id: 'messages', label: `Contact Inquiries (${messages.length})`, icon: <MessageSquare className="w-4 h-4 text-blue-400" /> },
              { id: 'hero', label: `Hero Slides (${heroSlides.length})`, icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
              { id: 'services', label: `Services Catalog (${services.length})`, icon: <Layers className="w-4 h-4 text-indigo-400" /> },
              { id: 'portfolio', label: `Portfolio Items (${portfolio.length})`, icon: <ImageIcon className="w-4 h-4 text-rose-400" /> },
              { id: 'videos', label: `Cinema Videos (${videos.length})`, icon: <Video className="w-4 h-4 text-amber-300" /> },
              { id: 'testimonials', label: `Client Praise (${testimonials.length})`, icon: <MessageSquare className="w-4 h-4 text-amber-400" /> },
              { id: 'timeline', label: `Journey Milestones (${timeline.length})`, icon: <History className="w-4 h-4 text-purple-400" /> },
              { id: 'team', label: `Team Members (${team.length})`, icon: <Users className="w-4 h-4 text-cyan-400" /> },
              { id: 'instagram', label: `Instagram Feed (${instagram.length})`, icon: <Instagram className="w-4 h-4 text-rose-500" /> },
              { id: 'stats', label: 'Studio Metrics', icon: <BarChart3 className="w-4 h-4 text-emerald-400" /> }
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => setActiveTab(nav.id as any)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === nav.id
                    ? 'bg-[#1E3A8A] text-white shadow-lg border border-blue-500/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {nav.icon}
                <span>{nav.label}</span>
              </button>
            ))}
          </aside>

          {/* Main Module Content Area */}
          <main className="flex-1 bg-slate-950 p-6 overflow-y-auto">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white">System & Content Overview</h2>
                  <p className="text-xs text-slate-400">Live metrics from your backend SQLite database engine.</p>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Bookings</div>
                    <div className="text-3xl font-serif font-bold text-emerald-400">{bookings.length}</div>
                    <p className="text-[11px] text-slate-500">Client consultation inquiries</p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Services Listed</div>
                    <div className="text-3xl font-serif font-bold text-indigo-400">{services.length}</div>
                    <p className="text-[11px] text-slate-500">Full catalog packages</p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Portfolio Photos</div>
                    <div className="text-3xl font-serif font-bold text-rose-400">{portfolio.length}</div>
                    <p className="text-[11px] text-slate-500">High-res gallery items</p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">4K Cinema Films</div>
                    <div className="text-3xl font-serif font-bold text-amber-400">{videos.length}</div>
                    <p className="text-[11px] text-slate-500">Showcase trailers</p>
                  </div>
                </div>

                {/* Recent Consultation Leads */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-lg text-white">Recent Client Booking Inquiries</h3>
                    <button
                      onClick={() => setActiveTab('bookings')}
                      className="text-xs font-bold text-amber-400 hover:underline"
                    >
                      View All Leads →
                    </button>
                  </div>

                  {bookings.length === 0 ? (
                    <p className="text-xs text-slate-500 py-4">No client inquiries yet.</p>
                  ) : (
                    <div className="divide-y divide-slate-800 text-xs">
                      {bookings.slice(0, 5).map((b) => (
                        <div key={b.id} className="py-3 flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <div className="font-bold text-white text-sm">{b.fullName}</div>
                            <div className="text-slate-400">{b.eventType} • {b.eventLocation} ({b.eventDate})</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-amber-300 font-bold">{b.estimatedBudget}</span>
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                b.status === 'Pending'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              }`}
                            >
                              {b.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* BOOKINGS LEADS TAB */}
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-white">Client Booking Consultation Leads</h2>
                    <p className="text-xs text-slate-400">Submitted directly through the website consultation modal.</p>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                        <th className="p-4">ID</th>
                        <th className="p-4">Client Name</th>
                        <th className="p-4">Event Details</th>
                        <th className="p-4">Location & Date</th>
                        <th className="p-4">Budget</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-800/50">
                          <td className="p-4 font-mono font-bold text-amber-400">{b.id}</td>
                          <td className="p-4">
                            <div className="font-bold text-white">{b.fullName}</div>
                            <div className="text-slate-400 text-[11px]">{b.email} • {b.phone}</div>
                          </td>
                          <td className="p-4">
                            <div className="text-slate-200">{b.eventType}</div>
                            <div className="text-slate-400 text-[11px]">{b.preferredContact} contact</div>
                          </td>
                          <td className="p-4">
                            <div className="text-slate-200">{b.eventLocation}</div>
                            <div className="text-slate-400 text-[11px]">{b.eventDate}</div>
                          </td>
                          <td className="p-4 font-semibold text-emerald-400">{b.estimatedBudget}</td>
                          <td className="p-4">
                            <select
                              value={b.status}
                              onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                              className="bg-slate-950 border border-slate-800 text-white text-xs px-2.5 py-1 rounded-lg outline-none cursor-pointer"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => deleteItem('bookings', b.id)}
                              className="p-1.5 bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SERVICES MANAGEMENT TAB */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-white">Services Catalog Manager</h2>
                    <p className="text-xs text-slate-400">Manage all 15 photography & videography packages on the website.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditItem({
                        title: '',
                        category: 'Wedding',
                        shortDescription: '',
                        fullDescription: '',
                        startingPrice: '$1,500',
                        coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
                        features: ['Full Day Coverage', 'Senior Lead Photographer'],
                        deliverables: ['High-Res Photos']
                      });
                      setIsCreating(true);
                    }}
                    className="bg-[#1E3A8A] hover:bg-[#D62828] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Service</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {services.map((s) => (
                    <div key={s.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-4 space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <img src={s.coverImage} alt={s.title} className="w-full h-32 object-cover rounded-xl" />
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                            {s.category}
                          </span>
                          <span className="font-bold text-emerald-400">{s.startingPrice}</span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-white">{s.title}</h4>
                        <p className="text-slate-400 text-[11px] line-clamp-2">{s.shortDescription}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                        <button
                          onClick={() => {
                            setEditItem(s);
                            setIsCreating(false);
                          }}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-[#1E3A8A] text-white rounded-lg font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </button>

                        <button
                          onClick={() => deleteItem('services', s.id)}
                          className="p-1.5 bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PORTFOLIO TAB */}
            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-white">Portfolio Gallery Manager</h2>
                    <p className="text-xs text-slate-400">Dynamic photo gallery items with camera specifications and location badges.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditItem({
                        title: '',
                        coupleOrClient: '',
                        category: 'Wedding',
                        location: 'San Francisco, CA',
                        country: 'USA',
                        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
                        description: '',
                        featured: true
                      });
                      setIsCreating(true);
                    }}
                    className="bg-[#1E3A8A] hover:bg-[#D62828] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Portfolio Item</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  {portfolio.map((p) => (
                    <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-3 space-y-2">
                      <img src={p.image} alt={p.title} className="w-full h-36 object-cover rounded-xl" />
                      <div className="font-bold text-white line-clamp-1">{p.title}</div>
                      <div className="text-slate-400 text-[11px]">{p.location} • {p.country}</div>

                      <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                        <button
                          onClick={() => {
                            setEditItem(p);
                            setIsCreating(false);
                          }}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-[#1E3A8A] text-white rounded text-[11px] font-bold cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteItem('portfolio', p.id)}
                          className="p-1 bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white rounded cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* HERO SLIDES TAB */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-white">Hero Banner Slides</h2>
                    <p className="text-xs text-slate-400">Manage headline text, background image URLs, and locations for the hero slider.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditItem({
                        title: 'New Royal Celebration',
                        subtitle: 'Luxury Cinematic Storytelling',
                        location: 'New York, USA',
                        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85',
                        tag: 'Royal Wedding'
                      });
                      setIsCreating(true);
                    }}
                    className="bg-[#1E3A8A] hover:bg-[#D62828] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Hero Slide</span>
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  {heroSlides.map((slide) => (
                    <div key={slide.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
                      <img src={slide.image} alt={slide.title} className="w-full sm:w-44 h-28 object-cover rounded-xl" />
                      <div className="flex-1 space-y-1">
                        <span className="text-[10px] font-bold text-amber-400 uppercase bg-amber-400/10 px-2 py-0.5 rounded">
                          {slide.tag}
                        </span>
                        <h4 className="font-serif font-bold text-base text-white">{slide.title}</h4>
                        <p className="text-slate-400">{slide.subtitle}</p>
                        <p className="text-slate-500 text-[11px]">{slide.location}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditItem(slide);
                            setIsCreating(false);
                          }}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-[#1E3A8A] text-white rounded-lg font-bold cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteItem('hero', slide.id)}
                          className="p-1.5 bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STUDIO METRICS TAB */}
            {activeTab === 'stats' && (
              <div className="max-w-xl space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white">Studio Statistics & Badges</h2>
                  <p className="text-xs text-slate-400">Update numbers displayed on the home page hero section and trust banners.</p>
                </div>

                <form onSubmit={saveStats} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Years of Experience</label>
                    <input
                      type="number"
                      value={stats.yearsExperience || 10}
                      onChange={(e) => setStats({ ...stats, yearsExperience: parseInt(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Weddings Captured</label>
                    <input
                      type="number"
                      value={stats.weddingsCaptured || 500}
                      onChange={(e) => setStats({ ...stats, weddingsCaptured: parseInt(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Happy Clients</label>
                    <input
                      type="number"
                      value={stats.happyClients || 1200}
                      onChange={(e) => setStats({ ...stats, happyClients: parseInt(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Awards Won</label>
                    <input
                      type="number"
                      value={stats.awardsWon || 24}
                      onChange={(e) => setStats({ ...stats, awardsWon: parseInt(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1E3A8A] hover:bg-[#D62828] text-white py-3 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                  >
                    Save Statistics Changes
                  </button>
                </form>
              </div>
            )}
          </main>
        </div>
      )}

      {/* EDIT / CREATE MODAL OVERLAY */}
      {editItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif font-bold text-lg text-white">
                {isCreating ? 'Add New Item' : 'Edit CMS Item'}
              </h3>
              <button onClick={() => setEditItem(null)} className="p-1 hover:bg-slate-800 rounded">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
              {Object.keys(editItem).map((key) => {
                if (key === 'id' || key === 'display_order') return null;
                const value = editItem[key];

                return (
                  <div key={key}>
                    <label className="block text-slate-400 font-semibold mb-1 capitalize">{key}</label>
                    <input
                      type="text"
                      value={typeof value === 'object' ? JSON.stringify(value) : value}
                      onChange={(e) => setEditItem({ ...editItem, [key]: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none"
                    />
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button onClick={() => setEditItem(null)} className="px-4 py-2 bg-slate-800 rounded-xl text-slate-300">
                Cancel
              </button>
              <button
                onClick={() => saveItem(activeTab, editItem, !isCreating)}
                className="px-5 py-2 bg-[#1E3A8A] hover:bg-[#D62828] text-white rounded-xl font-bold cursor-pointer"
              >
                Save Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
