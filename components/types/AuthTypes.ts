export interface User {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; user?: User; msg: string }>;
  signup: (name:string,email: string, password: string)=> Promise<{ success: boolean; user?: User; msg: string }>;
  logout: () => void;
}
