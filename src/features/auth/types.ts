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

/**
 * 匹配 FastAPI 的 Token 模型
 */
export interface Token {
  access_token: string;
  token_type: 'bearer';
}

/**
 * 匹配 FastAPI 的 User 模型 (註冊後的回應)
 * 請根據您的 Pydantic User 模型調整欄位
 */
export interface User {
  id: number; // 或 string，取決於您的資料庫
  email: string;
  displayName: string;
  // is_active: boolean;
  // ... 其他您在 User 模型中定義的欄位
}