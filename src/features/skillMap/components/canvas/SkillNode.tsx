import { useState } from 'react';
import { CheckCircle, Clock, Lock, BookOpen, Star, Edit } from 'lucide-react';
import type { SkillNodeData, SkillNodeStatus, SkillDifficulty, SkillCategory } from '../../types';

interface SkillNodeProps {
  data: SkillNodeData;
  selected: boolean;
  onClick: () => void;
  onEdit: () => void;
  viewMode: 'edit' | 'view';
}

export const SkillNode = ({ data, selected, onClick, onEdit, viewMode }: SkillNodeProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const getStatusColor = (status: SkillNodeStatus) => {
        switch (status) {
            case 'completed': return 'from-green-500 to-emerald-400';
            case 'in-progress': return 'from-blue-500 to-cyan-400';
            case 'not-started': return 'from-gray-400 to-gray-500';
            case 'locked': return 'from-red-400 to-pink-400';
            default: return 'from-gray-400 to-gray-500';
        }
    };

    const getStatusIcon = (status: SkillNodeStatus) => {
        switch (status) {
            case 'completed': return <CheckCircle className="w-4 h-4 text-white" />;
            case 'in-progress': return <Clock className="w-4 h-4 text-white" />;
            case 'locked': return <Lock className="w-4 h-4 text-white" />;
            default: return <BookOpen className="w-4 h-4 text-white" />;
        }
    };

    const getDifficultyStars = (difficulty: SkillDifficulty) => {
        const levels = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
        const level = levels[difficulty] || 1;
        return Array.from({ length: 3 }, (_, i) => <Star key={i} className={`w-3 h-3 ${i < level ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />);
    };
    
    const getCategoryColor = (category: SkillCategory) => {
        switch (category) {
            case 'Frontend': return 'bg-blue-100 text-blue-700';
            case 'Backend': return 'bg-green-100 text-green-700';
            case 'Programming': return 'bg-purple-100 text-purple-700';
            case 'Framework': return 'bg-orange-100 text-orange-700';
            case 'Project': return 'bg-pink-100 text-pink-700';
            case 'Design': return 'bg-indigo-100 text-indigo-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div onClick={onClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
            className={`relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 transition-all duration-300 cursor-pointer min-w-[220px] max-w-[260px] group ${selected ? 'border-blue-500 shadow-blue-200 shadow-xl scale-105 z-10' : 'border-white/30 hover:border-blue-300 hover:shadow-xl hover:scale-102'}`}
            style={{ transform: `${selected ? 'scale(1.05)' : ''} ${isHovered && !selected ? 'scale(1.02)' : ''}`, zIndex: selected ? 10 : 1 }}
        >
            <div className={`bg-gradient-to-r ${getStatusColor(data.status)} rounded-t-2xl p-4`}>
                <div className="flex items-center justify-between text-white mb-2">
                    <div className="flex items-center space-x-2">{getStatusIcon(data.status)}<span className="text-sm font-medium capitalize">{data.status.replace('-', ' ')}</span></div>
                    <div className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(data.category)} bg-white/20 text-white/90`}>{data.category}</div>
                </div>
                {data.status === 'in-progress' && data.progress > 0 && (
                    <div className="mt-2"><div className="flex justify-between text-xs text-white/80 mb-1"><span>Progress</span><span>{data.progress}%</span></div><div className="w-full bg-white/20 rounded-full h-1.5"><div className="bg-white/80 h-1.5 rounded-full transition-all duration-500" style={{ width: `${data.progress}%` }}></div></div></div>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">{data.name}</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between text-gray-600"><span className="flex items-center"><Clock className="w-4 h-4 mr-1" />Duration:</span><span className="font-medium text-gray-900">{data.estimatedHours}h</span></div>
                    <div className="flex items-center justify-between text-gray-600"><span>Difficulty:</span><div className="flex space-x-0.5">{getDifficultyStars(data.difficulty)}</div></div>
                    {data.description && <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{data.description}</p>}
                </div>
            </div>
            {viewMode === 'edit' && (
                <button className={`absolute -top-2 -right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:bg-blue-600 hover:scale-110 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                    onClick={(e) => { e.stopPropagation(); onEdit(); }}>
                    <Edit className="w-3 h-3" />
                </button>
            )}
            <div className={`absolute top-3 left-3 w-2 h-2 rounded-full bg-gradient-to-r ${getStatusColor(data.status)} shadow-sm`}></div>
        </div>
    );
};