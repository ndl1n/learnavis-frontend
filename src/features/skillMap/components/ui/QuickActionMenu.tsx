import { Plus, Save, RefreshCw, Move } from 'lucide-react';

interface QuickActionMenuProps {
  onAddNode: () => void;
  onSave: () => void;
  hasChanges: boolean;
  isSaving: boolean;
}

export const QuickActionMenu = ({ onAddNode, onSave, hasChanges, isSaving }: QuickActionMenuProps) => {
  return (
    <div className="fixed bottom-24 right-6 z-40"> {/* Adjusted bottom to avoid overlap with status bar */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={onAddNode}
            className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-md hover:shadow-lg"
            title="Add Skill"
          >
            <Plus className="w-5 h-5" />
          </button>
          
          <button
            onClick={onSave}
            disabled={!hasChanges || isSaving}
            className="p-3 bg-white border border-gray-200 text-gray-600 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Save Changes"
          >
            {isSaving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          </button>
          
          <button
            className="p-3 bg-white border border-gray-200 text-gray-600 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
            title="Auto Layout"
          >
            <Move className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};