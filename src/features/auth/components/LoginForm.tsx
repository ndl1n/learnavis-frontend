import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import type { useAuthForm } from '../hooks/useAuthForm';

// 從 hook 推斷 props 型別
type LoginFormProps = ReturnType<typeof useAuthForm>;

export const LoginForm = ({ 
  formData, 
  errors, 
  isLoading, 
  showPassword, 
  handleInputChange, 
  handleSubmit, 
  toggleShowPassword 
}: LoginFormProps) => {
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${errors.email ? 'border-red-300 ring-red-500' : 'border-gray-300'}`}
            placeholder="your.email@example.com"
          />
        </div>
        {errors.email && (
          <div className="mt-1 flex items-center text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 mr-1" />{errors.email}
          </div>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`block w-full pl-10 pr-10 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${errors.password ? 'border-red-300 ring-red-500' : 'border-gray-300'}`}
            placeholder="Enter your password"
          />
          <button type="button" onClick={toggleShowPassword} className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" /> : <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />}
          </button>
        </div>
        {errors.password && (
          <div className="mt-1 flex items-center text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 mr-1" />{errors.password}
          </div>
        )}
      </div>
      
      {/* Forgot Password */}
      <div className="flex justify-end">
        <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium">Forgot password?</button>
      </div>
      
      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-xl shadow-sm hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <><span>Sign in</span><ArrowRight className="w-5 h-5 ml-2" /></>
        )}
      </button>
    </form>
  );
};