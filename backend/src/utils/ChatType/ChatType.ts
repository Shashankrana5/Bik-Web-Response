export interface ChatResponse {
  Personal: UserType[];
  Group: GroupType[];
  AllChats: (UserType | GroupType)[];
  User: UserType | {};
}

export interface MessageType {
  senderEmail: string;
  senderName: string;
  messageType: "group" | "personal";
  groupId?: string;
  invisible?: boolean;
  receiverEmail?: string;
  ticketNumber?: string;
  content: string;
  read?: boolean;
}

export interface GroupType {
  _id: string;
  groupName?: string;
  admins: UserShortHandType[];
  users: UserShortHandType[];
  messages: MessageType[];
}

export interface UserType {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  avatarId?: string;
}

export interface UserShortHandType {
  _id: string;
  email: string;
}
