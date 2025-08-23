import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import type { AuthFormData, AuthErrors, AuthMode } from '../types';
import { loginUser, registerUser } from '../api';

export const useAuthForm = (mode: AuthMode) => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    displayName: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<AuthErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: AuthErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (mode === 'register') {
      if (!formData.displayName) newErrors.displayName = 'Display name is required';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof AuthFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(mode === 'login' ? 'Login successful with:' : 'Registration successful with:', formData);
      // 成功後導向到 dashboard
        // 這裡可以觸發切換到登入模式的函式，或直接重新載入頁面
        navigate('/auth'); // 假設有一個 /auth 路徑處理登入
      }
    } catch (error) {
      console.error(error);
      setErrors(prev => ({ ...prev, general: 'An unexpected error occurred.' }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
      try {
        console.log(`Login with ${provider}`);
        setIsLoading(true);

        // 模擬非同步登入流程，例如呼叫 API
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // 登入成功後可以做更多事情，例如跳轉頁面
        console.log(`${provider} login successful`);
    } catch (error) {
        // 模擬錯誤處理
        console.error('OAuth login failed:', error);
    } finally {
        setIsLoading(false);
    }
  };
  
  const resetForm = () => {
    setFormData({ email: '', password: '', displayName: '', confirmPassword: '' });
    setErrors({});
  };

  return {
    formData,
    errors,
    isLoading,
    showPassword,
    handleInputChange,
    handleSubmit,
    handleOAuthLogin,
    toggleShowPassword: () => setShowPassword(p => !p),
    resetForm
  };
};