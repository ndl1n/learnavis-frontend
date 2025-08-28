import { useMemo, useState, useCallback } from 'react';
import { ChevronDown, ChevronRight, EyeOff } from 'lucide-react';
// 匯入你真正的 SkillNode component
import { SkillNode as RealSkillNode } from './SkillNode'; 
import type { SkillNode, SkillEdge} from '../types';


interface SkillMapCanvasProps {
  nodes: SkillNode[];
  edges: SkillEdge[];
  selectedNode: SkillNode | null;
  onNodeClick: (node: SkillNode) => void;
  onEditNode: (node: SkillNode) => void;
  onAddNode: () => void;
  viewMode: 'edit' | 'view';
}

// 模擬 EmptyState 組件
const EmptyState = ({ onAddNode }: { onAddNode: () => void }) => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center">
      <h3 className="text-lg font-semibold mb-2">No Skills Added</h3>
      <p className="text-gray-600 mb-4">Start building your learning path</p>
      <button 
        onClick={onAddNode}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Add Your First Skill
      </button>
    </div>
  </div>
);

export const SkillMapCanvas = ({ 
  nodes, 
  edges, 
  selectedNode, 
  onNodeClick, 
  onEditNode, 
  onAddNode, 
  viewMode 
}: SkillMapCanvasProps) => {
  const [categoryGroups, setCategoryGroups] = useState<Record<string, { collapsed: boolean; visible: boolean }>>({});
  const [highlightedPath, setHighlightedPath] = useState<string[]>([]);

  // 按類別分組節點
  const groupedNodes = useMemo(() => {
    const groups: Record<string, SkillNode[]> = {};
    nodes.forEach(node => {
      if (!groups[node.data.category]) {
        groups[node.data.category] = [];
      }
      groups[node.data.category].push(node);
    });
    return groups;
  }, [nodes]);

  // 計算學習路徑
  const calculateLearningPath = useCallback((nodeId: string): string[] => {
    const path: string[] = [];
    const visited = new Set<string>();
    
    const findPath = (currentId: string) => {
      if (visited.has(currentId)) return;
      visited.add(currentId);
      path.push(currentId);
      
      // 找到下一個推薦節點
      const nextEdges = edges.filter(edge => edge.source === currentId);
      nextEdges.forEach(edge => {
        if (!visited.has(edge.target)) {
          findPath(edge.target);
        }
      });
    };
    
    findPath(nodeId);
    // return path;
    return []; // 暫時返回空，因為連接線渲染被註解
  }, [edges]);
  
  // *** 注意：連接線渲染邏輯 ***
  // 以下邏輯在目前的 Grid (網格) 佈局下無法正常工作，因為它需要每個節點的精確 X/Y 座標。
  // 若要啟用它，你需要將佈局改為 `position: absolute`，並使用 `node.position.x` 和 `node.position.y` 來定位節點。
  // 推薦使用 react-flow 等函式庫來處理這種複雜的畫布互動。
  // const renderConnections = useMemo(() => {
  //   return edges.map((edge) => {
  //     const sourceNode = nodes.find(n => n.id === edge.source);
  //     const targetNode = nodes.find(n => n.id === edge.target);
  //     if (!sourceNode || !targetNode) return null;
      
  //     const sourceX = sourceNode.position.x + 130;
  //     const sourceY = sourceNode.position.y + 80;
  //     const targetX = targetNode.position.x + 130;
  //     const targetY = targetNode.position.y + 80;
      
  //     const midX = (sourceX + targetX) / 2;
  //     const midY = (sourceY + targetY) / 2;
  //     const dx = targetX - sourceX;
  //     const dy = targetY - sourceY;
  //     const distance = Math.sqrt(dx * dx + dy * dy);
      
  //     const controlX = midX + (dy / distance) * 20;
  //     const controlY = midY - (dx / distance) * 20;
      
  //     const pathData = `M ${sourceX} ${sourceY} Q ${controlX} ${controlY} ${targetX} ${targetY}`;
      
  //     // 根據邊類型設置樣式
  //     const getEdgeStyle = (type?: string) => {
  //       switch (type) {
  //         case 'prerequisite':
  //           return { stroke: '#ef4444', strokeWidth: '3', opacity: 0.8 };
  //         case 'recommended':
  //           return { stroke: '#3b82f6', strokeWidth: '2', opacity: 0.7 };
  //         case 'related':
  //           return { stroke: '#6b7280', strokeWidth: '1', opacity: 0.5 };
  //         default:
  //           return { stroke: '#e5e7eb', strokeWidth: '2', opacity: 0.6 };
  //       }
  //     };
      
  //     const style = getEdgeStyle(edge.type);
  //     const isHighlighted = highlightedPath.includes(edge.source) && highlightedPath.includes(edge.target);
      
  //     return (
  //       <g key={edge.id}>
  //         {/* 連接線陰影 */}
  //         <path
  //           d={pathData}
  //           stroke="#000000"
  //           strokeWidth={String(Number(style.strokeWidth) + 1)}
  //           strokeDasharray={edge.type === 'recommended' ? "8,4" : "none"}
  //           fill="none"
  //           opacity="0.1"
  //           transform="translate(2, 2)"
  //         />
  //         {/* 主連接線 */}
  //         <path
  //           d={pathData}
  //           stroke={isHighlighted ? '#fbbf24' : style.stroke}
  //           strokeWidth={isHighlighted ? '4' : style.strokeWidth}
  //           strokeDasharray={edge.type === 'recommended' ? "8,4" : "none"}
  //           fill="none"
  //           opacity={isHighlighted ? 1 : style.opacity}
  //           className="drop-shadow-sm transition-all duration-300"
  //         />
  //         {/* 箭頭標記 */}
  //         <circle
  //           cx={targetX - (dx / distance) * 15}
  //           cy={targetY - (dy / distance) * 15}
  //           r={isHighlighted ? "4" : "3"}
  //           fill={isHighlighted ? '#fbbf24' : '#9ca3af'}
  //           className="drop-shadow-sm"
  //         />
  //         {/* 邊類型標籤 */}
  //         {edge.type && (
  //           <text
  //             x={midX}
  //             y={midY - 10}
  //             textAnchor="middle"
  //             className="text-xs fill-gray-600 font-medium"
  //             style={{ fontSize: '10px' }}
  //           >
  //             {edge.type}
  //           </text>
  //         )}
  //       </g>
  //     );
  //   });
  // }, [edges, nodes, highlightedPath]);

  // 切換類別顯示狀態
  const toggleCategory = (category: string, action: 'collapse' | 'visibility') => {
    setCategoryGroups(prev => ({
      ...prev,
      [category]: {
        collapsed: action === 'collapse' ? !prev[category]?.collapsed : prev[category]?.collapsed || false,
        visible: action === 'visibility' ? !prev[category]?.visible : prev[category]?.visible !== false
      }
    }));
  };

  const handleNodeClick = (node: SkillNode) => {
    onNodeClick(node);
    const path = calculateLearningPath(node.id);
    setHighlightedPath(path);
  };
  
  // 渲染類別組
  const renderCategoryGroups = () => {
    return Object.entries(groupedNodes).map(([category, categoryNodes]) => {
      const groupState = categoryGroups[category] || { collapsed: false, visible: true };
      const categoryColor = {
        'Frontend': 'border-blue-200 bg-blue-50/50',
        'Backend': 'border-green-200 bg-green-50/50',
        'Programming': 'border-purple-200 bg-purple-50/50',
        'Framework': 'border-orange-200 bg-orange-50/50',
        'Project': 'border-pink-200 bg-pink-50/50',
        'Design': 'border-indigo-200 bg-indigo-50/50'
      }[category] || 'border-gray-200 bg-gray-50/50';

      if (!groupState.visible) return null;

      return (
        <div 
          key={category} 
          className={`mb-6 border-2 rounded-xl p-4 backdrop-blur-sm ${categoryColor} transition-all duration-300`}
        >
          {/* 類別標題 */}
          <div className="flex items-center justify-between mb-4">
            {/* <h3 className="font-semibold text-lg">{category} ({categoryNodes.length})</h3> */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleCategory(category, 'collapse')}
                className="p-1 hover:bg-white/50 rounded"
              >
                {groupState.collapsed ? 
                  <ChevronRight className="w-4 h-4" /> : 
                  <ChevronDown className="w-4 h-4" />
                }
              </button>
              <h3 className="font-semibold text-lg">{category}</h3>
              <span className="text-sm text-gray-600">({categoryNodes.length})</span>
            </div>
            <button
              onClick={() => toggleCategory(category, 'visibility')}
              className="p-1 hover:bg-white/50 rounded"
              title="Hide Category"
            >
              <EyeOff className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* 節點網格 - 使用你真正的 SkillNode component */}
          {!groupState.collapsed && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryNodes.map((node) => (
                <RealSkillNode
                  key={node.id}
                  data={node.data}
                  selected={selectedNode?.id === node.id}
                  onClick={() => handleNodeClick(node)}
                  onEdit={() => onEditNode(node)}
                  viewMode={viewMode}
                  isHighlighted={highlightedPath.includes(node.id)}
                />
              ))}
            </div>
          )}
        </div>
      );
    });
  };

  if (nodes.length === 0) {
    return <EmptyState onAddNode={onAddNode} />;
  }

  return (
    <div className="w-full h-full overflow-auto p-6">
      <div className="mb-6 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-lg">
         <h2 className="text-lg font-semibold">Skill Learning Map</h2>
      </div>

      <div className="space-y-6">
        {renderCategoryGroups()}
      </div>

      {/* 連接線畫布 - 目前已停用 */}
      {/* <div className="fixed inset-0 pointer-events-none z-0">
        <svg className="w-full h-full">
          {renderConnections}
        </svg>
      </div> */}
     
    </div>
  );
};