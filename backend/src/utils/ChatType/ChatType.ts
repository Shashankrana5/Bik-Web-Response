export interface ChatResponse {
  Personal: UserType[];
  Group: GroupType[];
  User: UserType | {};
}

export interface MessageType {
  senderEmail: string;
  senderName: string;
  messageType: "group" | "personal";
  groupId?: string;
  receiverEmail?: string;
  ticketNumber?: string;
  content: string;
}

export interface GroupType {
  _id: string;
  groupName?: string;
  admins: UserShortHandType[];
  users: UserShortHandType[];
}

export interface UserType {
  _id: string;
  fullName: string;
  email: string;
  role: string;
}

export interface UserShortHandType {
  _id: string;
  email: string;
}