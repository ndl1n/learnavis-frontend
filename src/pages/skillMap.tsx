import { useNavigate } from "react-router-dom";
import { useSkillMap } from '../features/skillMap/hooks/useSkillMap';
import { SkillMapHeader } from '../features/skillMap/components/ui/SkillMapHeader';
import { SkillMapSidebar } from '../features/skillMap/components/sidebar/SkillMapSidebar';
import { SkillMapCanvas } from '../features/skillMap/components/canvas/SkillMapCanvas';
import { CanvasControls } from '../features/skillMap/components/canvas/CanvasControls';
import { NodeModal } from '../features/skillMap/components/modal/NodeModal';
import { BottomStatusBar } from '../features/skillMap/components/ui/BottomStatusBar';
import { QuickActionMenu } from '../features/skillMap/components/ui/QuickActionMenu';
import { SaveSuccessNotification } from '../components/ui/SaveSuccessNotification/SaveSuccessNotification';


const SkillMapPage = () => {
  const navigate = useNavigate();
  const {
    nodes, edges, selectedNode, showNodeModal, isEditingModal, viewMode, zoomLevel, hasChanges,
    saveSuccess, isSaving, planStatistics, setViewMode, setShowNodeModal, handleAddNode,
    handleEditNode, handleSaveNode, handleDeleteNode, handleSaveMap, handleNodeClick, handleZoom
  } = useSkillMap();

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col overflow-hidden">
      <SkillMapHeader
        plan={planStatistics}
        onBack={() => navigate(-1)}
        hasChanges={hasChanges}
        isSaving={isSaving}
        onSave={handleSaveMap}
      />

      {saveSuccess && <SaveSuccessNotification message="Skill map saved successfully!" />}
      
      <div className="flex flex-1 h-[calc(100vh-73px)]">
        <SkillMapSidebar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onAddNode={handleAddNode}
          onSave={handleSaveMap}
          hasChanges={hasChanges}
          isSaving={isSaving}
          plan={planStatistics}
        />
        
        <div className="flex-1 relative">
            <div 
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left', transition: 'transform 0.2s ease-out' }}
                className="w-full h-full"
            >
                <SkillMapCanvas
                    nodes={nodes}
                    edges={edges}
                    selectedNode={selectedNode}
                    onNodeClick={handleNodeClick}
                    onAddNode={handleAddNode}
                    onEditNode={() => handleEditNode(selectedNode!)}
                    viewMode={viewMode}
                />
            </div>
            <CanvasControls zoomLevel={zoomLevel} onZoom={handleZoom} />
        </div>
      </div>
      
      <BottomStatusBar plan={planStatistics} />
      
      {showNodeModal && (
        <NodeModal
          onClose={() => setShowNodeModal(false)}
          onSave={handleSaveNode}
          onDelete={handleDeleteNode}
          isEditing={isEditingModal}
          node={selectedNode}
        />
      )}
      
      {viewMode === 'edit' && nodes.length > 0 && (
          <QuickActionMenu 
            onAddNode={handleAddNode}
            onSave={handleSaveMap}
            hasChanges={hasChanges}
            isSaving={isSaving}
          />
      )}
    </div>
  );
};

export default SkillMapPage;