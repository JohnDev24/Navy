
import React from 'react';
import { Mail, Briefcase, Calendar, Edit3, Trash2, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Recruit, ApplicationStatus } from '../types';

interface RecruitCardProps {
  recruit: Recruit;
  onEdit: (recruit: Recruit) => void;
  onDelete: (id: string) => void;
}

const RecruitCard: React.FC<RecruitCardProps> = ({ recruit, onEdit, onDelete }) => {
  const getStatusIcon = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatus.ACCEPTED: return <CheckCircle className="w-4 h-4 text-green-500" />;
      case ApplicationStatus.PENDING: return <Clock className="w-4 h-4 text-yellow-500" />;
      case ApplicationStatus.REJECTED: return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case ApplicationStatus.INTERVIEW: return <Calendar className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatus.ACCEPTED: return 'bg-green-500/10 text-green-500 border-green-500/20';
      case ApplicationStatus.PENDING: return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case ApplicationStatus.REJECTED: return 'bg-red-500/10 text-red-500 border-red-500/20';
      case ApplicationStatus.INTERVIEW: return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  return (
    <div className="bg-navy-deep border border-white/5 p-6 rounded-xl hover:border-gold/30 transition-all shadow-lg group">
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4">
          <div className="w-14 h-14 bg-navy-dark rounded-full flex items-center justify-center border border-white/10 text-xl font-bold text-gold">
            {recruit.firstName[0]}{recruit.lastName[0]}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors">
              {recruit.firstName} {recruit.lastName}
            </h3>
            <div className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(recruit.status)}`}>
              {getStatusIcon(recruit.status)}
              {recruit.status}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(recruit)}
            className="p-2 bg-white/5 hover:bg-gold hover:text-navy-dark rounded-lg transition-all"
            title="Edit Application"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete(recruit.id)}
            className="p-2 bg-white/5 hover:bg-red-500 hover:text-white rounded-lg transition-all"
            title="Withdraw Application"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <Mail className="w-4 h-4" /> {recruit.email}
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <Briefcase className="w-4 h-4" /> {recruit.branch}
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <Calendar className="w-4 h-4" /> Enlisted {new Date(recruit.appliedDate).toLocaleDateString()}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5">
        <p className="text-sm text-gray-400 line-clamp-2 italic">
          "{recruit.bio}"
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {recruit.skills.map(skill => (
          <span key={skill} className="px-2 py-1 bg-navy-dark text-[10px] text-gray-300 rounded border border-white/10 uppercase tracking-tighter">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RecruitCard;
