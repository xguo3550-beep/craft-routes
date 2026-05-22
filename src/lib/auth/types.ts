export type UserRole = "customer" | "host";

export interface SessionUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  hostDisplayName?: string;
  hostBio?: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
  hostDisplayName?: string;
  hostBio?: string;
}
