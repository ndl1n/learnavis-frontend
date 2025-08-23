import type { AuthFormData, Token, User } from './types';

// 將您的後端 API URL 放在這裡
// 在實際專案中，這通常會放在 .env 環境變數檔案中
const API_BASE_URL = 'http://localhost:8000/api/v1'; // 請根據您的後端服務位址修改

/**
 * 處理 API 錯誤回應
 * @param response Fetch API 的回應物件
 */
const handleApiError = async (response: Response) => {
  const errorData = await response.json();
  throw new Error(errorData.detail || 'An unknown error occurred.');
};

/**
 * 連接後端 API 進行登入
 * @param data 包含 email 和 password
 */
export const loginUser = async (data: Pick<AuthFormData, 'email' | 'password'>): Promise<Token> => {
  console.log('Calling REAL API: loginUser');

  // FastAPI 的 OAuth2PasswordRequestForm 需要 x-www-form-urlencoded 格式
  const formData = new URLSearchParams();
  formData.append('username', data.email); // 後端需要 `username` 欄位
  formData.append('password', data.password);

  const response = await fetch(`${API_BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};

/**
 * 連接後端 API 進行註冊
 * @param data 包含 displayName, email, password
 */
export const registerUser = async (data: Pick<AuthFormData, 'displayName' | 'email' | 'password'>): Promise<User> => {
  console.log('Calling REAL API: registerUser', data);
  
  // 您的註冊 API 預期的是 JSON 格式
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};