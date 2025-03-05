export interface User {
    id: number;
    email: string;
    username: string;
    bio?: string;
    avatar_url?: string;
    created_at?: string;
  }
  
  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface RegisterData {
    email: string;
    username: string;
    password: string;
  }
  
  export interface UpdateProfileData {
    username?: string;
    bio?: string;
    avatar_url?: string;
  }
  
  export interface AuthResponse {
    access_token: string;
    token_type: string;
    user: User;
  }