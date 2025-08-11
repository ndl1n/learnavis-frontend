export interface Errors {
  email?: string;
  password?: string;
  displayName?: string;
  confirmPassword?: string;
  general?: string;  // 整體錯誤訊息
}

export interface FormData {
  email: string;
  password: string;
  displayName?: string;
  confirmPassword?: string;
}