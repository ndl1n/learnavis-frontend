import { useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Grid3X3, 
  Route,
  Target,
  BarChart3,
  Settings
} from 'lucide-react';

interface CanvasControlsProps {
  zoomLevel: number;
  onZoom: (direction: 'in' | 'out' | 'reset') => void;
  viewMode: 'edit' | 'view';
  layoutMode: 'grid' | 'tree' | 'force';
  onLayoutChange: (mode: 'grid' | 'tree' | 'force') => void;
  showConnections: boolean;
  onToggleConnections: () => void;
  showProgress: boolean;
  onToggleProgress: () => void;
  onAutoLayout: () => void;
  onFocusPath: () => void;
  onShowStats: () => void;
}

export const CanvasControls = ({ 
  zoomLevel, 
  onZoom,
//   viewMode,
  layoutMode,
  onLayoutChange,
  showConnections,
  onToggleConnections,
  showProgress,
  onToggleProgress,
  onAutoLayout,
  onFocusPath,
  onShowStats
}: CanvasControlsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const ControlButton = ({ 
    onClick, 
    icon: Icon, 
    tooltip, 
    active = false,
    variant = 'default' 
  }: {
    onClick: () => void;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    tooltip: string;
    active?: boolean;
    variant?: 'default' | 'primary' | 'success';
  }) => {
    const baseClasses = "p-2 rounded-lg transition-all duration-300 relative group";
    const variants = {
      default: active 
        ? "bg-blue-100 text-blue-600 hover:bg-blue-200" 
        : "hover:bg-gray-100 text-gray-600",
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      success: "bg-green-500 text-white hover:bg-green-600"
    };

    return (
      <button 
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]}`}
        onMouseEnter={() => setShowTooltip(tooltip)}
        onMouseLeave={() => setShowTooltip(null)}
        title={tooltip}
      >
        <Icon className="w-4 h-4" />
        {showTooltip === tooltip && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-900 text-white rounded whitespace-nowrap z-50">
            {tooltip}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-2 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="absolute top-4 right-4 z-30 space-y-2">
      {/* 主控制面板 */}
      <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-white/20">
        {/* 縮放控制 */}
        <ControlButton 
          onClick={() => onZoom('in')}
          icon={ZoomIn}
          tooltip="Zoom In"
        />
        
        <button 
          onClick={() => onZoom('reset')}
          className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-300 font-mono"
          title="Reset Zoom"
        >
          {Math.round(zoomLevel * 100)}%
        </button>
        
        <ControlButton 
          onClick={() => onZoom('out')}
          icon={ZoomOut}
          tooltip="Zoom Out"
        />
        
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        
        <ControlButton 
          onClick={onAutoLayout}
          icon={Maximize2}
          tooltip="Fit to Screen"
        />

        {/* 展開/收縮按鈕 */}
        <ControlButton 
          onClick={() => setIsExpanded(!isExpanded)}
          icon={Settings}
          tooltip={isExpanded ? "Hide Controls" : "Show More Controls"}
          active={isExpanded}
        />
      </div>

      {/* 擴展控制面板 */}
      {isExpanded && (
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/20 space-y-3 min-w-[200px]">
          {/* 布局模式 */}
          <div>
            <h4 className="text-xs font-medium text-gray-700 mb-2">Layout Mode</h4>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => onLayoutChange('grid')}
                className={`p-2 rounded-md text-xs transition-all ${
                  layoutMode === 'grid' 
                    ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid3X3 className="w-3 h-3 mx-auto mb-1" />
                Grid
              </button>
              <button
                onClick={() => onLayoutChange('tree')}
                className={`p-2 rounded-md text-xs transition-all ${
                  layoutMode === 'tree' 
                    ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Route className="w-3 h-3 mx-auto mb-1" />
                Tree
              </button>
              <button
                onClick={() => onLayoutChange('force')}
                className={`p-2 rounded-md text-xs transition-all ${
                  layoutMode === 'force' 
                    ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Target className="w-3 h-3 mx-auto mb-1" />
                Force
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-3">
            <h4 className="text-xs font-medium text-gray-700 mb-2">Display Options</h4>
            <div className="space-y-2">
              {/* 連接線開關 */}
              <label className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Show Connections</span>
                <button
                  onClick={onToggleConnections}
                  className={`relative w-8 h-4 rounded-full transition-all ${
                    showConnections ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute w-3 h-3 bg-white rounded-full top-0.5 transition-all ${
                      showConnections ? 'left-4' : 'left-0.5'
                    }`}
                  />
                </button>
              </label>

              {/* 進度顯示開關 */}
              <label className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Show Progress</span>
                <button
                  onClick={onToggleProgress}
                  className={`relative w-8 h-4 rounded-full transition-all ${
                    showProgress ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute w-3 h-3 bg-white rounded-full top-0.5 transition-all ${
                      showProgress ? 'left-4' : 'left-0.5'
                    }`}
                  />
                </button>
              </label>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-3">
            <h4 className="text-xs font-medium text-gray-700 mb-2">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onFocusPath}
                className="p-2 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-md text-xs transition-all flex items-center justify-center space-x-1"
              >
                <Route className="w-3 h-3" />
                <span>Focus Path</span>
              </button>
              <button
                onClick={onShowStats}
                className="p-2 bg-orange-50 text-orange-600 hover:bg-orange-100 rounded-md text-xs transition-all flex items-center justify-center space-x-1"
              >
                <BarChart3 className="w-3 h-3" />
                <span>Stats</span>
              </button>
            </div>
          </div>

          {/* 快速導航 */}
          <div className="border-t border-gray-200 pt-3">
            <h4 className="text-xs font-medium text-gray-700 mb-2">Quick Navigation</h4>
            <div className="grid grid-cols-2 gap-1 text-xs">
              <button className="p-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded text-center transition-all">
                Completed
              </button>
              <button className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded text-center transition-all">
                In Progress
              </button>
              <button className="p-1.5 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded text-center transition-all">
                Not Started
              </button>
              <button className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded text-center transition-all">
                Locked
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 統計信息面板 */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/20">
        <div className="grid grid-cols-2 gap-3 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">2</div>
            <div className="text-xs text-gray-600">Completed</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">1</div>
            <div className="text-xs text-gray-600">In Progress</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-600">2</div>
            <div className="text-xs text-gray-600">Not Started</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-600">1</div>
            <div className="text-xs text-gray-600">Locked</div>
          </div>
        </div>
        
        {/* 總體進度條 */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Overall Progress</span>
            <span>27%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 h-1.5 rounded-full w-[27%] transition-all duration-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};