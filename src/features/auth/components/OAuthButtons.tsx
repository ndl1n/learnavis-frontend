import { Github, Chrome } from 'lucide-react';
import type { OAuthProvider } from '../types';

interface OAuthButtonsProps {
  isLoading: boolean;
  onLogin: (provider: OAuthProvider) => void;
}

export const OAuthButtons = ({ isLoading, onLogin }: OAuthButtonsProps) => {
  return (
    <div className="space-y-4">
      <button 
        onClick={() => onLogin('google')}
        disabled={isLoading}
        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300 disabled:opacity-50"
      >
        <Chrome className="w-5 h-5 mr-3 text-red-500" />
        Continue with Google
      </button>
      
      <button 
        onClick={() => onLogin('github')}
        disabled={isLoading}
        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300 disabled:opacity-50"
      >
        <Github className="w-5 h-5 mr-3" />
        Continue with GitHub
      </button>
    </div>
  );
};