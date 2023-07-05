import { User } from "./UserTypes";

export interface Group {
    _id: GroupFields;
}
export interface GroupFields {
    _id: string;
    users: User[];
    admins: User[];
    groupName: string;
}