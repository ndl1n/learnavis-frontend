import { useState, useRef, useEffect } from 'react';
import { CheckCircle, Clock, Lock, BookOpen, Star, Edit, ChevronRight, Target, ExternalLink, Play } from 'lucide-react';
import type { SkillNodeData, SkillNodeStatus, SkillDifficulty, SkillCategory } from '../types'; // 更新路徑


interface SkillNodeProps {
  data: SkillNodeData;
  selected: boolean;
  onClick: () => void;
  onEdit: () => void;
  viewMode: 'edit' | 'view';
  isHighlighted?: boolean;
  showPath?: boolean;
  pathDirection?: 'next' | 'prev';
}

export const SkillNode = ({ 
  data, 
  selected, 
  onClick, 
  onEdit, 
  viewMode,
  isHighlighted = false,
  showPath = false,
  pathDirection
}: SkillNodeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovered && nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10
      });
    }
  }, [isHovered]);

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
    const levels: Record<'Beginner' | 'Intermediate' | 'Advanced', number> = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
    const level = levels[difficulty as keyof typeof levels] || 1;
    return Array.from({ length: 3 }, (_, i) => 
      <Star key={i} className={`w-3 h-3 ${i < level ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
    );
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

  const getNodeSize = () => {
    if (data.category === 'Project') return 'min-w-[280px] max-w-[320px]';
    if (data.difficulty === 'Advanced') return 'min-w-[240px] max-w-[280px]';
    return 'min-w-[220px] max-w-[260px]';
  };

  // 路徑指示器
  const PathIndicator = () => {
    if (!showPath) return null;
    
    return (
      <div className={`absolute -right-6 top-1/2 transform -translate-y-1/2 ${pathDirection === 'next' ? 'text-blue-500' : 'text-gray-400'}`}>
        <ChevronRight className="w-6 h-6 animate-pulse" />
      </div>
    );
  };

  // Tooltip 組件
  const Tooltip = () => {
    if (!showTooltip || !isHovered) return null;

    return (
      <div 
        className="fixed z-50 bg-gray-900 text-white text-sm rounded-lg p-3 shadow-xl max-w-xs"
        style={{
          left: tooltipPosition.x - 150,
          top: tooltipPosition.y - 10,
          transform: 'translateY(-100%)'
        }}
      >
        <div className="space-y-2">
          {data.prerequisites && data.prerequisites.length > 0 && (
            <div>
              <p className="font-medium text-blue-300">Prerequisites:</p>
              <p className="text-xs">{data.prerequisites.join(', ')}</p>
            </div>
          )}
          {data.description && (
            <div>
              <p className="font-medium text-green-300">Description:</p>
              <p className="text-xs">{data.description}</p>
            </div>
          )}
          {data.masteryLevel !== undefined && (
            <div>
              <p className="font-medium text-yellow-300">Mastery:</p>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-700 rounded-full h-1.5">
                  <div 
                    className="bg-yellow-400 h-1.5 rounded-full" 
                    style={{ width: `${data.masteryLevel}%` }}
                  />
                </div>
                <span className="text-xs">{data.masteryLevel}%</span>
              </div>
            </div>
          )}
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
      </div>
    );
  };

  return (
    <>
      <div 
        ref={nodeRef}
        onClick={onClick} 
        onMouseEnter={() => {
          setIsHovered(true);
          setTimeout(() => setShowTooltip(true), 500);
        }} 
        onMouseLeave={() => {
          setIsHovered(false);
          setShowTooltip(false);
        }}
        className={`relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 transition-all duration-300 cursor-pointer ${getNodeSize()} group ${
          selected 
            ? 'border-blue-500 shadow-blue-200 shadow-xl scale-105 z-10' 
            : isHighlighted
              ? 'border-yellow-400 shadow-yellow-200 shadow-lg scale-102'
              : 'border-white/30 hover:border-blue-300 hover:shadow-xl hover:scale-102'
        }`}
        style={{ 
          transform: `${selected ? 'scale(1.05)' : isHighlighted ? 'scale(1.02)' : ''} ${isHovered && !selected && !isHighlighted ? 'scale(1.02)' : ''}`, 
          zIndex: selected ? 10 : isHighlighted ? 8 : 1 
        }}
      >
        {/* 狀態指示器 */}
        <div className={`bg-gradient-to-r ${getStatusColor(data.status)} rounded-t-2xl p-4`}>
          <div className="flex items-center justify-between text-white mb-2">
            <div className="flex items-center space-x-2">
              {getStatusIcon(data.status)}
              <span className="text-sm font-medium capitalize">{data.status.replace('-', ' ')}</span>
            </div>
            <div className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(data.category)} bg-white/20 text-white/90`}>
              {data.category}
            </div>
          </div>
          
          {/* 進度條 */}
          {data.status === 'in-progress' && data.progress && data.progress > 0 && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-white/80 mb-1">
                <span>Progress</span>
                <span>{data.progress}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1.5">
                <div 
                  className="bg-white/80 h-1.5 rounded-full transition-all duration-500" 
                  style={{ width: `${data.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* 內容區域 */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">{data.name}</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between text-gray-600">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />Duration:
              </span>
              <span className="font-medium text-gray-900">{data.estimatedHours}h</span>
            </div>
            
            <div className="flex items-center justify-between text-gray-600">
              <span>Difficulty:</span>
              <div className="flex space-x-0.5">{getDifficultyStars(data.difficulty)}</div>
            </div>

            {/* 新增：掌握度顯示 */}
            {data.masteryLevel !== undefined && (
              <div className="flex items-center justify-between text-gray-600">
                <span className="flex items-center">
                  <Target className="w-4 h-4 mr-1" />Mastery:
                </span>
                <span className="font-medium text-gray-900">{data.masteryLevel}%</span>
              </div>
            )}

            {/* 新增：資源數量 */}
            {data.resources && data.resources.length > 0 && (
              <div className="flex items-center justify-between text-gray-600">
                <span className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />Resources:
                </span>
                <span className="font-medium text-gray-900">{data.resources.length}</span>
              </div>
            )}

            {data.description && (
              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{data.description}</p>
            )}
          </div>

          {/* 新增：快速動作按鈕 */}
          {data.resources && data.resources.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Quick Actions:</span>
                <div className="flex space-x-1">
                  <button 
                    className="p-1.5 hover:bg-blue-50 rounded transition-colors"
                    title="View Resources"
                    onClick={(e) => {
                      e.stopPropagation();
                      // 處理查看資源
                    }}
                  >
                    <ExternalLink className="w-3 h-3 text-blue-500" />
                  </button>
                  {data.status === 'not-started' && (
                    <button 
                      className="p-1.5 hover:bg-green-50 rounded transition-colors"
                      title="Start Learning"
                      onClick={(e) => {
                        e.stopPropagation();
                        // 處理開始學習
                      }}
                    >
                      <Play className="w-3 h-3 text-green-500" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 編輯按鈕 */}
        {viewMode === 'edit' && (
          <button 
            className={`absolute -top-2 -right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:bg-blue-600 hover:scale-110 ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            onClick={(e) => { 
              e.stopPropagation(); 
              onEdit(); 
            }}
          >
            <Edit className="w-3 h-3" />
          </button>
        )}

        {/* 狀態指示點 */}
        <div className={`absolute top-3 left-3 w-2 h-2 rounded-full bg-gradient-to-r ${getStatusColor(data.status)} shadow-sm`} />
        
        {/* 高亮邊框效果 */}
        {isHighlighted && (
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl opacity-20 animate-pulse" />
        )}

        {/* 路徑指示器 */}
        <PathIndicator />
      </div>

      {/* Tooltip */}
      <Tooltip />
    </>
  );
};