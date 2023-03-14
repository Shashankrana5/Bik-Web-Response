import React = require("react");


interface Props {
    loggedInUserEmail: string
    user_id: string
}

interface UserModel {

    _id: string;
    email: string;
}

interface GroupCreationParameter {
    groupName?: string,
    requestSender: string,
    user_id: string,
    users: UserModel[];
}

const GroupChatCreationgForm: React.FC<Props> = ({loggedInUserEmail, user_id}: Props) => {

    const [groupCreationParams, setGroupCreationParams] = React.useState<GroupCreationParameter>({
        requestSender: loggedInUserEmail,
        user_id: user_id,
        users: [{_id: user_id, email: loggedInUserEmail}]
    })

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) =>{
        
        e.preventDefault();
        console.log(groupCreationParams)
        const group = await fetch("http://localhost:4000/api/group", {
            method: "POST",
            body: JSON.stringify(groupCreationParams),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    const fetchSearch  = async(searchParam: string) =>{
        
        if (searchParam){
        const response = await fetch("http://localhost:4000/api/users/searchquery/" + searchParam);
        const json = await response.json();

    if (!json["UserNotFoundError"]){
        console.log(json)
        for(const index in json){
            console.log(json[index])
        }
    }
    }
    }

    return (
        <div>
            
            <form onSubmit = {handleSubmit}>
            <label> Group Name</label>
            <input placeholder="Enter a group name" onChange={e => {
            setGroupCreationParams({
                groupName: e.target.value,
                requestSender: loggedInUserEmail,
                user_id: user_id,
                users: [{_id: user_id, email: loggedInUserEmail}, {_id: "63c3aa3cf23cfc29b8270401", email: "brandon@xyz.com"}]
            })}}></input>
            <label>Add Users</label>
            <input placeholder = "Search Users to add" onChange = {(e) => 
                fetchSearch(e.target.value)}></input>

            <button type= "submit">Create Group</button>
            </form>
        </div>
    )
    }


export default GroupChatCreationgForm;