import { useState } from 'react';
import { AuthBranding } from '../features/auth/components/AuthBranding';
import { LoginForm } from '../features/auth/components/LoginForm';
import { RegistrationForm } from '../features/auth/components/RegistrationForm';
import { OAuthButtons } from '../features/auth/components/OAuthButtons';
import { useAuthForm } from '../features/auth/hooks/useAuthForm';
import type { AuthMode } from '../features/auth/types';

const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const authForm = useAuthForm(mode);

  const toggleMode = () => {
    const newMode = mode === 'login' ? 'register' : 'login';
    setMode(newMode);
    authForm.resetForm(); // 切換模式時重置表單和錯誤
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex">
      <AuthBranding />

      <div className="flex-1 flex flex-col overflow-y-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            {/* top 先用 6 固定，跟左邊板塊對齊 */}
            <h2 className="text-3xl font-bold text-gray-900 mb-2 mt-6"> 
              {mode === 'login' ? 'Welcome back!' : 'Create your account'}
            </h2>
            <p className="text-gray-600">
              {mode === 'login' ? 'Continue your learning journey' : 'Start building your future today'}
            </p>
          </div>
          
          <OAuthButtons isLoading={authForm.isLoading} onLogin={authForm.handleOAuthLogin} />

          {/* Divider */}
          <div className="relative flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-gray-500">or continue with email</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          {/* General Error Message */}
          {authForm.errors.general && (
            <div className="mb-4 text-center text-red-600 text-sm p-3 bg-red-50 border border-red-200 rounded-lg">
                {authForm.errors.general}
            </div>
          )}

          {/* Conditional Form Rendering */}
          {mode === 'login' 
            ? <LoginForm {...authForm} />
            : <RegistrationForm {...authForm} />
          }

          {/* Toggle Form Mode */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
              <button type="button" onClick={toggleMode} className="ml-2 font-medium text-blue-600 hover:text-blue-700 transition-colors">
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;