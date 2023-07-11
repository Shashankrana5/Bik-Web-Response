import { User } from "./UserTypes";

export interface Group {
    _id: string;
    users: User[];
    admins: User[];
    groupName: string;
}