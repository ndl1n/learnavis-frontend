import { User, Mail, Lock, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import type { useAuthForm } from '../hooks/useAuthForm';

type RegistrationFormProps = ReturnType<typeof useAuthForm>;

export const RegistrationForm = ({ 
  formData, 
  errors, 
  isLoading, 
  showPassword, 
  handleInputChange, 
  handleSubmit, 
}: RegistrationFormProps) => {
  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Display Name */}
        <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    id="displayName"
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => handleInputChange('displayName', e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${errors.displayName ? 'border-red-300 ring-red-500' : 'border-gray-300'}`}
                    placeholder="Your name"
                />
            </div>
            {errors.displayName && <div className="mt-1 flex items-center text-red-600 text-sm"><AlertCircle className="w-4 h-4 mr-1" />{errors.displayName}</div>}
        </div>

        {/* Email */}
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-400" /></div>
                <input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${errors.email ? 'border-red-300 ring-red-500' : 'border-gray-300'}`} placeholder="your.email@example.com" />
            </div>
            {errors.email && <div className="mt-1 flex items-center text-red-600 text-sm"><AlertCircle className="w-4 h-4 mr-1" />{errors.email}</div>}
        </div>

        {/* Password */}
        <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-400" /></div>
                <input id="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} className={`block w-full pl-10 pr-10 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${errors.password ? 'border-red-300 ring-red-500' : 'border-gray-300'}`} placeholder="Create a password" />
            </div>
            {errors.password && <div className="mt-1 flex items-center text-red-600 text-sm"><AlertCircle className="w-4 h-4 mr-1" />{errors.password}</div>}
        </div>
        
        {/* Confirm Password */}
        <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-400" /></div>
                <input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={(e) => handleInputChange('confirmPassword', e.target.value)} className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${errors.confirmPassword ? 'border-red-300 ring-red-500' : 'border-gray-300'}`} placeholder="Confirm your password" />
            </div>
            {errors.confirmPassword && <div className="mt-1 flex items-center text-red-600 text-sm"><AlertCircle className="w-4 h-4 mr-1" />{errors.confirmPassword}</div>}
        </div>
        
        {/* Submit Button */}
        <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center px-4 py-3 mt-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-xl shadow-sm hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <><span>Create account</span><ArrowRight className="w-5 h-5 ml-2" /></>}
        </button>
      </form>

      {/* Success Flow Preview */}
      <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-blue-900 mb-1">What happens next?</h4>
            <p className="text-sm text-blue-700">After signing up, you'll choose from learning templates or create your own custom skill map to get started immediately.</p>
          </div>
        </div>
      </div>
      
      {/* Terms */}
      <p className="mt-6 text-xs text-gray-500 text-center">
        By creating an account, you agree to our{' '}
        <a href="#" className="text-blue-600 hover:text-blue-700">Terms of Service</a>{' and '}
        <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
      </p>
    </>
  );
};