export type UserRole = "ADMIN" | "TEACHER" | "STUDENT";

export type Phone = {
  id: number;
  number: string;
  user?: User | null;
};

export type User = {
  id: number;
  email: string;
  role?: UserRole;
  first_name: string;
  last_name: string;
  bio?: string | null;
  avatarUrl?: string | null;
  phones?: Phone[];
  teacher?: Teacher | null;
  student?: Student | null;
};

export type Teacher = {
  id: number;
  salary: number;
  user?: User | null;
};

export type Student = {
  id: number;
  enrollmentNumber: string;
  user?: User | null;
};
