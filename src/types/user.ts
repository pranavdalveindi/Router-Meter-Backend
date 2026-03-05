export interface User {
    id: number;
    email: string;
    password_hash: string;     // never return this!
    created_at: Date;
  }
  
  export interface UserSafe {
    id: number;
    email: string;
    created_at: Date;
  }
  
  export interface RegisterInput {
    email: string;
    password: string;
  }
  
  export interface LoginInput {
    email: string;
    password: string;
  }