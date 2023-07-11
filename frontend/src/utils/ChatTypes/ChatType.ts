import { Group } from "./GroupChatTypes";
import { UserField } from './UserTypes';

export interface Chat {
    Group: {[id: string]: Group};
    Personal: {[email: string]: UserField};
    User: UserField;
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