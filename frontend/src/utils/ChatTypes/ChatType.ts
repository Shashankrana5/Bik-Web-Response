import { Group, GroupFields } from "./GroupChatTypes";
import { UserField } from './UserTypes';

export interface Chat {
    Group: {[id: string]: Group};
    Personal: {[email: string]: UserField};
    User: UserField;
}

export interface SelectedChat {
    chatType: "Personal" | "Group";
    _id?: GroupFields; //GroupId.
    email?: UserField //The person who I am talking to's email.

}