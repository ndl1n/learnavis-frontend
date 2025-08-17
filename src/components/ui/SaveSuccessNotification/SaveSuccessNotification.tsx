import { CheckCircle2 } from 'lucide-react';

interface SaveSuccessNotificationProps {
  message: string;
}

export const SaveSuccessNotification = ({ message }: SaveSuccessNotificationProps) => {
  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2 animate-bounce">
        <CheckCircle2 className="w-5 h-5" />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};