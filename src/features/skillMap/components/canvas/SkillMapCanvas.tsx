import { useMemo } from 'react';
import type { SkillNode as SkillNodeType, SkillEdge } from '../../types';
import { SkillNode } from './SkillNode';
import { EmptyState } from './EmptyState';

interface SkillMapCanvasProps {
  nodes: SkillNodeType[];
  edges: SkillEdge[];
  selectedNode: SkillNodeType | null;
  onNodeClick: (node: SkillNodeType) => void;
  onEditNode: (node: SkillNodeType) => void;
  onAddNode: () => void;
  viewMode: 'edit' | 'view';
}

export const SkillMapCanvas = ({ nodes, edges, selectedNode, onNodeClick, onEditNode, onAddNode, viewMode }: SkillMapCanvasProps) => {
    const renderConnections = useMemo(() => {
        return edges.map((edge) => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      if (!sourceNode || !targetNode) return null;
      
      const sourceX = sourceNode.position.x + 130; // Node width / 2
      const sourceY = sourceNode.position.y + 80;  // Node height / 2
      const targetX = targetNode.position.x + 130;
      const targetY = targetNode.position.y + 80;
      
      // Create curved connection
      const midX = (sourceX + targetX) / 2;
      const midY = (sourceY + targetY) / 2;
      const dx = targetX - sourceX;
      const dy = targetY - sourceY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Control point for curve
      const controlX = midX + (dy / distance) * 20;
      const controlY = midY - (dx / distance) * 20;
      
      const pathData = `M ${sourceX} ${sourceY} Q ${controlX} ${controlY} ${targetX} ${targetY}`;
      
      return (
        <g key={edge.id}>
          {/* Connection shadow */}
          <path
            d={pathData}
            stroke="#000000"
            strokeWidth="3"
            strokeDasharray="6,4"
            fill="none"
            opacity="0.1"
            transform="translate(2, 2)"
          />
          {/* Main connection line */}
          <path
            d={pathData}
            stroke="#e5e7eb"
            strokeWidth="2"
            strokeDasharray="6,4"
            fill="none"
            className="drop-shadow-sm"
          />
          {/* Arrow marker */}
          <circle
            cx={targetX - (dx / distance) * 15}
            cy={targetY - (dy / distance) * 15}
            r="3"
            fill="#9ca3af"
            className="drop-shadow-sm"
          />
        </g>
      );
    });
    }, [edges, nodes]);

    if (nodes.length === 0) {
        return <EmptyState onAddNode={onAddNode} />;
    }

    return (
        <div className="w-full h-full overflow-auto p-8">
            <div className="relative min-w-[1400px] min-h-[900px]">
                {/* Grid Background */}
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                <svg width="100%" height="100%">
                    <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                    </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
                </div>

                {/* Connection lines */}
                <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
                {renderConnections}
                </svg>

                {/* Skill Nodes */}
                <div className="relative" style={{ zIndex: 2 }}>
                {nodes.map((node) => (
                    <div
                    key={node.id}
                    className="absolute transition-all duration-300 ease-out"
                    style={{
                        left: node.position.x,
                        top: node.position.y,
                    }}
                    >
                    <SkillNode
                        data={node.data}
                        // nodeId={node.id}
                        // position={node.position}
                        selected={selectedNode?.id === node.id}
                        onClick={() => onNodeClick(node)}
                        onEdit={() => onEditNode(node)}
                        viewMode={viewMode}
                    />
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};