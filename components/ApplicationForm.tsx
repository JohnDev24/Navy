
import React, { useState, useEffect } from 'react';
import { Recruit, Branch } from '../types';

interface ApplicationFormProps {
  onSubmit: (data: Omit<Recruit, 'id' | 'status' | 'appliedDate'>) => void;
  onCancel: () => void;
  initialData?: Recruit;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    branch: Branch.SURFACE,
    bio: '',
    skills: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        email: initialData.email,
        branch: initialData.branch,
        bio: initialData.bio,
        skills: initialData.skills.join(', ')
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s !== '')
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-8">
      <h2 className="font-bebas text-4xl mb-6 text-gold">
        {initialData ? 'Update Enlistment' : 'New Enlistment Application'}
      </h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">First Name</label>
          <input 
            required
            className="w-full bg-navy-dark border border-white/10 rounded px-4 py-3 focus:border-gold outline-none text-white"
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Last Name</label>
          <input 
            required
            className="w-full bg-navy-dark border border-white/10 rounded px-4 py-3 focus:border-gold outline-none text-white"
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Email Address</label>
        <input 
          type="email"
          required
          className="w-full bg-navy-dark border border-white/10 rounded px-4 py-3 focus:border-gold outline-none text-white"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div className="mb-4">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Interested Branch</label>
        <select 
          className="w-full bg-navy-dark border border-white/10 rounded px-4 py-3 focus:border-gold outline-none text-white"
          value={formData.branch}
          onChange={(e) => setFormData({...formData, branch: e.target.value as Branch})}
        >
          {Object.values(Branch).map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Skills (comma separated)</label>
        <input 
          className="w-full bg-navy-dark border border-white/10 rounded px-4 py-3 focus:border-gold outline-none text-white"
          placeholder="e.g. Diving, Leadership, Engineering"
          value={formData.skills}
          onChange={(e) => setFormData({...formData, skills: e.target.value})}
        />
      </div>

      <div className="mb-6">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Tell us why you want to serve</label>
        <textarea 
          required
          rows={4}
          className="w-full bg-navy-dark border border-white/10 rounded px-4 py-3 focus:border-gold outline-none text-white resize-none"
          value={formData.bio}
          onChange={(e) => setFormData({...formData, bio: e.target.value})}
        />
      </div>

      <div className="flex gap-4">
        <button 
          type="submit"
          className="flex-grow bg-gold text-navy-dark font-bold py-4 rounded-lg hover:bg-yellow-400 transition-colors uppercase tracking-widest"
        >
          {initialData ? 'Update Record' : 'Submit Application'}
        </button>
        <button 
          type="button"
          onClick={onCancel}
          className="px-8 border border-white/10 rounded-lg hover:bg-white/5 transition-colors uppercase tracking-widest text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ApplicationForm;
