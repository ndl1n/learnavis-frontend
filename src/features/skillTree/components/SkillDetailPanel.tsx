import { useState } from 'react';
import { 
  X, 
  Clock, 
  CheckCircle, 
  Play, 
  BookOpen, 
  ExternalLink, 
  Users, 
  Target,
  TrendingUp,
  Calendar,
  Award,
  ChevronRight,
  Edit,
  Trash2
} from 'lucide-react';

interface SkillResource {
  title: string;
  url: string;
  type: 'video' | 'article' | 'course' | 'exercise';
  duration?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  provider?: string;
}

interface SkillNodeData {
  id: string;
  name: string;
  description?: string;
  status: 'completed' | 'in-progress' | 'not-started' | 'locked';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Frontend' | 'Backend' | 'Programming' | 'Framework' | 'Project' | 'Design';
  estimatedHours: number;
  progress?: number;
  resources?: SkillResource[];
  prerequisites?: string[];
  learningPath?: string[];
  masteryLevel?: number;
  tags?: string[];
  completedDate?: string;
  startedDate?: string;
  notes?: string;
}

interface SkillDetailPanelProps {
  skill: SkillNodeData | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onStartLearning: () => void;
  onMarkComplete: () => void;
  onUpdateProgress: (progress: number) => void;
  viewMode: 'edit' | 'view';
}

export const SkillDetailPanel = ({
  skill,
  onClose,
  onEdit,
  onDelete,
  onStartLearning,
  onMarkComplete,
  onUpdateProgress,
  viewMode
}: SkillDetailPanelProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'progress' | 'notes'>('overview');
  const [newNote, setNewNote] = useState('');

  if (!skill) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Frontend': 'bg-blue-500',
      'Backend': 'bg-green-500',
      'Programming': 'bg-purple-500',
      'Framework': 'bg-orange-500',
      'Project': 'bg-pink-500',
      'Design': 'bg-indigo-500'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'article': return <BookOpen className="w-4 h-4" />;
      case 'course': return <Users className="w-4 h-4" />;
      case 'exercise': return <Target className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const TabButton = ({ tab, label }: { tab: string; label: string }) => (
    <button
      onClick={() => setActiveTab(tab as 'overview' | 'resources' | 'progress' | 'notes')}
      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
        activeTab === tab
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl border-l border-gray-200 z-40 transform transition-transform duration-300 ease-out overflow-hidden flex flex-col">
      {/* Header */}
      <div className={`${getCategoryColor(skill.category)} text-white p-6`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">{skill.name}</h2>
            <div className="flex items-center space-x-3 text-sm text-white/90">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {skill.estimatedHours}h
              </span>
              <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(skill.difficulty)} text-black`}>
                {skill.difficulty}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {skill.status === 'in-progress' && skill.progress && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-white/90 mb-2">
              <span>Progress</span>
              <span>{skill.progress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white/80 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${skill.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {skill.status === 'not-started' && (
            <button
              onClick={onStartLearning}
              className="flex-1 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Learning
            </button>
          )}
          {skill.status === 'in-progress' && (
            <button
              onClick={onMarkComplete}
              className="flex-1 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark Complete
            </button>
          )}
          {viewMode === 'edit' && (
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 px-6 py-3 bg-gray-50">
        <div className="flex space-x-1">
          <TabButton tab="overview" label="Overview" />
          <TabButton tab="resources" label="Resources" />
          <TabButton tab="progress" label="Progress" />
          <TabButton tab="notes" label="Notes" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Description */}
            {skill.description && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{skill.description}</p>
              </div>
            )}

            {/* Prerequisites */}
            {skill.prerequisites && skill.prerequisites.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Prerequisites</h3>
                <div className="space-y-2">
                  {skill.prerequisites.map((prereq, index) => (
                    <div key={index} className="flex items-center p-2 bg-amber-50 border border-amber-200 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-amber-600 mr-2" />
                      <span className="text-sm text-amber-800">{prereq}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Learning Path */}
            {skill.learningPath && skill.learningPath.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Learning Path</h3>
                <div className="space-y-2">
                  {skill.learningPath.map((step, index) => (
                    <div key={index} className="flex items-center p-2 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium mr-3">
                        {index + 1}
                      </div>
                      <span className="text-sm text-blue-800">{step}</span>
                      <ChevronRight className="w-4 h-4 text-blue-400 ml-auto" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {skill.tags && skill.tags.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-4">
            {skill.resources && skill.resources.length > 0 ? (
              skill.resources.map((resource, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getResourceIcon(resource.type)}
                      <span className="font-medium text-gray-900">{resource.title}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="capitalize">{resource.type}</span>
                    {resource.duration && <span>{resource.duration}</span>}
                    {resource.provider && <span>{resource.provider}</span>}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No resources available yet</p>
                {viewMode === 'edit' && (
                  <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm">
                    Add Resource
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            {/* Mastery Level */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Mastery Level</h3>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Current Level</span>
                  <span>{skill.masteryLevel || 0}%</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500" 
                    style={{ width: `${skill.masteryLevel || 0}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Progress Timeline */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Timeline</h3>
              <div className="space-y-3">
                {skill.startedDate && (
                  <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                    <Calendar className="w-4 h-4 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Started Learning</p>
                      <p className="text-xs text-green-600">{skill.startedDate}</p>
                    </div>
                  </div>
                )}
                {skill.completedDate && (
                  <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Award className="w-4 h-4 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Completed</p>
                      <p className="text-xs text-blue-600">{skill.completedDate}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Update */}
            {skill.status === 'in-progress' && (
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Update Progress</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.progress || 0}
                    onChange={(e) => onUpdateProgress(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-2">
                    <span>0%</span>
                    <span className="font-medium">{skill.progress || 0}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-4">
            {/* Existing Notes */}
            {skill.notes && (
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Your Notes</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{skill.notes}</p>
                </div>
              </div>
            )}

            {/* Add New Note */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Add Note</h3>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Write your learning notes, insights, or reminders..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => {
                  // Handle save note
                  setNewNote('');
                }}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
              >
                Save Note
              </button>
            </div>

            {/* Learning Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Learning Tips
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Break down complex topics into smaller chunks</li>
                <li>• Practice regularly with hands-on projects</li>
                <li>• Join community discussions and forums</li>
                <li>• Document your learning progress</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {viewMode === 'edit' && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Skill
            </button>
            <button
              onClick={onDelete}
              className="px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};