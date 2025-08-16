import { useState, useEffect } from 'react';
import type { TaskData, StudyTimer, TabId } from '../types';

// 引入模擬的初始資料
import { initialTaskData } from '../_initialData';

export const useTaskDetail = (taskId?: string) => {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [studyTimer, setStudyTimer] = useState<StudyTimer>({ active: false, elapsed: 0 });
  const [taskData, setTaskData] = useState<TaskData>(initialTaskData);
  const [originalTaskData, setOriginalTaskData] = useState<TaskData | null>(null);

  // 🔹 Hook 內部的有效性檢查
  const isValidTaskId = Boolean(taskId);

  useEffect(() => {
    if (!isValidTaskId) {
      console.log('Hook: Invalid task ID, using default data');
      setTaskData(initialTaskData);
      setOriginalTaskData(null);
      return;
    }

    console.log('Hook: Loading task data for ID:', taskId);
    
    // 實際應用中，你會根據 taskId 從 API 獲取資料
    setTaskData(initialTaskData);
    setOriginalTaskData(JSON.parse(JSON.stringify(initialTaskData)));
  }, [taskId, isValidTaskId]);

  useEffect(() => {
    if (originalTaskData && isValidTaskId) {
      setHasChanges(JSON.stringify(taskData) !== JSON.stringify(originalTaskData));
    }
  }, [taskData, originalTaskData, isValidTaskId]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (studyTimer.active && isValidTaskId) {
      interval = setInterval(() => {
        setStudyTimer(prev => ({ ...prev, elapsed: prev.elapsed + 1 }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [studyTimer.active, isValidTaskId]);

  const handleSaveTask = async () => {

    if (!isValidTaskId) {
      console.warn('Hook: Cannot save - invalid task ID');
      return;
    }

    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const updatedTaskData = JSON.parse(JSON.stringify(taskData));
      setOriginalTaskData(updatedTaskData);
      setHasChanges(false);
      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save task:', error);
    } finally {
      setSaving(false);
    }
  };
  
  // 使用泛型來確保 path 和 value 的型別安全
  const updateTaskData = <K extends keyof TaskData>(path: K, value: TaskData[K]) => {
    if (!isValidTaskId) {
      console.warn('Hook: Cannot update task data - invalid task ID');
      return;
    }
    setTaskData(prev => ({...prev, [path]: value}));
  };

  const toggleSubtask = (subtaskId: number) => {
    if (!isValidTaskId) {
      console.warn('Hook: Cannot toggle subtask - invalid task ID');
      return;
    }
    const newSubtasks = taskData.subtasks.map(st => 
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    );
    updateTaskData('subtasks', newSubtasks);
  };
  
  const handleTimerAction = (action: 'toggle' | 'reset' | 'save', notes?: string) => {

    if (!isValidTaskId) {
      console.warn('Hook: Cannot handle timer action - invalid task ID');
      return;
    }

    if(action === 'toggle') {
        setStudyTimer(prev => ({...prev, active: !prev.active}));
    } else if (action === 'reset') {
        setStudyTimer({ active: false, elapsed: 0 });
    } else if (action === 'save') {
        // 在此處處理儲存 session 的邏輯...
        console.log("Saving session...", { duration: studyTimer.elapsed, notes });
        setStudyTimer({ active: false, elapsed: 0 });
    }
  };

  return {
    activeTab,
    setActiveTab,
    isEditing,
    setIsEditing,
    isSaving,
    hasChanges,
    saveSuccess,
    studyTimer,
    taskData,
    isValidTaskId, // 🔹 暴露驗證狀態供組件使用
    handleSaveTask,
    updateTaskData,
    toggleSubtask,
    handleTimerAction
  };
};