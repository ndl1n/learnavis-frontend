import { useState } from 'react';
import { SkillMapCanvas } from '../features/skillTree/components/SkillMapCanvas';
import { SkillDetailPanel } from '../features/skillTree/components/SkillDetailPanel';
import { CanvasControls } from '../features/skillTree/components/CanvasControls';
import type { SkillNode, SkillNodeData } from '../features/skillTree/types';
import { useSkills } from '../features/skillTree/hooks/useSkills';

const SkillTreePage = () => {
  // 使用自定義 Hook 獲取資料和載入狀態
  const { nodes, setNodes, isLoading, error } = useSkills();
  
  // UI 狀態
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [layoutMode, setLayoutMode] = useState<'grid' | 'tree' | 'force'>('grid');
  
  // 事件處理函式
  const handleNodeClick = (node: SkillNode) => {
    setSelectedNode(node);
  };

  const handleClosePanel = () => {
    setSelectedNode(null);
  };

  const handleZoom = (direction: 'in' | 'out' | 'reset') => {
    if (direction === 'in') {
      setZoomLevel(prev => Math.min(prev + 0.1, 2));
    } else if (direction === 'out') {
      setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
    } else {
      setZoomLevel(1);
    }
  };
  
  const handleUpdateProgress = (progress: number) => {
     if (!selectedNode) return;
     const updatedNodeData: SkillNodeData = { ...selectedNode.data, progress };
     const updatedNode: SkillNode = {...selectedNode, data: updatedNodeData};
     
     setNodes(currentNodes => currentNodes.map(n => n.id === selectedNode.id ? updatedNode : n));
     setSelectedNode(updatedNode);
  };

  if (isLoading) return <div className="flex items-center justify-center h-screen"><h1>Loading Skill Map...</h1></div>;
  if (error) return <div className="flex items-center justify-center h-screen"><h1>{error}</h1></div>;

  return (
    <div className="relative w-full h-screen bg-gray-50 font-sans overflow-hidden">
      <SkillMapCanvas
        nodes={nodes}
        edges={[]} // 暫時傳入空的 edges
        selectedNode={selectedNode}
        onNodeClick={handleNodeClick}
        onEditNode={(node) => console.log('Edit:', node)}
        onAddNode={() => console.log('Add new node')}
        viewMode="view"
      />
      <CanvasControls
        zoomLevel={zoomLevel}
        onZoom={handleZoom}
        viewMode="view"
        layoutMode={layoutMode}
        onLayoutChange={setLayoutMode}
        showConnections={true}
        onToggleConnections={() => {}}
        showProgress={true}
        onToggleProgress={() => {}}
        onAutoLayout={() => {}}
        onFocusPath={() => {}}
        onShowStats={() => {}}
      />
      {selectedNode && (
        <SkillDetailPanel
          skill={selectedNode.data}
          onClose={handleClosePanel}
          onEdit={() => console.log('Edit:', selectedNode)}
          onDelete={() => console.log('Delete:', selectedNode)}
          onStartLearning={() => console.log('Start learning:', selectedNode)}
          onMarkComplete={() => console.log('Mark complete:', selectedNode)}
          onUpdateProgress={handleUpdateProgress}
          viewMode="view"
        />
      )}
    </div>
  );
};

export default SkillTreePage;