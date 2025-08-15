import { useDashboardData } from '../features/dashboard/hooks/useDashboardData';
import { DashboardHeader } from '../features/dashboard/components/DashboardHeader';
import { WelcomeHeader } from '../features/dashboard/components/WelcomeHeader';
import { StatsCards } from '../features/dashboard/components/StatsCards';
import { NextTaskCard } from '../features/dashboard/components/NextTaskCard';
import { OverallProgress } from '../features/dashboard/components/OverallProgress';
import { LearningPlans } from '../features/dashboard/components/LearningPlans';
import { WeeklyActivity } from '../features/dashboard/components/WeeklyActivity';
import { QuickActions } from '../features/dashboard/components/QuickActions';

const DashboardPage = () => {
  const { data, isLoading } = useDashboardData();

  if (isLoading) {
    return <div>Loading dashboard...</div>; // 或是顯示一個 Spinner
  }

  if (!data) {
    return <div>Failed to load data.</div>;
  }

  const { user, nextTask, recentPlans, weeklyProgress } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <DashboardHeader user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeHeader name={user.name} />
        <StatsCards user={user} />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <NextTaskCard task={nextTask} />
            <OverallProgress percentage={68} /> {/* 這個 68% 也可以從 data 來 */}
          </div>
          <div className="lg:col-span-2 space-y-6">
            <LearningPlans plans={recentPlans} />
            <WeeklyActivity progress={weeklyProgress} />
          </div>
        </div>

        <QuickActions />
      </main>
    </div>
  );
};

export default DashboardPage;