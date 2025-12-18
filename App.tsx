
import React, { useState, useEffect } from 'react';
import { 
  Anchor, 
  Shield, 
  Users, 
  Ship, 
  Plane, 
  Microscope, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Edit3, 
  Bot, 
  Menu, 
  X,
  Search
} from 'lucide-react';
import { Recruit, Branch, ApplicationStatus } from './types';
import ApplicationForm from './components/ApplicationForm';
import RecruitCard from './components/RecruitCard';
import CareerAdvisor from './components/CareerAdvisor';

const App: React.FC = () => {
  const [recruits, setRecruits] = useState<Recruit[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecruit, setEditingRecruit] = useState<Recruit | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'recruits' | 'advisor'>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize with some dummy data
  useEffect(() => {
    const saved = localStorage.getItem('navy_recruits');
    if (saved) {
      setRecruits(JSON.parse(saved));
    } else {
      const initial: Recruit[] = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'j.doe@example.mil',
          branch: Branch.AVIATION,
          bio: 'Former civilian pilot with 500 flight hours.',
          status: ApplicationStatus.PENDING,
          skills: ['Pilot', 'Navigation'],
          appliedDate: new Date().toISOString()
        }
      ];
      setRecruits(initial);
      localStorage.setItem('navy_recruits', JSON.stringify(initial));
    }
  }, []);

  const saveRecruits = (data: Recruit[]) => {
    setRecruits(data);
    localStorage.setItem('navy_recruits', JSON.stringify(data));
  };

  const handleAddRecruit = (newRecruit: Omit<Recruit, 'id' | 'status' | 'appliedDate'>) => {
    const fullRecruit: Recruit = {
      ...newRecruit,
      id: Math.random().toString(36).substr(2, 9),
      status: ApplicationStatus.PENDING,
      appliedDate: new Date().toISOString()
    };
    saveRecruits([...recruits, fullRecruit]);
    setIsFormOpen(false);
  };

  const handleUpdateRecruit = (updatedData: Omit<Recruit, 'id' | 'status' | 'appliedDate'>) => {
    if (!editingRecruit) return;
    const updated = recruits.map(r => 
      r.id === editingRecruit.id ? { ...r, ...updatedData } : r
    );
    saveRecruits(updated);
    setEditingRecruit(null);
    setIsFormOpen(false);
  };

  const handleDeleteRecruit = (id: string) => {
    if (window.confirm("Are you sure you want to withdraw this application?")) {
      saveRecruits(recruits.filter(r => r.id !== id));
    }
  };

  const handleEditClick = (recruit: Recruit) => {
    setEditingRecruit(recruit);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-navy-dark border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
              <Anchor className="h-8 w-8 text-gold" />
              <span className="font-bebas text-3xl tracking-wider text-white">OCEANIC VANGUARD</span>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-8">
                {['home', 'recruits', 'advisor'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors uppercase tracking-widest ${
                      activeTab === tab ? 'text-gold border-b-2 border-gold' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
                <button 
                  onClick={() => { setEditingRecruit(null); setIsFormOpen(true); }}
                  className="bg-gold text-navy-dark px-6 py-2 rounded font-bold hover:bg-yellow-400 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> ENLIST NOW
                </button>
              </div>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-navy-deep px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {['home', 'recruits', 'advisor'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab as any); setIsMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 text-white hover:bg-navy-dark rounded-md"
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {activeTab === 'home' && (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <div className="relative h-[80vh] overflow-hidden">
              <img 
                src="https://picsum.photos/seed/navy-ship/1920/1080" 
                className="absolute inset-0 w-full h-full object-cover brightness-50"
                alt="Navy Hero"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent" />
              <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-start">
                <h1 className="font-bebas text-6xl md:text-8xl mb-4 leading-tight">
                  Forged by the Sea, <br />
                  <span className="text-gold">Driven by Excellence</span>
                </h1>
                <p className="max-w-2xl text-xl text-gray-300 mb-8">
                  The ocean is vast. Your potential is vaster. Join the elite force that protects global peace and masters cutting-edge technology.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => { setEditingRecruit(null); setIsFormOpen(true); }}
                    className="bg-gold text-navy-dark px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform"
                  >
                    Start Your Journey
                  </button>
                  <button 
                    onClick={() => setActiveTab('advisor')}
                    className="border border-white/30 backdrop-blur-sm px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-2"
                  >
                    <Bot className="w-5 h-5" /> AI Career Guide
                  </button>
                </div>
              </div>
            </div>

            {/* Branches Section */}
            <div className="bg-navy-dark py-24">
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="font-bebas text-4xl text-center mb-16 tracking-widest">CHOOSE YOUR PATH</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { icon: Ship, title: 'Surface Warfare', desc: 'Command the world\'s most advanced destroyers and carriers.' },
                    { icon: Plane, title: 'Naval Aviation', desc: 'Master the skies and aircraft carrier operations.' },
                    { icon: Microscope, title: 'Nuclear Engineering', desc: 'Power the fleet with advanced reactor technology.' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-navy-deep p-8 border-l-4 border-gold hover:translate-y-[-8px] transition-transform cursor-pointer">
                      <item.icon className="w-12 h-12 text-gold mb-6" />
                      <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                      <p className="text-gray-400 mb-6">{item.desc}</p>
                      <span className="text-gold flex items-center gap-2 group cursor-pointer font-bold">
                        LEARN MORE <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recruits' && (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
              <div>
                <h2 className="font-bebas text-5xl mb-2">Recruit Registry</h2>
                <p className="text-gray-400">Manage pending and active enlistment applications.</p>
              </div>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Search recruits..." 
                    className="bg-navy-deep border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-gold w-64"
                  />
                </div>
                <button 
                  onClick={() => { setEditingRecruit(null); setIsFormOpen(true); }}
                  className="bg-gold text-navy-dark px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-yellow-400"
                >
                  <Plus /> New Application
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recruits.length > 0 ? (
                recruits.map(recruit => (
                  <RecruitCard 
                    key={recruit.id} 
                    recruit={recruit} 
                    onDelete={handleDeleteRecruit}
                    onEdit={handleEditClick}
                  />
                ))
              ) : (
                <div className="col-span-full py-20 text-center bg-navy-deep rounded-xl border-2 border-dashed border-white/10">
                  <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-xl text-gray-400">No recruits found in the registry.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'advisor' && (
          <div className="max-w-4xl mx-auto px-4 py-12">
            <CareerAdvisor />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-navy-dark border-t border-white/10 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Anchor className="h-6 w-6 text-gold" />
            <span className="font-bebas text-2xl tracking-wider">OCEANIC VANGUARD</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-gold">Privacy Policy</a>
            <a href="#" className="hover:text-gold">Service Agreement</a>
            <a href="#" className="hover:text-gold">Support</a>
            <a href="#" className="hover:text-gold">Contact HQ</a>
          </div>
          <p className="text-gray-600 text-sm">© 2024 Oceanic Vanguard. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Modal Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-navy-deep rounded-2xl w-full max-w-2xl border border-white/10 shadow-2xl relative animate-scale-in">
            <button 
              onClick={() => setIsFormOpen(false)}
              className="absolute right-6 top-6 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <ApplicationForm 
              onCancel={() => setIsFormOpen(false)}
              onSubmit={editingRecruit ? handleUpdateRecruit : handleAddRecruit}
              initialData={editingRecruit || undefined}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
