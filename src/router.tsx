import { createBrowserRouter, Navigate } from 'react-router';

import AuthPage from './pages/auth';
import DashboardPage from './pages/dashBoard';
// import CreatePlanPage from './pages/create-plan';
// import PlanIndexPage from './pages/plans/[plan_id]/index';
// import PlanMapPage from './pages/plans/[plan_id]/map';
import SkillMapPage from './pages/skillMap';
import SkillTreePage from './pages/skillTree';
// import PlanSchedulePage from './pages/plans/[plan_id]/schedule';
import TaskDetailPage from './pages/taskDetail';
// import SettingsPage from './pages/settings';
// import InsightsPage from './pages/insights';

// import MainLayout from './components/layout/MainLayout';  // 你需要自己做一個 Layout

const router = createBrowserRouter([
  {
    path: '/',
//     element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
//       { path: 'create-plan', element: <CreatePlanPage /> },
//       {
//         path: 'plans/:plan_id',
//         children: [
//           { index: true, element: <PlanIndexPage /> },
             { path: 'map', element: <SkillMapPage /> },
             { path: 'tree', element: <SkillTreePage /> },
//           { path: 'schedule', element: <PlanSchedulePage /> },
//         ],
//       },
      { path: 'tasks/:task_id', element: <TaskDetailPage /> },
//       { path: 'settings', element: <SettingsPage /> },
//       { path: 'insights', element: <InsightsPage /> },
    ],
  },
  { path: '/auth', element: <AuthPage /> },
  { path: '*', element: <Navigate to="/auth" replace /> },
]);

export default router;
