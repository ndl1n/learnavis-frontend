import { FileText, Image, Link, Tag } from 'lucide-react';
import type { TaskData } from '../../types';

interface NotesTabProps {
  taskData: TaskData;
  onUpdate: <K extends keyof TaskData>(path: K, value: TaskData[K]) => void;
}


export const NotesTab = ({ taskData, onUpdate }: NotesTabProps) => {
    return (
        <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Learning Notes</h2>
                <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:bg-white/50 rounded-xl transition-all duration-300">
                    <Image className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-white/50 rounded-xl transition-all duration-300">
                    <Link className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-white/50 rounded-xl transition-all duration-300">
                    <Tag className="w-5 h-5" />
                </button>
                </div>
            </div>

            <div className="space-y-4">
                <textarea
                value={taskData.notes}
                onChange={(e) => onUpdate('notes', e.target.value)}
                placeholder="Start taking your learning notes here... You can use Markdown syntax!"
                className="w-full h-96 px-6 py-4 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none font-mono text-sm"
                />
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    {taskData.notes.length} characters
                </span>
                <span className="text-xs">Tip: Use Markdown syntax for formatting</span>
                </div>
            </div>
            </div>

            {/* Notes Preview */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Preview</h3>
            <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {taskData.notes || 'Your notes will appear here...'}
                </div>
            </div>
            </div>
        </div>
    )
}

            