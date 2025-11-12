export type AuthProvider = "google";

export type MemberRole = "MEMBER";

export interface Member {
  id: number;
  email: string;
  name: string;
  imageUrl: string;
  provider: AuthProvider;
  role: MemberRole;
  createdAt: string;
  updatedAt: string;
}
