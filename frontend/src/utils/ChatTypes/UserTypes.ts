export interface User {
  _id: string;
  email: string;
}

export interface UserField {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  avatarId?: string;
}
