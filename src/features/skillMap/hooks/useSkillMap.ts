import { useState, useCallback, useMemo, useEffect } from 'react';
import type { SkillNode, SkillEdge, ViewMode, PlanStatistics, SkillNodeData } from '../types';
import { initialNodes, initialEdges } from '../_initialData';

export const useSkillMap = () => {
  const [nodes, setNodes] = useState<SkillNode[]>(initialNodes);
  const [edges, setEdges] = useState<SkillEdge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [showNodeModal, setShowNodeModal] = useState(false);
  const [isEditingModal, setIsEditingModal] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('edit');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // This effect can be used to detect changes against an original state if needed
    // For now, any change to nodes marks it as having changes.
  }, [nodes]);

  const planStatistics = useMemo<PlanStatistics>(() => {
    const totalNodes = nodes.length;
    const completedNodes = nodes.filter(n => n.data.status === 'completed').length;
    const inProgressNodes = nodes.filter(n => n.data.status === 'in-progress').length;
    const totalHours = nodes.reduce((sum, n) => sum + n.data.estimatedHours, 0);
    const completedHours = nodes.filter(n => n.data.status === 'completed').reduce((sum, n) => sum + n.data.estimatedHours, 0) + nodes.filter(n => n.data.status === 'in-progress').reduce((sum, n) => sum + (n.data.estimatedHours * n.data.progress / 100), 0);
    return { id: 1, name: 'Frontend Development Master', totalNodes, completedNodes, inProgressNodes, totalHours, completedHours: Math.round(completedHours * 10) / 10 };
  }, [nodes]);

  const handleAddNode = useCallback(() => {
    setSelectedNode(null);
    setIsEditingModal(false);
    setShowNodeModal(true);
  }, []);

  const handleEditNode = useCallback((node: SkillNode) => {
    setSelectedNode(node);
    setIsEditingModal(true);
    setShowNodeModal(true);
  }, []);

  const handleSaveNode = useCallback((nodeData: SkillNodeData, nodeId?: string) => {
    if (isEditingModal && nodeId) {
      setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, data: nodeData } : n));
    } else {
      const newId = (Math.max(0, ...nodes.map(n => parseInt(n.id))) + 1).toString();
      const newNode: SkillNode = { id: newId, type: 'skill', position: { x: 300 + Math.random() * 200, y: 300 + Math.random() * 200 }, data: nodeData };
      setNodes(prev => [...prev, newNode]);
    }
    setShowNodeModal(false);
    setHasChanges(true);
  }, [isEditingModal, nodes]);

  const handleDeleteNode = useCallback((nodeId: string) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId));
    setEdges(prev => prev.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
    setShowNodeModal(false);
    setHasChanges(true);
  }, []);

  const handleSaveMap = useCallback(async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setHasChanges(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save skill map:', error);
    } finally {
      setIsSaving(false);
    }
  }, []);

  const handleNodeClick = useCallback((node: SkillNode) => {
    setSelectedNode(node);
    if (viewMode === 'view') {
      setIsEditingModal(false);
      setShowNodeModal(true);
    }
  }, [viewMode]);

  const handleZoom = useCallback((direction: 'in' | 'out' | 'reset') => {
    if (direction === 'in') setZoomLevel(prev => Math.min(prev + 0.1, 2));
    if (direction === 'out') setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
    if (direction === 'reset') setZoomLevel(1);
  }, []);

  return {
    nodes, edges, selectedNode, showNodeModal, isEditingModal, viewMode, zoomLevel, hasChanges,
    saveSuccess, isSaving, planStatistics, setViewMode, setShowNodeModal, handleAddNode,
    handleEditNode, handleSaveNode, handleDeleteNode, handleSaveMap, handleNodeClick, handleZoom,
  };
};