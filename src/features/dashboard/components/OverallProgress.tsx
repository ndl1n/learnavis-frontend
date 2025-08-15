import { CircularProgress } from '../../../components/ui/CircularProgress/CircularProgress';

export const OverallProgress = ({ percentage }: { percentage: number }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/20">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h3>
      <div className="flex justify-center">
        <CircularProgress percentage={percentage} />
      </div>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          You're doing great! Keep up the momentum.
        </p>
      </div>
    </div>
  );
};

