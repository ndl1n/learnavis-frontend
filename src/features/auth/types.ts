/**
 * 表單欄位的資料結構
 */
export interface AuthFormData {
  email: string;
  password: string;
  displayName: string;
  confirmPassword: string;
}

/**
 * 表單錯誤的資料結構
 */
export interface AuthErrors {
  email?: string;
  password?: string;
  displayName?: string;
  confirmPassword?: string;
  general?: string; // 用於提交失敗等一般性錯誤
}

/**
 * 定義當前的驗證模式
 */
export type AuthMode = 'login' | 'register';

/**
 * 定義第三方登入的提供者
 */
export type OAuthProvider = 'google' | 'github';