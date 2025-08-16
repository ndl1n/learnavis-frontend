import { useParams, useNavigate } from "react-router-dom";
import { useTaskDetail } from "../features/taskdetail/hooks/useTaskDetail";
import { TaskDetailHeader } from "../features/taskdetail/components/TaskDetailHeader";
import { TaskDetailSidebar } from "../features/taskdetail/components/TaskDetailSidebar";
import { SaveSuccessNotification } from "../features/taskdetail/components/SaveSuccessNotification";
import { OverviewTab } from "../features/taskdetail/components/tabs/OverviewTab";
import { NotesTab } from "../features/taskdetail/components/tabs/NotesTab";
import { ProgressTab } from "../features/taskdetail/components/tabs/ProgressTab";
import { TimerTab } from "../features/taskdetail/components/tabs/TimerTab";

const TaskDetailPage = () => {
  const { task_id } = useParams<{ task_id: string }>();
  const navigate = useNavigate();

  const {
    activeTab,
    setActiveTab,
    isEditing,
    setIsEditing,
    isSaving,
    hasChanges,
    saveSuccess,
    studyTimer,
    taskData,
    isValidTaskId,
    handleSaveTask,
    updateTaskData,
    toggleSubtask,
    handleTimerAction,
  } = useTaskDetail(task_id);

  // 在 Hook 調用後再做條件檢查
  if (!task_id || !isValidTaskId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">⚠️ Task Not Found</h2>
          <p className="text-gray-600 mb-6">The requested task could not be found.</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case "overview":
        return (
          <OverviewTab
            taskData={taskData}
            isEditing={isEditing}
            onUpdate={updateTaskData}
            onToggleSubtask={toggleSubtask}
          />
        );
      case "notes":
        return <NotesTab taskData={taskData} onUpdate={updateTaskData} />;
      case "progress":
        return <ProgressTab taskData={taskData} />;
      case "timer":
        return (
          <TimerTab
            studyTimer={studyTimer}
            taskData={taskData}
            onTimerAction={handleTimerAction}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <TaskDetailHeader
        taskData={taskData}
        onBack={() => navigate(-1)} // 🔹 用 useNavigate 回上一頁
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing(!isEditing)}
        hasChanges={hasChanges}
        onSave={handleSaveTask}
        isSaving={isSaving}
      />

      {saveSuccess && <SaveSuccessNotification />}

      <div className="flex max-w-6xl mx-auto">
        <TaskDetailSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          taskData={taskData}
        />
        <main className="flex-1 p-6">{renderActiveTab()}</main>
      </div>
    </div>
  );
};

export default TaskDetailPage;
