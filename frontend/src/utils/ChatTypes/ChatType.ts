import { Group } from "./GroupChatTypes";
import { UserField } from './UserTypes';

export interface Chat {
    Group: Group[];
    Personal: UserField[]; 
    User: UserField;
    AllChats: (Group | UserField)[];
}

export type SelectedChat = selectedGroupChat | selectedPersonalChat;

interface selectedGroupChat {
    chatType: "Group";
    selected: Group;
}

interface selectedPersonalChat {
    chatType: "Personal";
    selected: UserField
}