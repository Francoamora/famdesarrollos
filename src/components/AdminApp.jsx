import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Phone, Clock, Trash2, LogOut, Loader2, ShieldCheck, User, AtSign, ArrowRight, Activity, Zap } from 'lucide-react';

export default function AdminApp() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Dashboard State
  const [contacts, setContacts] = useState([]);
  const [fetchingContacts, setFetchingContacts] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (session) fetchContacts();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchContacts();
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setContacts([]);
  };

  const fetchContacts = async () => {
    setFetchingContacts(true);
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching contacts:', error);
    } else {
      setContacts(data || []);
    }
    setFetchingContacts(false);
  };

  const deleteContact = async (id) => {
    if (!window.confirm('¿Estás seguro de que querés eliminar este mensaje permanentemente?')) return;
    
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);
      
    if (error) {
      alert('Error eliminando mensaje: ' + error.message);
    } else {
      setContacts(contacts.filter(c => c.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#030303]">
        <div className="relative">
          <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-50 rounded-full animate-pulse"></div>
          <Loader2 className="w-10 h-10 animate-spin text-cyan-400 relative z-10" />
        </div>
      </div>
    );
  }

  // LOGIN VIEW
  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 relative overflow-hidden bg-[#030303]">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="w-full max-w-md bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 sm:p-10 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-[2.5rem] pointer-events-none"></div>
          
          <div className="flex flex-col items-center mb-10 relative z-10">
            <div className="relative mb-6 group">
              <div className="absolute inset-0 bg-cyan-500/30 blur-2xl rounded-full scale-110 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="w-20 h-20 bg-black/60 rounded-3xl flex items-center justify-center border border-white/10 relative z-10 shadow-2xl backdrop-blur-md">
                <ShieldCheck className="w-10 h-10 text-cyan-400" />
              </div>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight mb-2">Terminal Access</h1>
            <p className="text-gray-400 text-sm text-center px-4">Acceso restringido al sistema central de operaciones.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Corporativo</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-black/60 transition-all shadow-inner"
                  placeholder="admin@famdesarrollos.com"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Contraseña</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                  <ShieldCheck size={18} />
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-black/60 transition-all shadow-inner"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            {authError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-2xl flex items-center gap-3 animate-fade-in-up">
                <Zap className="shrink-0 text-red-400" size={18} />
                <p>{authError}</p>
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full relative group overflow-hidden rounded-2xl mt-4">
              <div className="absolute inset-0 bg-white transition-transform duration-500 group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center justify-center gap-2 font-bold py-4 px-6 text-black group-hover:text-white transition-colors duration-500">
                {loading ? <Loader2 size={20} className="animate-spin" /> : <>Autenticar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
              </div>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // DASHBOARD VIEW
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      {/* Navbar Premium */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Activity className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Centro de Control</h1>
              <p className="text-xs text-cyan-400 font-medium">FAM Desarrollos</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 px-5 py-2.5 rounded-full transition-all text-sm font-medium hover:scale-105"
          >
            Cerrar Sesión <LogOut size={16} />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-12 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-cyan-500/10 blur-[100px] pointer-events-none -z-10"></div>
        
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Bandeja de Entrada</h2>
            <p className="text-gray-400">Tenés {contacts.length} {contacts.length === 1 ? 'contacto nuevo' : 'contactos nuevos'} esperando respuesta.</p>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
          
          {fetchingContacts ? (
            <div className="flex flex-col justify-center items-center py-32 relative z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
                <Loader2 className="w-10 h-10 animate-spin text-cyan-500 relative z-10" />
              </div>
              <p className="text-gray-500 mt-4 font-medium">Sincronizando base de datos...</p>
            </div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-32 relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/5 shadow-inner">
                <Mail className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Todo al día</h3>
              <p className="text-gray-400 max-w-sm mx-auto">No tenés nuevos mensajes por el momento. Buen momento para un café.</p>
            </div>
          ) : (
            <div className="overflow-x-auto relative z-10">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-black/40">
                    <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-widest w-1/4">Remitente</th>
                    <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-widest hidden md:table-cell w-1/4">Contacto</th>
                    <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-widest w-2/4">Mensaje</th>
                    <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-widest text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-6 align-top">
                        <div className="font-bold text-white text-lg mb-1">{contact.name}</div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                          <Clock size={12} className="text-cyan-500" />
                          {new Date(contact.created_at).toLocaleDateString('es-AR', {
                            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                          })}
                        </div>
                        <div className="md:hidden mt-4 space-y-2">
                          <a href={`mailto:${contact.email}`} className="text-sm text-gray-400 hover:text-cyan-400 flex items-center gap-2"><Mail size={14}/> {contact.email}</a>
                          <a href={`https://wa.me/${contact.phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-sm text-gray-400 hover:text-green-400 flex items-center gap-2"><Phone size={14}/> {contact.phone}</a>
                        </div>
                      </td>
                      <td className="p-6 align-top hidden md:table-cell">
                        <div className="flex flex-col gap-3">
                          <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-sm text-gray-300 hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400 transition-all w-fit">
                            <Mail size={14}/> {contact.email}
                          </a>
                          <a href={`https://wa.me/${contact.phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-sm text-gray-300 hover:bg-green-500/10 hover:border-green-500/30 hover:text-green-400 transition-all w-fit">
                            <Phone size={14}/> {contact.phone}
                          </a>
                        </div>
                      </td>
                      <td className="p-6 align-top">
                        <div className="bg-black/40 border border-white/5 rounded-2xl p-4 text-sm text-gray-300 leading-relaxed shadow-inner">
                          {contact.message}
                        </div>
                      </td>
                      <td className="p-6 align-top text-right">
                        <button 
                          onClick={() => deleteContact(contact.id)}
                          className="p-3 text-gray-600 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                          title="Eliminar mensaje"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
