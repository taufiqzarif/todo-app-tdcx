export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  isAuthenticated: boolean;
}
