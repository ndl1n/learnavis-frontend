import { useState, useEffect, useCallback } from 'react';
import { Save, Trash2, X } from 'lucide-react';
import type { SkillNode, SkillNodeData, SkillDifficulty, SkillCategory, SkillNodeStatus } from '../../types';

interface NodeModalProps {
  onClose: () => void;
  onSave: (data: SkillNodeData, nodeId?: string) => void;
  onDelete: (nodeId: string) => void;
  isEditing: boolean;
  node: SkillNode | null;
}

// 用於建立新節點時的空白表單資料
const BLANK_NODE_DATA: SkillNodeData = {
    name: '',
    status: 'not-started',
    estimatedHours: 10,
    difficulty: 'Beginner',
    progress: 0,
    description: '',
    prerequisites: [],
    resources: [],
    category: 'Frontend',
};

export const NodeModal = ({ onClose, onSave, onDelete, isEditing, node }: NodeModalProps) => {
    const [formData, setFormData] = useState<SkillNodeData>(BLANK_NODE_DATA);

    useEffect(() => {
        if (isEditing && node) {
            setFormData(node.data);
        } else {
            setFormData(BLANK_NODE_DATA);
        }
    }, [isEditing, node]);

    const handleChange = useCallback((field: keyof SkillNodeData, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleSave = () => {
        if(!formData.name || formData.estimatedHours <= 0) {
            alert('Skill Name and Estimated Hours are required.');
            return;
        }
        onSave(formData, node?.id);
    };

    const handleDelete = () => {
        if (node && window.confirm(`Are you sure you want to delete the skill "${node.data.name}"?`)) {
            onDelete(node.id);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/20">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-gray-900">
                            {isEditing ? 'Edit Skill' : 'Add New Skill'}
                        </h3>
                        <button 
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Skill Name *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                placeholder="Enter skill name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                                placeholder="Describe what you'll learn"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Hours *</label>
                                <input
                                    type="number"
                                    value={formData.estimatedHours}
                                    onChange={(e) => handleChange('estimatedHours', parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                    min="1"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                                <select
                                    value={formData.difficulty}
                                    onChange={(e) => handleChange('difficulty', e.target.value as SkillDifficulty)}
                                    className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                >
                                    <option value="Beginner">Beginner ⭐</option>
                                    <option value="Intermediate">Intermediate ⭐⭐</option>
                                    <option value="Advanced">Advanced ⭐⭐⭐</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => handleChange('category', e.target.value as SkillCategory)}
                                    className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                >
                                    <option value="Frontend">Frontend</option>
                                    <option value="Backend">Backend</option>
                                    <option value="Programming">Programming</option>
                                    <option value="Framework">Framework</option>
                                    <option value="Project">Project</option>
                                    <option value="Design">Design</option>
                                </select>
                            </div>
                            {isEditing && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => handleChange('status', e.target.value as SkillNodeStatus)}
                                        className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                    >
                                        <option value="not-started">Not Started</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                        <option value="locked">Locked</option>
                                    </select>
                                </div>
                            )}
                        </div>
                        {isEditing && formData.status === 'in-progress' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Progress (%)</label>
                                <input
                                    type="number"
                                    value={formData.progress}
                                    onChange={(e) => handleChange('progress', Math.max(0, Math.min(100, parseInt(e.target.value) || 0)))}
                                    className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                    min="0" max="100"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex space-x-3 mt-8 pt-6 border-t border-gray-200">
                        {isEditing && (
                            <button
                                onClick={handleDelete}
                                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete</span>
                            </button>
                        )}
                        <div className="flex-1"></div>
                        <button
                            onClick={onClose}
                            className="px-5 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-all duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 font-medium shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <Save className="w-4 h-4" />
                            <span>{isEditing ? 'Save Changes' : 'Add Skill'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};